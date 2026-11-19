-- =============================================================================
-- SCETATHON — Phase 6: Production Database Schema & Security Architecture
-- Target: Supabase PostgreSQL (Postgres 15+)
-- =============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 2. SCHEMAS & TABLES
-- =============================================================================

-- Table 1: Profiles (1-to-1 with auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  phone TEXT,
  institution_name TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table 2: User Roles (Explicit RBAC, never self-assignable)
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('faculty_admin', 'student_lead', 'jury')),
  assigned_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(user_id, role)
);

-- Table 3: Teams
CREATE TABLE IF NOT EXISTS public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name TEXT NOT NULL,
  institution_name TEXT NOT NULL,
  institution_city TEXT NOT NULL,
  leader_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  registration_status TEXT NOT NULL DEFAULT 'draft' CHECK (
    registration_status IN ('draft', 'submitted', 'under_review', 'approved', 'rejected', 'waitlisted')
  ),
  assigned_track_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  submitted_at TIMESTAMPTZ
);

-- Table 4: Team Members
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  institution_name TEXT,
  department TEXT,
  technical_role TEXT NOT NULL,
  is_leader BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  UNIQUE(team_id, email)
);

-- Table 5: Registrations (Formal application record)
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE UNIQUE,
  submitted_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  status TEXT NOT NULL DEFAULT 'submitted' CHECK (
    status IN ('submitted', 'under_review', 'approved', 'rejected', 'waitlisted')
  ),
  submitted_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES auth.users(id),
  review_note TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table 6: Challenge Tracks
CREATE TABLE IF NOT EXISTS public.tracks (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  short_description TEXT NOT NULL,
  detailed_overview TEXT,
  competencies TEXT[] DEFAULT '{}'::TEXT[],
  key_themes TEXT[] DEFAULT '{}'::TEXT[],
  opportunity_areas TEXT[] DEFAULT '{}'::TEXT[],
  approval_status TEXT NOT NULL DEFAULT 'provisional' CHECK (
    approval_status IN ('draft', 'provisional', 'approved', 'published')
  ),
  published_at TIMESTAMPTZ,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table 7: Schedule Phases
CREATE TABLE IF NOT EXISTS public.schedule_phases (
  id TEXT PRIMARY KEY,
  phase_number TEXT NOT NULL,
  title TEXT NOT NULL,
  short_summary TEXT NOT NULL,
  hour_range TEXT NOT NULL,
  relative_time TEXT NOT NULL,
  detailed_agenda TEXT[] DEFAULT '{}'::TEXT[],
  operational_focus TEXT NOT NULL,
  participant_instructions TEXT,
  approval_status TEXT NOT NULL DEFAULT 'provisional' CHECK (
    approval_status IN ('draft', 'provisional', 'approved', 'published')
  ),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table 8: Announcements
CREATE TABLE IF NOT EXISTS public.announcements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'General' CHECK (
    category IN ('General', 'Registration', 'Challenges', 'Schedule', 'Important Notice')
  ),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  visibility TEXT NOT NULL DEFAULT 'Public Website' CHECK (
    visibility IN ('Public Website', 'Registered Teams Only', 'Internal Committee Only')
  ),
  author_label TEXT DEFAULT 'SCET Organizing Committee',
  created_by UUID REFERENCES auth.users(id),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table 9: Event Settings (Singleton row)
CREATE TABLE IF NOT EXISTS public.event_settings (
  id TEXT PRIMARY KEY DEFAULT 'current',
  event_name TEXT NOT NULL DEFAULT 'SCETATHON',
  tagline TEXT NOT NULL DEFAULT '24-Hour Inter-College Hackathon',
  registration_mode TEXT NOT NULL DEFAULT 'preview' CHECK (
    registration_mode IN ('preview', 'open', 'closed', 'coming_soon')
  ),
  opens_at TIMESTAMPTZ,
  closes_at TIMESTAMPTZ,
  min_team_size INT NOT NULL DEFAULT 2,
  max_team_size INT NOT NULL DEFAULT 4,
  allow_solo BOOLEAN NOT NULL DEFAULT false,
  eligibility_information TEXT,
  updated_by UUID REFERENCES auth.users(id),
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table 10: Audit Logs
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  metadata JSONB DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- =============================================================================
-- 3. INDEXES
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_teams_leader_id ON public.teams(leader_id);
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_email ON public.team_members(email);
CREATE INDEX IF NOT EXISTS idx_registrations_status ON public.registrations(status);
CREATE INDEX IF NOT EXISTS idx_tracks_approval_status ON public.tracks(approval_status);
CREATE INDEX IF NOT EXISTS idx_schedule_phases_status ON public.schedule_phases(approval_status);
CREATE INDEX IF NOT EXISTS idx_announcements_status ON public.announcements(status);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON public.audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);

-- =============================================================================
-- 4. SECURITY DEFINER HELPER FUNCTIONS (FOR RLS)
-- =============================================================================
-- SECURITY NOTE: All SECURITY DEFINER functions use SET search_path = ''
-- and fully schema-qualify every reference to prevent search_path injection.
-- EXECUTE is REVOKED from PUBLIC/anon and re-GRANTED to authenticated roles.
-- =============================================================================

-- Check whether a user possesses an administrative role
-- SECURITY NOTE: Restricted to service_role and caller-scoped to prevent
-- arbitrary role enumeration by ordinary authenticated users.
CREATE OR REPLACE FUNCTION public.has_role(check_user_id UUID, check_role TEXT)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = check_user_id 
      AND role = check_role
      AND (
        -- Caller scoping: Can only inspect own role, unless caller is already a faculty_admin or service_role
        check_user_id = auth.uid()
        OR auth.uid() IS NULL
        OR EXISTS (
          SELECT 1 FROM public.user_roles
          WHERE user_id = auth.uid() AND role = 'faculty_admin'
        )
      )
  );
$$;

-- Prevent arbitrary role discovery: revoke EXECUTE from PUBLIC, anon, and authenticated.
-- Only internal SECURITY DEFINER functions (owned by postgres) and service_role can call this.
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, TEXT) FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.has_role(UUID, TEXT) TO service_role;

