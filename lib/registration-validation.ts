/**
 * Registration Validation — Types, interfaces, and pure validation functions.
 * No side-effects, no external calls. Fully typed.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export type RegistrationMode = "preview" | "open" | "closed" | "coming_soon";

export type RegistrationStep = 1 | 2 | 3 | 4;

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string; // e.g. "Frontend Developer", "ML Engineer"
  isLeader: boolean;
}

export interface TeamDetails {
  teamName: string;
  collegeName: string;
  city: string;
  leaderName: string;
  leaderEmail: string;
  leaderPhone: string;
}

export interface RegistrationFormData {
  teamDetails: TeamDetails;
  members: TeamMember[];
  consentGiven: boolean;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface StepValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Validates an RFC 5322-simplified email address */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/** Validates an Indian mobile number (10 digits, optionally prefixed with +91 or 0) */
export function isValidIndianPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s\-().+]/g, "");
  // Allow optional country code 91
  const normalised = cleaned.startsWith("91") && cleaned.length === 12
    ? cleaned.slice(2)
    : cleaned;
  return /^[6-9]\d{9}$/.test(normalised);
}

/** Returns true if the string contains at least `min` non-whitespace chars */
export function hasMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}

// ─── Step 1 Validation ───────────────────────────────────────────────────────

export function validateTeamDetails(
  details: TeamDetails
): StepValidationResult {
  const errors: ValidationError[] = [];

  if (!hasMinLength(details.teamName, 3)) {
    errors.push({ field: "teamName", message: "Team name must be at least 3 characters." });
  }
  if (details.teamName.trim().length > 60) {
    errors.push({ field: "teamName", message: "Team name must be 60 characters or fewer." });
  }
  if (!hasMinLength(details.collegeName, 4)) {
    errors.push({ field: "collegeName", message: "College name is required." });
  }
  if (!hasMinLength(details.city, 2)) {
    errors.push({ field: "city", message: "City is required." });
  }
  if (!hasMinLength(details.leaderName, 2)) {
    errors.push({ field: "leaderName", message: "Leader name must be at least 2 characters." });
  }
  if (!isValidEmail(details.leaderEmail)) {
    errors.push({ field: "leaderEmail", message: "Enter a valid email address." });
  }
  if (!isValidIndianPhone(details.leaderPhone)) {
    errors.push({ field: "leaderPhone", message: "Enter a valid 10-digit Indian mobile number." });
  }

  return { isValid: errors.length === 0, errors };
}

// ─── Step 2 Validation ───────────────────────────────────────────────────────

export function validateTeamMembers(
  members: TeamMember[],
  teamDetails: TeamDetails,
  minSize: number,
  maxSize: number
): StepValidationResult {
  const errors: ValidationError[] = [];

  // Total team = leader + members
  const totalCount = members.length + 1; // +1 for leader

  if (totalCount < minSize) {
    errors.push({
      field: "members",
      message: `Your team needs at least ${minSize} members (including the leader). Add ${minSize - totalCount} more.`,
    });
  }
  if (totalCount > maxSize) {
    errors.push({
      field: "members",
      message: `Maximum team size is ${maxSize} (including the leader). Remove ${totalCount - maxSize} members.`,
    });
  }

  // Validate each member's fields
  members.forEach((m, i) => {
    const prefix = `member_${m.id}`;
    if (!hasMinLength(m.name, 2)) {
      errors.push({ field: `${prefix}_name`, message: `Member ${i + 1}: Name is required.` });
    }
    if (!isValidEmail(m.email)) {
      errors.push({ field: `${prefix}_email`, message: `Member ${i + 1}: Enter a valid email.` });
    }
    if (!isValidIndianPhone(m.phone)) {
      errors.push({ field: `${prefix}_phone`, message: `Member ${i + 1}: Enter a valid mobile number.` });
    }
    if (!hasMinLength(m.role, 2)) {
      errors.push({ field: `${prefix}_role`, message: `Member ${i + 1}: Role is required.` });
    }
  });

  // Duplicate email detection (across members AND leader)
  const allEmails = [
    teamDetails.leaderEmail.trim().toLowerCase(),
    ...members.map((m) => m.email.trim().toLowerCase()),
  ];
  const seen = new Set<string>();
  const duplicates = new Set<string>();
  for (const email of allEmails) {
    if (seen.has(email)) duplicates.add(email);
    seen.add(email);
  }
  if (duplicates.size > 0) {
    errors.push({
      field: "members_duplicate_email",
      message: `Each member must have a unique email. Duplicate(s) found: ${[...duplicates].join(", ")}`,
    });
  }

  return { isValid: errors.length === 0, errors };
}

// ─── Step 3 Validation ───────────────────────────────────────────────────────

export function validateReview(consentGiven: boolean): StepValidationResult {
  const errors: ValidationError[] = [];
  if (!consentGiven) {
    errors.push({ field: "consent", message: "You must acknowledge the preview notice to continue." });
  }
  return { isValid: errors.length === 0, errors };
}

// ─── Utility ─────────────────────────────────────────────────────────────────

/** Builds an empty TeamMember with a generated id */
export function createEmptyMember(): TeamMember {
  return {
    id: `m_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    name: "",
    email: "",
    phone: "",
    role: "",
    isLeader: false,
  };
}

export const EMPTY_TEAM_DETAILS: TeamDetails = {
  teamName: "",
  collegeName: "",
  city: "",
  leaderName: "",
  leaderEmail: "",
  leaderPhone: "",
};

export const INITIAL_FORM_DATA: RegistrationFormData = {
  teamDetails: { ...EMPTY_TEAM_DETAILS },
  members: [],
  consentGiven: false,
};

