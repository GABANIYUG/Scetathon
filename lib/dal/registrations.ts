import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Registration, RegistrationStatus, RegisterTeamAtomicResult } from "@/lib/types/database";

/**
 * Fetches the user's registration record.
 */
export async function getUserRegistration(userId: string): Promise<Registration | null> {
  if (!isSupabaseConfigured() || !userId) return null;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("registrations")
      .select("*, team:teams(*)")
      .eq("submitted_by", userId)
      .maybeSingle();

    if (error || !data) return null;
    return data as Registration;
  } catch {
    return null;
  }
}

/**
 * Fetches all registrations for Faculty Admins.
 */
export async function getAdminRegistrations(): Promise<Registration[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("registrations")
      .select("*, team:teams(*)")
      .order("submitted_at", { ascending: false });

    if (error || !data) return [];
    return data as Registration[];
  } catch {
    return [];
  }
}

/**
 * Submits team registration via the atomic PostgreSQL RPC function.
 */
export async function submitAtomicRegistration(params: {
  teamName: string;
  institutionName: string;
  institutionCity: string;
  members: { name: string; email: string; phone?: string; role: string }[];
}): Promise<{ success: boolean; data?: RegisterTeamAtomicResult; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Database connection is not configured. Live submissions require a connected Supabase project.",
    };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.rpc("register_team_atomic", {
      p_team_name: params.teamName,
      p_institution_name: params.institutionName,
      p_institution_city: params.institutionCity,
      p_members: params.members,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: data as RegisterTeamAtomicResult,
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Registration transaction failed";
    return { success: false, error: message };
  }
}

/**
 * Updates application admission decision (Faculty Admin only).
 */
export async function updateRegistrationStatus(
  registrationId: string,
  newStatus: RegistrationStatus,
  reviewNote?: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Database is not connected." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Authentication required" };

    const { data: reg, error: fetchErr } = await supabase
      .from("registrations")
      .select("team_id")
      .eq("id", registrationId)
      .single();

    if (fetchErr || !reg) return { success: false, error: "Registration record not found" };

    // Update registration record
    const { error: updateErr } = await supabase
      .from("registrations")
      .update({
        status: newStatus,
        reviewed_at: new Date().toISOString(),
        reviewed_by: user.id,
        review_note: reviewNote || null,
      })
      .eq("id", registrationId);

    if (updateErr) return { success: false, error: updateErr.message };

    // Synchronize status with teams table
    await supabase
      .from("teams")
      .update({ registration_status: newStatus })
      .eq("id", reg.team_id);

    // Audit log
    await supabase.from("audit_logs").insert({
      actor_id: user.id,
      action: `REGISTRATION_STATUS_${newStatus.toUpperCase()}`,
      entity_type: "registration",
      entity_id: registrationId,
      metadata: { new_status: newStatus, note: reviewNote },
    });

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update registration status";
    return { success: false, error: message };
  }
}