-- Faculty Admin check
CREATE OR REPLACE FUNCTION public.is_faculty_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT public.has_role(auth.uid(), 'faculty_admin');
$$;

REVOKE EXECUTE ON FUNCTION public.is_faculty_admin() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.is_faculty_admin() TO authenticated, service_role;

-- Student Lead check (or Faculty Admin)
CREATE OR REPLACE FUNCTION public.is_student_lead()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT public.has_role(auth.uid(), 'student_lead') OR public.has_role(auth.uid(), 'faculty_admin');
$$;

REVOKE EXECUTE ON FUNCTION public.is_student_lead() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.is_student_lead() TO authenticated, service_role;

-- Jury check
CREATE OR REPLACE FUNCTION public.is_jury()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
STABLE
AS $$
  SELECT public.has_role(auth.uid(), 'jury') OR public.has_role(auth.uid(), 'faculty_admin');
$$;

REVOKE EXECUTE ON FUNCTION public.is_jury() FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.is_jury() TO authenticated, service_role;

-- Timestamp update trigger function (not SECURITY DEFINER — no elevated access needed)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply timestamp triggers
DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trigger_teams_updated_at ON public.teams;
CREATE TRIGGER trigger_teams_updated_at BEFORE UPDATE ON public.teams
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trigger_team_members_updated_at ON public.team_members;
CREATE TRIGGER trigger_team_members_updated_at BEFORE UPDATE ON public.team_members
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trigger_registrations_updated_at ON public.registrations;
CREATE TRIGGER trigger_registrations_updated_at BEFORE UPDATE ON public.registrations
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trigger_tracks_updated_at ON public.tracks;
CREATE TRIGGER trigger_tracks_updated_at BEFORE UPDATE ON public.tracks
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trigger_schedule_phases_updated_at ON public.schedule_phases;
CREATE TRIGGER trigger_schedule_phases_updated_at BEFORE UPDATE ON public.schedule_phases
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trigger_announcements_updated_at ON public.announcements;
CREATE TRIGGER trigger_announcements_updated_at BEFORE UPDATE ON public.announcements
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create profile trigger on auth.users signup
-- SECURITY NOTE: search_path = '' + schema-qualified references prevent injection.
-- This function runs in the auth schema context (triggered on auth.users INSERT).
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Participant'),
    NEW.raw_user_meta_data->>'phone'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- handle_new_user is a trigger function invoked by the DB itself — not callable by clients.
