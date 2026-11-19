import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { UserRoleType } from "@/lib/types/database";

/**
 * Returns the currently authenticated Supabase user.
 * Verified against the Supabase Auth server using getUser().
 */
export async function getCurrentUser() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) return null;
    return user;
  } catch {
    return null;
  }
}

/**
 * Fetches all roles assigned to the given user ID.
 */
export async function getUserRoles(userId: string): Promise<UserRoleType[]> {
  if (!isSupabaseConfigured() || !userId) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId);

    if (error || !data) return [];
    return data.map((r) => r.role as UserRoleType);
  } catch {
    return [];
  }
}

/**
 * Checks whether the current session user has the faculty_admin role.
 */
export async function isFacultyAdmin(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const roles = await getUserRoles(user.id);
  return roles.includes("faculty_admin");
}

/**
 * Checks whether the current session user has student_lead or faculty_admin role.
 */
export async function isStudentLead(): Promise<boolean> {
  const user = await getCurrentUser();
  if (!user) return false;

  const roles = await getUserRoles(user.id);
  return roles.includes("student_lead") || roles.includes("faculty_admin");
}

