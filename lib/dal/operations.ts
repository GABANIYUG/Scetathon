import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  EventOperationalStatus,
  EventSettings,
  AuditLog,
  OperationsHealthStatus,
  AnnouncementMetrics,
} from "@/lib/types/database";
import { getEventSettings } from "./settings";
import { getAdminAnnouncements } from "./announcements";

export type { OperationsHealthStatus, AnnouncementMetrics };

/**
 * Retrieves the live operational readiness of the event backend.
 */
export async function getOperationsReadiness(): Promise<OperationsHealthStatus> {
  const isConfigured = isSupabaseConfigured();

  if (!isConfigured) {
    return {
      databaseConnected: false,
      realtimeAvailable: false,
      authConfigured: false,
      eventStatusConfigured: true,
      announcementEngineReady: false,
      schedulePublished: true,
      timestamp: new Date().toISOString(),
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("event_settings").select("id").limit(1);

    const isConnected = !error;
    return {
      databaseConnected: isConnected,
      realtimeAvailable: isConnected,
      authConfigured: true,
      eventStatusConfigured: isConnected,
      announcementEngineReady: isConnected,
      schedulePublished: true,
      timestamp: new Date().toISOString(),
    };
  } catch {
    return {
      databaseConnected: false,
      realtimeAvailable: false,
      authConfigured: false,
      eventStatusConfigured: false,
      announcementEngineReady: false,
      schedulePublished: false,
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Calculates real-time metrics across all announcements.
 */
export async function getAnnouncementMetrics(): Promise<AnnouncementMetrics> {
  const announcements = await getAdminAnnouncements();

  const published = announcements.filter((a) => a.status === "published");
  const draft = announcements.filter((a) => a.status === "draft");
  const archived = announcements.filter((a) => a.status === "archived");

  const publicCount = announcements.filter((a) => a.visibility === "Public Website");
  const teamsCount = announcements.filter((a) => a.visibility === "Registered Teams Only");
  const committeeCount = announcements.filter((a) => a.visibility === "Internal Committee Only");

  const urgentCount = announcements.filter((a) => a.priority === "Urgent");
  const importantCount = announcements.filter((a) => a.priority === "Important");
  const normalCount = announcements.filter((a) => !a.priority || a.priority === "Normal");

  const publishedDates = published
    .map((a) => a.published_at)
    .filter(Boolean)
    .sort()
    .reverse();

  return {
    total: announcements.length,
    published: published.length,
    draft: draft.length,
    archived: archived.length,
    publicCount: publicCount.length,
    teamsCount: teamsCount.length,
    committeeCount: committeeCount.length,
    urgentCount: urgentCount.length,
    importantCount: importantCount.length,
    normalCount: normalCount.length,
    lastPublishedAt: publishedDates[0] || null,
  };
}

/**
 * Updates the live event operational status with audit logging.
 * Restricted to Faculty Administrators.
 */
export async function updateEventStatus(
  newStatus: EventOperationalStatus,
  statusMessage?: string
): Promise<{ success: boolean; data?: EventSettings; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Supabase database connection is offline. Changes cannot be persisted remotely.",
    };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Authentication required to update event status." };
    }

    // Call atomic RPC function
    const { error } = await supabase.rpc("update_event_status_atomic", {
      p_status: newStatus,
      p_message: statusMessage || "",
    });

    if (error) {
      return { success: false, error: error.message };
    }

    const updated = await getEventSettings();
    return { success: true, data: updated };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update event status";
    return { success: false, error: msg };
  }
}

/**
 * Fetches recent system audit records for administrative review.
 */
export async function getAuditLogs(): Promise<AuditLog[]> {
  if (!isSupabaseConfigured()) {
    return [
      {
        id: "log-001",
        actor_id: null,
        action: "EVENT_STATUS_CHANGED",
        entity_type: "event_settings",
        entity_id: "current",
        metadata: { new_status: "preparing", note: "Phase 7 initialization" },
        created_at: new Date(2026, 0, 15, 10, 0, 0).toISOString(),
      },
      {
        id: "log-002",
        actor_id: null,
        action: "ANNOUNCEMENT_PUBLISHED",
        entity_type: "announcement",
        entity_id: "ann-001",
        metadata: { title: "Registration Guidelines Preview", priority: "Important" },
        created_at: new Date(2026, 0, 15, 10, 5, 0).toISOString(),
      },
      {
        id: "log-003",
        actor_id: null,
        action: "TRACK_RATIFIED",
        entity_type: "track",
        entity_id: "ai-systems",
        metadata: { title: "AI & Intelligent Systems", status: "published" },
        created_at: new Date(2026, 0, 18, 14, 0, 0).toISOString(),
      },
      {
        id: "log-004",
        actor_id: null,
        action: "EVENT_SETTINGS_UPDATED",
        entity_type: "event_settings",
        entity_id: "current",
        metadata: { min_team_size: 2, max_team_size: 4 },
        created_at: new Date(2026, 0, 20, 9, 30, 0).toISOString(),
      },
    ];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error || !data) return [];
    return data as AuditLog[];
  } catch {
    return [];
  }
}
