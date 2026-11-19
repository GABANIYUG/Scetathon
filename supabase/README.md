# SCETATHON — Supabase Backend & Database Architecture

This directory contains the production database migrations, initial configuration seeds, and automated Row Level Security (RLS) tests for the SCETATHON platform.

---

## 1. Prerequisites & Project Creation

1. Create a project at [Supabase Dashboard](https://supabase.com/dashboard).
2. Note your **Project URL** and **anon / public key** from `Project Settings > API`.
3. In local development or production hosting (e.g. Vercel), configure the environment variables:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-anon-publishable-key>
   ```

---

## 2. Applying Migrations

### Option A: Using the Supabase CLI (Recommended)
```bash
# Log in to Supabase CLI
supabase login

# Link your local project to the remote project
supabase link --project-ref <your-project-ref>

# Push the schema migration to remote
supabase db push

# Apply candidate seeds (idempotent)
psql "$DATABASE_URL" -f supabase/seed.sql
```

### Option B: Using the Supabase SQL Editor
1. Open the [Supabase Dashboard SQL Editor](https://supabase.com/dashboard/project/_/sql).
2. Paste the contents of `supabase/migrations/20261119000000_scetathon_schema.sql` and run.
3. Paste the contents of `supabase/seed.sql` and run.

---

## 3. Provisioning the First Faculty Administrator

To prevent unauthorized privilege escalation, users can **never self-assign administrative roles**.

### Secure First-Admin Bootstrap Procedure:
1. The designated Faculty Lead signs up normally at `/signup` with their institutional email address (e.g., `faculty.lead@scet.ac.in`).
2. Verify the email via the received confirmation link.
3. Obtain the user's UUID from the Supabase Dashboard (`Authentication > Users`) or run:
   ```sql
   SELECT id, email FROM auth.users WHERE email = 'faculty.lead@scet.ac.in';
   ```
4. In the **Supabase SQL Editor**, assign the `faculty_admin` role:
   ```sql
   INSERT INTO public.user_roles (user_id, role)
   VALUES ('<INSERT-USER-UUID-HERE>', 'faculty_admin')
   ON CONFLICT (user_id, role) DO NOTHING;
   ```
5. Once assigned, this Faculty Administrator can provision other `student_lead` or `jury` roles directly through the platform or SQL Editor.

---

## 4. Running Automated RLS Security Tests

Run the test suite in `supabase/tests/rls_test.sql` directly in the Supabase SQL Editor:
```sql
-- Paste and run supabase/tests/rls_test.sql
```
This tests:
1. Anonymous users cannot read private teams.
2. Anonymous users cannot read registrations.
3. Participants cannot read other participants' teams.
4. Participants cannot approve their own registration.
5. Participants cannot elevate their own role.
6. Student Leads cannot perform Faculty Admin approval operations.
7. Faculty Admin permissions are granted and verified.
8. Provisional and unapproved content is hidden from public visitors.
9. Registration submissions fail when registration mode is closed or preview.
10. Team submissions enforce configured min/max size constraints.
11. Duplicate member emails are rejected.
12. Failed registration attempts cleanly rollback and leave zero orphan records.

---

## 5. Security & Boundary Architecture

- **Server-Side Authentication**: Handled via `@supabase/ssr` using cookies.
- **Verification Rule**: Server endpoints verify identity using `supabase.auth.getUser()`, never relying on client-side role claims or unverified cookie existence.
- **Row Level Security**: Active on every single table.
- **Atomic Operations**: Team submission is executed via the `register_team_atomic` PostgreSQL transaction, ensuring all-or-nothing consistency.

