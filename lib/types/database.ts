export type UserRoleType = "faculty_admin" | "student_lead" | "jury";

export type RegistrationStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "waitlisted";

export type TrackApprovalStatus =
  | "draft"
  | "provisional"
  | "approved"
  | "published";

export type AnnouncementStatus = "draft" | "published" | "archived";

export type AnnouncementCategory =
  | "General"
  | "Registration"
  | "Challenges"
  | "Schedule"
  | "Important Notice";

export type AnnouncementVisibility =
  | "Public Website"
  | "Registered Teams Only"
  | "Internal Committee Only";

export type RegistrationMode = "preview" | "open" | "closed" | "coming_soon";

export interface Profile {
  id: string;
  full_name: string;
  phone: string | null;
  institution_name: string | null;
  created_at: string;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: UserRoleType;
  assigned_by: string | null;
  created_at: string;
}

export interface Team {
  id: string;
  team_name: string;
  institution_name: string;
  institution_city: string;
  leader_id: string;
  registration_status: RegistrationStatus;
  assigned_track_id: string | null;
  created_at: string;
  updated_at: string;
  submitted_at: string | null;
}

export interface TeamMember {
  id: string;
  team_id: string;
  full_name: string;
  email: string;
  phone: string | null;
  institution_name: string | null;
  department: string | null;
  technical_role: string;
  is_leader: boolean;
  created_at: string;
  updated_at: string;
}

export interface Registration {
  id: string;
  team_id: string;
  submitted_by: string;
  status: RegistrationStatus;
  submitted_at: string;
  reviewed_at: string | null;
  reviewed_by: string | null;
  review_note: string | null;
  created_at: string;
  updated_at: string;
  // Joined relation fields
  team?: Team;
}

export interface Track {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  detailed_overview: string | null;
  competencies: string[];
  key_themes: string[];
  opportunity_areas: string[];
  approval_status: TrackApprovalStatus;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface SchedulePhaseRecord {
  id: string;
  phase_number: string;
  title: string;
  short_summary: string;
  hour_range: string;
  relative_time: string;
  detailed_agenda: string[];
  operational_focus: string;
  participant_instructions: string | null;
  approval_status: TrackApprovalStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: AnnouncementCategory;
  status: AnnouncementStatus;
  visibility: AnnouncementVisibility;
  author_label: string | null;
  created_by: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventSettings {
  id: string;
  event_name: string;
  tagline: string;
  registration_mode: RegistrationMode;
  opens_at: string | null;
  closes_at: string | null;
  min_team_size: number;
  max_team_size: number;
  allow_solo: boolean;
  eligibility_information: string | null;
  updated_by: string | null;
  updated_at: string;
}

export interface AuditLog {
  id: string;
  actor_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface RegisterTeamAtomicResult {
  success: boolean;
  registration_id: string;
  team_id: string;
  team_name: string;
  status: RegistrationStatus;
}

