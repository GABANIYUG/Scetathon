import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { EventSettings } from "@/lib/types/database";
import { registrationConfig } from "@/config/registration";
import { siteConfig } from "@/config/site";

export async function getEventSettings(): Promise<EventSettings> {
  const fallback: EventSettings = {
    id: "current",
    event_name: siteConfig.name,
    tagline: siteConfig.tagline,
    registration_mode: registrationConfig.mode,
    event_status: "preparing",
    public_status_message: "SCETATHON 24-hour event operations are currently in preparation mode.",
    status_updated_by: null,
    status_updated_at: new Date(2026, 0, 1).toISOString(),
    opens_at: null,
    closes_at: null,
    min_team_size: registrationConfig.teamSize.min,
    max_team_size: registrationConfig.teamSize.max,
    allow_solo: registrationConfig.allowSolo,
    eligibility_information: "Open to enrolled engineering students from recognized colleges.",
    updated_by: null,
    updated_at: new Date(2026, 0, 1).toISOString(),
  };

  if (!isSupabaseConfigured()) {
    return fallback;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("event_settings")
      .select("*")
      .eq("id", "current")
      .single();

    if (error || !data) return fallback;
    return data as EventSettings;
  } catch {
    return fallback;
  }
}

export async function updateEventSettings(
  updates: Partial<Omit<EventSettings, "id" | "updated_at">>
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Database not connected." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Authentication required" };

    const { error } = await supabase
      .from("event_settings")
      .update({
        ...updates,
        updated_by: user.id,
      })
      .eq("id", "current");

    if (error) return { success: false, error: error.message };

    // Record audit log
    await supabase.from("audit_logs").insert({
      actor_id: user.id,
      action: "EVENT_SETTINGS_UPDATED",
      entity_type: "event_settings",
      entity_id: "current",
      metadata: updates,
    });

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update event settings";
    return { success: false, error: message };
  }
}