-- Explicitly revoke direct EXECUTE from public and authenticated roles.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

-- =============================================================================
-- 5. ATOMIC TEAM REGISTRATION TRANSACTION (RPC)
-- =============================================================================

CREATE OR REPLACE FUNCTION public.register_team_atomic(
  p_team_name TEXT,
  p_institution_name TEXT,
  p_institution_city TEXT,
  p_members JSONB
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id UUID;
  v_user_email TEXT;
  v_user_name TEXT;
  v_user_phone TEXT;
  v_settings RECORD;
  v_total_count INT;
  v_team_id UUID;
  v_registration_id UUID;
  v_member RECORD;
  v_existing_team_id UUID;
BEGIN
  -- 1. Verify caller is authenticated
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required. Please sign in to submit team registration.';
  END IF;

  -- 2. Fetch leader details from auth.users and public.profiles
  SELECT email INTO v_user_email FROM auth.users WHERE id = v_user_id;
  SELECT full_name, phone INTO v_user_name, v_user_phone FROM public.profiles WHERE id = v_user_id;

  IF v_user_name IS NULL OR TRIM(v_user_name) = '' THEN
    v_user_name := 'Team Leader';
  END IF;

  -- 3. Check event_settings for registration gating & constraints
  SELECT * INTO v_settings FROM public.event_settings WHERE id = 'current';
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Event settings are not configured. Registration cannot proceed.';
  END IF;

  IF v_settings.registration_mode != 'open' THEN
    RAISE EXCEPTION 'Registration is currently in "%" mode. Applications are not currently being accepted.', v_settings.registration_mode;
  END IF;

  -- 4. Validate team size
  v_total_count := 1 + jsonb_array_length(p_members);
  IF v_total_count < v_settings.min_team_size THEN
    RAISE EXCEPTION 'Team size must be at least % members (including the leader). You provided %.', v_settings.min_team_size, v_total_count;
  END IF;
  IF v_total_count > v_settings.max_team_size THEN
    RAISE EXCEPTION 'Team size cannot exceed % members (including the leader). You provided %.', v_settings.max_team_size, v_total_count;
  END IF;

  -- 5. Check if user already leads an active team
  SELECT id INTO v_existing_team_id FROM public.teams WHERE leader_id = v_user_id LIMIT 1;
  IF v_existing_team_id IS NOT NULL THEN
    RAISE EXCEPTION 'You have already registered team "%" (ID: %). A participant may lead only one team.', p_team_name, v_existing_team_id;
  END IF;

  -- 6. Insert Team record
  INSERT INTO public.teams (
    team_name,
    institution_name,
    institution_city,
    leader_id,
    registration_status,
    submitted_at
  ) VALUES (
    TRIM(p_team_name),
    TRIM(p_institution_name),
    TRIM(p_institution_city),
    v_user_id,
    'submitted',
    now()
  ) RETURNING id INTO v_team_id;

  -- 7. Insert Leader into team_members
  INSERT INTO public.team_members (
    team_id,
    full_name,
    email,
    phone,
    institution_name,
    technical_role,
    is_leader
  ) VALUES (
    v_team_id,
    v_user_name,
    LOWER(TRIM(v_user_email)),
    v_user_phone,
    TRIM(p_institution_name),
    'Team Leader',
    true
  );

  -- 8. Insert Additional Team Members
  FOR v_member IN SELECT * FROM jsonb_to_recordset(p_members) AS x(
    name TEXT,
    email TEXT,
    phone TEXT,
    role TEXT
  )
  LOOP
    -- Prevent duplicate member emails matching leader
    IF LOWER(TRIM(v_member.email)) = LOWER(TRIM(v_user_email)) THEN
      RAISE EXCEPTION 'Member email "%" is identical to the team leader email.', v_member.email;
    END IF;

    INSERT INTO public.team_members (
      team_id,
      full_name,
      email,
      phone,
      institution_name,
      technical_role,
      is_leader
    ) VALUES (
      v_team_id,
      TRIM(v_member.name),
      LOWER(TRIM(v_member.email)),
      v_member.phone,
      TRIM(p_institution_name),
      COALESCE(TRIM(v_member.role), 'Member'),
      false
    );
  END LOOP;

  -- 9. Insert Registration Record
  INSERT INTO public.registrations (
    team_id,
    submitted_by,
    status,
    submitted_at
  ) VALUES (
    v_team_id,
    v_user_id,
    'submitted',
    now()
  ) RETURNING id INTO v_registration_id;

  -- 10. Write Audit Log
  INSERT INTO public.audit_logs (
    actor_id,
    action,
    entity_type,
    entity_id,
    metadata
  ) VALUES (
    v_user_id,
    'TEAM_REGISTERED',
    'registration',
    v_registration_id::TEXT,
    jsonb_build_object(
      'team_id', v_team_id,
      'team_name', p_team_name,
      'member_count', v_total_count
    )
  );

  -- Return created identifiers
  RETURN jsonb_build_object(
    'success', true,
    'registration_id', v_registration_id,
    'team_id', v_team_id,
    'team_name', p_team_name,
    'status', 'submitted'
  );
END;
$$;

-- register_team_atomic: authenticated users may call; anon/public cannot.
REVOKE EXECUTE ON FUNCTION public.register_team_atomic(TEXT, TEXT, TEXT, JSONB) FROM PUBLIC, anon;
GRANT  EXECUTE ON FUNCTION public.register_team_atomic(TEXT, TEXT, TEXT, JSONB) TO authenticated, service_role;

-- =============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all 10 tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule_phases ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 6.1 PROFILES POLICIES
-- -----------------------------------------------------------------------------
CREATE POLICY "profiles_select_own"
  ON public.profiles FOR SELECT
  USING (id = auth.uid() OR public.is_faculty_admin());

CREATE POLICY "profiles_update_own"
  ON public.profiles FOR UPDATE
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "profiles_insert_own"
  ON public.profiles FOR INSERT
  WITH CHECK (id = auth.uid());

-- -----------------------------------------------------------------------------
-- 6.2 USER ROLES POLICIES (Strict: Never self-assignable)
-- -----------------------------------------------------------------------------
CREATE POLICY "user_roles_select_own_or_admin"
  ON public.user_roles FOR SELECT
  USING (user_id = auth.uid() OR public.is_faculty_admin());

CREATE POLICY "user_roles_admin_manage"
  ON public.user_roles FOR ALL
  USING (public.is_faculty_admin())
  WITH CHECK (public.is_faculty_admin());

-- -----------------------------------------------------------------------------
-- 6.3 TEAMS POLICIES
-- -----------------------------------------------------------------------------
CREATE POLICY "teams_select_leader_or_admin"
  ON public.teams FOR SELECT
  USING (
    leader_id = auth.uid()
    OR public.is_faculty_admin()
    OR EXISTS (
      SELECT 1 FROM public.team_members tm
      JOIN auth.users u ON LOWER(u.email) = LOWER(tm.email)
      WHERE tm.team_id = teams.id AND u.id = auth.uid()
    )
  );

CREATE POLICY "teams_insert_leader"
  ON public.teams FOR INSERT
  WITH CHECK (leader_id = auth.uid());

CREATE POLICY "teams_update_leader_or_admin"
  ON public.teams FOR UPDATE
  USING (
    (leader_id = auth.uid() AND registration_status = 'draft')
    OR public.is_faculty_admin()
  )
  WITH CHECK (
    (leader_id = auth.uid() AND registration_status = 'draft')
    OR public.is_faculty_admin()
  );

-- -----------------------------------------------------------------------------
-- 6.4 TEAM MEMBERS POLICIES (Private: Contact info never publicly disclosed)
-- -----------------------------------------------------------------------------
CREATE POLICY "team_members_select"
  ON public.team_members FOR SELECT
  USING (
    public.is_faculty_admin()
    OR EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_members.team_id AND t.leader_id = auth.uid()
    )
    OR EXISTS (
      SELECT 1 FROM auth.users u
      WHERE u.id = auth.uid() AND LOWER(u.email) = LOWER(team_members.email)
    )
  );

