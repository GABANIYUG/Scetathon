-- =============================================================================
-- SCETATHON — Phase 7: Live Event Operations, Real-Time Announcements & Read Receipts
-- Forward-Only Migration
-- Target: Supabase PostgreSQL
-- =============================================================================

-- 1. Extend announcements table with priority and pinning
ALTER TABLE public.announcements
  ADD COLUMN IF NOT EXISTS priority TEXT NOT NULL DEFAULT 'Normal'
  CHECK (priority IN ('Normal', 'Important', 'Urgent'));

ALTER TABLE public.announcements
  ADD COLUMN IF NOT EXISTS pinned BOOLEAN NOT NULL DEFAULT false;

-- Allow 'Event Operations' in announcements.category constraint
DO $$
BEGIN
  ALTER TABLE public.announcements DROP CONSTRAINT IF EXISTS announcements_category_check;
  ALTER TABLE public.announcements ADD CONSTRAINT announcements_category_check
    CHECK (category IN ('General', 'Registration', 'Challenges', 'Schedule', 'Important Notice', 'Event Operations'));
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- 2. Extend event_settings with live operational state
ALTER TABLE public.event_settings
  ADD COLUMN IF NOT EXISTS event_status TEXT NOT NULL DEFAULT 'preparing'
  CHECK (event_status IN ('preparing', 'live', 'paused', 'completed'));

ALTER TABLE public.event_settings
  ADD COLUMN IF NOT EXISTS public_status_message TEXT;

ALTER TABLE public.event_settings
  ADD COLUMN IF NOT EXISTS status_updated_by UUID REFERENCES auth.users(id);

ALTER TABLE public.event_settings
  ADD COLUMN IF NOT EXISTS status_updated_at TIMESTAMPTZ;

-- 3. Create announcement_reads table (Persistent Read Receipts)
CREATE TABLE IF NOT EXISTS public.announcement_reads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  announcement_id UUID NOT NULL REFERENCES public.announcements(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(announcement_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_announcement_reads_user ON public.announcement_reads(user_id);
CREATE INDEX IF NOT EXISTS idx_announcement_reads_announcement ON public.announcement_reads(announcement_id);

-- Enable RLS on announcement_reads
ALTER TABLE public.announcement_reads ENABLE ROW LEVEL SECURITY;

-- Policy: Users can select their own read receipts, faculty admin can inspect for operational oversight
CREATE POLICY "announcement_reads_select_own"
  ON public.announcement_reads FOR SELECT
  USING (user_id = auth.uid() OR public.is_faculty_admin());

-- Policy: Users can insert their own read receipts only
CREATE POLICY "announcement_reads_insert_own"
  ON public.announcement_reads FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Policy: Users can delete their own read receipts (e.g. mark unread)
CREATE POLICY "announcement_reads_delete_own"
  ON public.announcement_reads FOR DELETE
  USING (user_id = auth.uid());

-- 4. Strengthen announcements audience security policy
DROP POLICY IF EXISTS "announcements_public_select" ON public.announcements;
CREATE POLICY "announcements_public_select"
  ON public.announcements FOR SELECT
  USING (
    -- Public website announcements: visible to all when published
    (status = 'published' AND visibility = 'Public Website')
    -- Registered Teams announcements: visible ONLY to authenticated members of registered squads
    OR (
      status = 'published'
      AND visibility = 'Registered Teams Only'
      AND (
        public.is_student_lead()
        OR EXISTS (
          SELECT 1 FROM public.teams t
          WHERE t.leader_id = auth.uid()
        )
        OR EXISTS (
          SELECT 1 FROM public.team_members tm
          JOIN auth.users u ON LOWER(u.email) = LOWER(tm.email)
          WHERE u.id = auth.uid()
        )
      )
    )
    -- Committee internal announcements: visible only to student_lead & faculty_admin
    OR (
      visibility = 'Internal Committee Only'
      AND public.is_student_lead()
    )
    OR public.is_student_lead()
  );

-- 5. Atomic function for Event Status updates with audit trail
CREATE OR REPLACE FUNCTION public.update_event_status_atomic(
  p_status TEXT,
  p_message TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id UUID;
  v_prev_status TEXT;
  v_prev_message TEXT;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL OR NOT public.is_faculty_admin() THEN
    RAISE EXCEPTION 'Unauthorized: Faculty Administrator privileges required to change event status.';
  END IF;

  IF p_status NOT IN ('preparing', 'live', 'paused', 'completed') THEN
    RAISE EXCEPTION 'Invalid event status: %', p_status;
  END IF;

  SELECT event_status, public_status_message INTO v_prev_status, v_prev_message
  FROM public.event_settings WHERE id = 'current';

  UPDATE public.event_settings
  SET
    event_status = p_status,
    public_status_message = TRIM(p_message),
    status_updated_by = v_user_id,
    status_updated_at = now()
  WHERE id = 'current';

  -- Record audit log
  INSERT INTO public.audit_logs (
    actor_id,
    action,
    entity_type,
    entity_id,
    metadata
  ) VALUES (
    v_user_id,
    'EVENT_STATUS_CHANGED',
    'event_settings',
    'current',
    jsonb_build_object(
      'previous_status', v_prev_status,
      'new_status', p_status,
      'previous_message', v_prev_message,
      'new_message', TRIM(p_message)
    )
  );

  RETURN jsonb_build_object(
    'success', true,
    'event_status', p_status,
    'public_status_message', TRIM(p_message),
    'updated_at', now()
  );
END;
$$;

REVOKE EXECUTE ON FUNCTION public.update_event_status_atomic(TEXT, TEXT) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.update_event_status_atomic(TEXT, TEXT) TO authenticated, service_role;

