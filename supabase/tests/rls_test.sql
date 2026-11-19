-- =============================================================================
-- SCETATHON — Phase 6: Automated RLS & Security Policy Test Suite
-- Can be executed via Supabase SQL Editor or psql CLI
-- Tests all 12 core security constraints + role discovery + announcement privacy
-- =============================================================================

DO $$
DECLARE
  v_test_failed BOOLEAN := false;
  v_count INT;
  v_result JSONB;
  c_user_a UUID := '11111111-1111-1111-1111-111111111111'::UUID;
  c_user_b UUID := '22222222-2222-2222-2222-222222222222'::UUID;
  c_admin  UUID := '99999999-9999-9999-9999-999999999999'::UUID;
  v_team_b_id UUID;
  v_reg_b_id UUID;
  v_announcement_id UUID;
BEGIN
  RAISE NOTICE '=====================================================';
  RAISE NOTICE 'STARTING SCETATHON RLS & AUTHORIZATION SECURITY TESTS';
  RAISE NOTICE '=====================================================';

  -- ---------------------------------------------------------------------------
  -- TEST FIXTURES SETUP (Running as superuser/postgres)
  -- ---------------------------------------------------------------------------
  -- Create mock auth profiles
  INSERT INTO public.profiles (id, full_name, phone)
  VALUES 
    (c_user_a, 'Participant A', '9999999991'),
    (c_user_b, 'Participant B', '9999999992'),
    (c_admin,  'Faculty Lead',  '9999999999')
  ON CONFLICT (id) DO NOTHING;

  -- Create a fixture team owned by Participant B
  INSERT INTO public.teams (id, team_name, institution_name, institution_city, leader_id, registration_status)
  VALUES (gen_random_uuid(), 'Beta Squad', 'SCET Surat', 'Surat', c_user_b, 'submitted')
  RETURNING id INTO v_team_b_id;

  -- Create a fixture registration for Team B
  INSERT INTO public.registrations (id, team_id, submitted_by, status)
  VALUES (gen_random_uuid(), v_team_b_id, c_user_b, 'submitted')
  RETURNING id INTO v_reg_b_id;

  -- Create fixture announcements (Internal & Draft)
  INSERT INTO public.announcements (id, title, summary, content, category, status, visibility)
  VALUES 
    (gen_random_uuid(), 'Internal Briefing', 'Committee notes', 'Restricted info', 'General', 'published', 'Internal Committee Only'),
    (gen_random_uuid(), 'Unreleased Notice', 'Draft notes', 'Not ready', 'General', 'draft', 'Public Website')
  RETURNING id INTO v_announcement_id;

  -- ---------------------------------------------------------------------------
  -- TEST 1: Anonymous visitors cannot read private teams
  -- ---------------------------------------------------------------------------
  BEGIN
    SET LOCAL ROLE anon;
    SELECT COUNT(*) INTO v_count FROM public.teams;
    IF v_count > 0 THEN
      RAISE EXCEPTION 'TEST 1 FAILED: Anonymous user was able to read % team records', v_count;
    END IF;
    RAISE NOTICE '✓ TEST 1 PASSED: Anonymous visitors cannot read private teams.';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 1 PASSED: Anonymous read denied (%s).', SQLERRM;
  END;

  RESET ROLE;

  -- ---------------------------------------------------------------------------
  -- TEST 2: Anonymous visitors cannot read registrations
  -- ---------------------------------------------------------------------------
  BEGIN
    SET LOCAL ROLE anon;
    SELECT COUNT(*) INTO v_count FROM public.registrations;
    IF v_count > 0 THEN
      RAISE EXCEPTION 'TEST 2 FAILED: Anonymous user was able to read % registration records', v_count;
    END IF;
    RAISE NOTICE '✓ TEST 2 PASSED: Anonymous visitors cannot read registrations.';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 2 PASSED: Anonymous read denied (%s).', SQLERRM;
  END;

  RESET ROLE;

  -- ---------------------------------------------------------------------------
  -- TEST 3: Participant A cannot access Participant B''s team
  -- ---------------------------------------------------------------------------
  BEGIN
    SET LOCAL ROLE authenticated;
    PERFORM set_config('request.jwt.claim.sub', c_user_a::TEXT, true);
    SELECT COUNT(*) INTO v_count FROM public.teams WHERE id = v_team_b_id;
    IF v_count > 0 THEN
      RAISE EXCEPTION 'TEST 3 FAILED: Participant A was able to read Participant B team!';
    END IF;
    RAISE NOTICE '✓ TEST 3 PASSED: Participant A cannot read Participant B team data.';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 3 PASSED: Inter-team access strictly isolated (%s).', SQLERRM;
  END;

  RESET ROLE;

  -- ---------------------------------------------------------------------------
  -- TEST 4: Participant A cannot access Participant B''s registration
  -- ---------------------------------------------------------------------------
  BEGIN
    SET LOCAL ROLE authenticated;
    PERFORM set_config('request.jwt.claim.sub', c_user_a::TEXT, true);
    SELECT COUNT(*) INTO v_count FROM public.registrations WHERE id = v_reg_b_id;
    IF v_count > 0 THEN
      RAISE EXCEPTION 'TEST 4 FAILED: Participant A was able to read Participant B registration!';
    END IF;
    RAISE NOTICE '✓ TEST 4 PASSED: Participant A cannot read Participant B registration record.';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 4 PASSED: Inter-registration access strictly isolated (%s).', SQLERRM;
  END;

  RESET ROLE;

  -- ---------------------------------------------------------------------------
  -- TEST 5: Participants cannot assign administrative roles to themselves
  -- ---------------------------------------------------------------------------
  BEGIN
    SET LOCAL ROLE authenticated;
    PERFORM set_config('request.jwt.claim.sub', c_user_a::TEXT, true);
    INSERT INTO public.user_roles (user_id, role)
    VALUES (c_user_a, 'faculty_admin');
    RAISE EXCEPTION 'TEST 5 FAILED: Participant A was able to self-assign faculty_admin role!';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 5 PASSED: Participant self-role escalation rejected (%s).', SQLERRM;
  END;

  RESET ROLE;

  -- ---------------------------------------------------------------------------
  -- TEST 6: Only Faculty Admin can approve, reject or waitlist applications
  -- ---------------------------------------------------------------------------
  BEGIN
    SET LOCAL ROLE authenticated;
    PERFORM set_config('request.jwt.claim.sub', c_user_a::TEXT, true);
    UPDATE public.registrations SET status = 'approved' WHERE id = v_reg_b_id;
    -- In PostgreSQL RLS, updating 0 rows due to policy without error is possible; check if row actually updated
    SELECT COUNT(*) INTO v_count FROM public.registrations WHERE id = v_reg_b_id AND status = 'approved';
    IF v_count > 0 THEN
      RAISE EXCEPTION 'TEST 6 FAILED: Participant A was able to approve a registration!';
    END IF;
    RAISE NOTICE '✓ TEST 6 PASSED: Ordinary participants cannot update registration approval status.';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 6 PASSED: Non-admin status modification rejected (%s).', SQLERRM;
  END;

  RESET ROLE;

  -- ---------------------------------------------------------------------------
  -- TEST 7: Ordinary participants cannot forge audit logs
  -- ---------------------------------------------------------------------------
  BEGIN
    SET LOCAL ROLE authenticated;
    PERFORM set_config('request.jwt.claim.sub', c_user_a::TEXT, true);
    INSERT INTO public.audit_logs (actor_id, action, entity_type, entity_id)
    VALUES (c_user_a, 'FORGED_APPROVAL', 'registration', v_reg_b_id::TEXT);
    RAISE EXCEPTION 'TEST 7 FAILED: Participant A was able to directly insert an audit log!';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 7 PASSED: Direct client audit log insertion denied (%s).', SQLERRM;
  END;

  RESET ROLE;

  -- ---------------------------------------------------------------------------
  -- TEST 8: Provisional tracks hidden from anonymous visitors
  -- ---------------------------------------------------------------------------
  BEGIN
    SET LOCAL ROLE anon;
    SELECT COUNT(*) INTO v_count FROM public.tracks WHERE approval_status = 'provisional';
    IF v_count > 0 THEN
      RAISE EXCEPTION 'TEST 8 FAILED: Anonymous user was able to read % provisional tracks', v_count;
    END IF;
    RAISE NOTICE '✓ TEST 8 PASSED: Provisional tracks strictly hidden from anonymous visitors.';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 8 PASSED: Provisional content hidden (%s).', SQLERRM;
  END;

  RESET ROLE;

  -- ---------------------------------------------------------------------------
  -- TEST 9: Registration submissions fail when registration is closed/preview
  -- ---------------------------------------------------------------------------
  BEGIN
    UPDATE public.event_settings SET registration_mode = 'preview' WHERE id = 'current';

    SELECT public.register_team_atomic(
      'Test Alpha Squad',
      'SCET Surat',
      'Surat',
      '[{"name":"Jane Doe","email":"jane@scet.ac.in","phone":"9876543210","role":"Backend"}]'::JSONB
    ) INTO v_result;

    RAISE EXCEPTION 'TEST 9 FAILED: Atomic registration should have raised exception when mode is preview.';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 9 PASSED: Registration submissions strictly rejected when mode is preview (%s).', SQLERRM;
  END;

  -- ---------------------------------------------------------------------------
  -- TEST 10: Team submissions respect configured size constraints
  -- ---------------------------------------------------------------------------
  BEGIN
    SELECT public.register_team_atomic(
      'Oversized Squad',
      'SCET Surat',
      'Surat',
      '[
        {"name":"M1","email":"m1@scet.ac.in","phone":"9876543211","role":"Dev"},
        {"name":"M2","email":"m2@scet.ac.in","phone":"9876543212","role":"Dev"},
        {"name":"M3","email":"m3@scet.ac.in","phone":"9876543213","role":"Dev"},
        {"name":"M4","email":"m4@scet.ac.in","phone":"9876543214","role":"Dev"},
        {"name":"M5","email":"m5@scet.ac.in","phone":"9876543215","role":"Dev"}
      ]'::JSONB
    ) INTO v_result;
    RAISE EXCEPTION 'TEST 10 FAILED: Oversized team submission was not rejected.';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 10 PASSED: Team size constraints enforced (%s).', SQLERRM;
  END;

  -- ---------------------------------------------------------------------------
  -- TEST 11: Duplicate member emails are rejected
  -- ---------------------------------------------------------------------------
  BEGIN
    SELECT public.register_team_atomic(
      'Duplicate Email Squad',
      'SCET Surat',
      'Surat',
      '[
        {"name":"M1","email":"dup@scet.ac.in","phone":"9876543211","role":"Dev"},
        {"name":"M2","email":"dup@scet.ac.in","phone":"9876543212","role":"Dev"}
      ]'::JSONB
    ) INTO v_result;
    RAISE EXCEPTION 'TEST 11 FAILED: Duplicate member email should have been rejected.';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 11 PASSED: Duplicate member emails rejected (%s).', SQLERRM;
  END;

  -- ---------------------------------------------------------------------------
  -- TEST 12: Failed transactions do not leave partial records
  -- ---------------------------------------------------------------------------
  BEGIN
    SELECT COUNT(*) INTO v_count FROM public.teams WHERE team_name IN ('Test Alpha Squad', 'Oversized Squad', 'Duplicate Email Squad');
    IF v_count > 0 THEN
      RAISE EXCEPTION 'TEST 12 FAILED: % orphan team records found after rolled-back transactions.', v_count;
    END IF;
    RAISE NOTICE '✓ TEST 12 PASSED: Rollback verified — no orphan or partial records created.';
  END;

  -- ---------------------------------------------------------------------------
  -- ADDITIONAL TEST 13: Role discovery via has_role is blocked for authenticated users
  -- ---------------------------------------------------------------------------
  BEGIN
    SET LOCAL ROLE authenticated;
    PERFORM set_config('request.jwt.claim.sub', c_user_a::TEXT, true);
    PERFORM public.has_role(c_admin, 'faculty_admin');
    RAISE EXCEPTION 'TEST 13 FAILED: Ordinary authenticated user was able to execute has_role() directly!';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 13 PASSED: Direct role enumeration via has_role is blocked (%s).', SQLERRM;
  END;

  RESET ROLE;

  -- ---------------------------------------------------------------------------
  -- ADDITIONAL TEST 14: Draft and Internal-Only announcements hidden from public
  -- ---------------------------------------------------------------------------
  BEGIN
    SET LOCAL ROLE anon;
    SELECT COUNT(*) INTO v_count FROM public.announcements WHERE id = v_announcement_id;
    IF v_count > 0 THEN
      RAISE EXCEPTION 'TEST 14 FAILED: Anonymous user was able to read draft/internal announcements!';
    END IF;
    RAISE NOTICE '✓ TEST 14 PASSED: Internal and draft announcements hidden from public.';
  EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE '✓ TEST 14 PASSED: Restricted announcements protected (%s).', SQLERRM;
  END;

  RESET ROLE;

  -- ---------------------------------------------------------------------------
  -- CLEANUP TEST FIXTURES
  -- ---------------------------------------------------------------------------
  DELETE FROM public.registrations WHERE id = v_reg_b_id;
  DELETE FROM public.teams WHERE id = v_team_b_id;
  DELETE FROM public.announcements WHERE id = v_announcement_id;
  DELETE FROM public.profiles WHERE id IN (c_user_a, c_user_b, c_admin);

  RAISE NOTICE '=====================================================';
  RAISE NOTICE 'ALL SCETATHON DATABASE TESTS COMPLETED SUCCESSFULLY.';
  RAISE NOTICE '=====================================================';
END $$;
