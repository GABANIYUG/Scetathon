import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Track, SchedulePhaseRecord } from "@/lib/types/database";
import { challengeTracks as staticTracks } from "@/config/tracks";
import { schedulePhases as staticPhases } from "@/config/schedule";

// ─── Challenge Tracks ─────────────────────────────────────────────────────────

export async function getPublishedTracks(): Promise<Track[]> {
  if (!isSupabaseConfigured()) {
    // Return statically configured provisional tracks
    return staticTracks.map((t) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      category: t.category,
      short_description: t.shortDescription,
      detailed_overview: t.detailedOverview,
      competencies: t.technicalCompetencies,
      key_themes: t.keyThemes,
      opportunity_areas: t.opportunityAreas,
      approval_status: t.status === "RATIFIED" ? "published" : "provisional",
      published_at: null,
      created_by: null,
      created_at: new Date(2026, 0, 1).toISOString(),
      updated_at: new Date(2026, 0, 1).toISOString(),
    }));
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tracks")
      .select("*")
      .eq("approval_status", "published")
      .order("id");

    if (error || !data || data.length === 0) {
      // Fallback to static if no published tracks in database yet
      return staticTracks.map((t) => ({
        id: t.id,
        title: t.title,
        slug: t.slug,
        category: t.category,
        short_description: t.shortDescription,
        detailed_overview: t.detailedOverview,
        competencies: t.technicalCompetencies,
        key_themes: t.keyThemes,
        opportunity_areas: t.opportunityAreas,
        approval_status: "provisional",
        published_at: null,
        created_by: null,
        created_at: new Date(2026, 0, 1).toISOString(),
        updated_at: new Date(2026, 0, 1).toISOString(),
      }));
    }

    return data as Track[];
  } catch {
    return [];
  }
}

export async function getAdminTracks(): Promise<Track[]> {
  if (!isSupabaseConfigured()) {
    return staticTracks.map((t) => ({
      id: t.id,
      title: t.title,
      slug: t.slug,
      category: t.category,
      short_description: t.shortDescription,
      detailed_overview: t.detailedOverview,
      competencies: t.technicalCompetencies,
      key_themes: t.keyThemes,
      opportunity_areas: t.opportunityAreas,
      approval_status: "provisional",
      published_at: null,
      created_by: null,
      created_at: new Date(2026, 0, 1).toISOString(),
      updated_at: new Date(2026, 0, 1).toISOString(),
    }));
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tracks")
      .select("*")
      .order("id");

    if (error || !data) return [];
    return data as Track[];
  } catch {
    return [];
  }
}

export async function saveTrack(track: Partial<Track> & { id: string }): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Database not connected." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from("tracks")
      .upsert(track);

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save track";
    return { success: false, error: message };
  }
}

// ─── Schedule Phases ─────────────────────────────────────────────────────────

export async function getPublishedSchedule(): Promise<SchedulePhaseRecord[]> {
  if (!isSupabaseConfigured()) {
    return staticPhases.map((p) => ({
      id: p.phase.toLowerCase().replace(/\s+/g, "-"),
      phase_number: p.phase,
      title: p.title,
      short_summary: p.shortSummary,
      hour_range: p.hourRange,
      relative_time: p.relativeTime,
      detailed_agenda: p.detailedAgenda,
      operational_focus: p.operationalFocus,
      participant_instructions: p.participantInstructions,
      approval_status: "provisional",
      published_at: null,
      created_at: new Date(2026, 0, 1).toISOString(),
      updated_at: new Date(2026, 0, 1).toISOString(),
    }));
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("schedule_phases")
      .select("*")
      .eq("approval_status", "published")
      .order("id");

    if (error || !data || data.length === 0) {
      return staticPhases.map((p) => ({
        id: p.phase.toLowerCase().replace(/\s+/g, "-"),
        phase_number: p.phase,
        title: p.title,
        short_summary: p.shortSummary,
        hour_range: p.hourRange,
        relative_time: p.relativeTime,
        detailed_agenda: p.detailedAgenda,
        operational_focus: p.operationalFocus,
        participant_instructions: p.participantInstructions,
        approval_status: "provisional",
        published_at: null,
        created_at: new Date(2026, 0, 1).toISOString(),
        updated_at: new Date(2026, 0, 1).toISOString(),
      }));
    }

    return data as SchedulePhaseRecord[];
  } catch {
    return [];
  }
}

// ─── Announcements (Re-exported from dedicated announcements DAL) ───────────────

export {
  getPublicAnnouncements,
  getAdminAnnouncements,
} from "./announcements";