CREATE POLICY "team_members_insert_leader"
  ON public.team_members FOR INSERT
  WITH CHECK (
    public.is_faculty_admin()
    OR EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_members.team_id AND t.leader_id = auth.uid()
    )
  );

CREATE POLICY "team_members_update_leader"
  ON public.team_members FOR UPDATE
  USING (
    public.is_faculty_admin()
    OR EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_members.team_id AND t.leader_id = auth.uid() AND t.registration_status = 'draft'
    )
  );

CREATE POLICY "team_members_delete_leader"
  ON public.team_members FOR DELETE
  USING (
    public.is_faculty_admin()
    OR EXISTS (
      SELECT 1 FROM public.teams t
      WHERE t.id = team_members.team_id AND t.leader_id = auth.uid() AND t.registration_status = 'draft'
    )
  );

-- -----------------------------------------------------------------------------
-- 6.5 REGISTRATIONS POLICIES
-- -----------------------------------------------------------------------------
CREATE POLICY "registrations_select"
  ON public.registrations FOR SELECT
  USING (submitted_by = auth.uid() OR public.is_faculty_admin());

CREATE POLICY "registrations_insert_applicant"
  ON public.registrations FOR INSERT
  WITH CHECK (submitted_by = auth.uid());

CREATE POLICY "registrations_admin_update"
  ON public.registrations FOR UPDATE
  USING (public.is_faculty_admin())
  WITH CHECK (public.is_faculty_admin());

-- -----------------------------------------------------------------------------
-- 6.6 TRACKS POLICIES
-- -----------------------------------------------------------------------------
CREATE POLICY "tracks_public_select"
  ON public.tracks FOR SELECT
  USING (approval_status = 'published' OR public.is_student_lead());

CREATE POLICY "tracks_admin_manage"
  ON public.tracks FOR ALL
  USING (public.is_student_lead())
  WITH CHECK (public.is_student_lead());

-- -----------------------------------------------------------------------------
-- 6.7 SCHEDULE PHASES POLICIES
-- -----------------------------------------------------------------------------
CREATE POLICY "schedule_public_select"
  ON public.schedule_phases FOR SELECT
  USING (approval_status = 'published' OR public.is_student_lead());

CREATE POLICY "schedule_admin_manage"
  ON public.schedule_phases FOR ALL
  USING (public.is_student_lead())
  WITH CHECK (public.is_student_lead());

-- -----------------------------------------------------------------------------
-- 6.8 ANNOUNCEMENTS POLICIES
-- -----------------------------------------------------------------------------
CREATE POLICY "announcements_public_select"
  ON public.announcements FOR SELECT
  USING (
    (status = 'published' AND visibility = 'Public Website')
    OR (status = 'published' AND visibility = 'Registered Teams Only' AND auth.uid() IS NOT NULL)
    OR public.is_student_lead()
  );

CREATE POLICY "announcements_admin_manage"
  ON public.announcements FOR ALL
  USING (public.is_student_lead())
  WITH CHECK (public.is_student_lead());

-- -----------------------------------------------------------------------------
-- 6.9 EVENT SETTINGS POLICIES
-- SELECT: publicly readable (site uses registration_mode to gate the form)
-- UPDATE: Faculty Admin only
-- INSERT: Explicitly blocked from clients — singleton row inserted by seed only
-- DELETE: Blocked (no policy = default deny with RLS enabled)
-- -----------------------------------------------------------------------------
CREATE POLICY "event_settings_public_select"
  ON public.event_settings FOR SELECT
  USING (true);

CREATE POLICY "event_settings_admin_update"
  ON public.event_settings FOR UPDATE
  USING (public.is_faculty_admin())
  WITH CHECK (public.is_faculty_admin());

-- -----------------------------------------------------------------------------
-- 6.10 AUDIT LOGS POLICIES
-- Immutable: Faculty Admin can read. Direct client INSERT is blocked.
-- All legitimate audit_log inserts happen inside SECURITY DEFINER functions
-- (register_team_atomic, updateRegistrationStatus) which bypass RLS.
-- -----------------------------------------------------------------------------
CREATE POLICY "audit_logs_faculty_select"
  ON public.audit_logs FOR SELECT
  USING (public.is_faculty_admin());

-- Direct INSERT from an authenticated client is restricted to faculty_admin only.
-- System inserts happen via SECURITY DEFINER RPCs that bypass RLS anyway.
CREATE POLICY "audit_logs_system_insert"
  ON public.audit_logs FOR INSERT
  WITH CHECK (public.is_faculty_admin());

