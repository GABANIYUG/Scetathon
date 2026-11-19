import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import {
  Announcement,
  AnnouncementWithReadState,
  AnnouncementCategory,
  AnnouncementPriority,
  AnnouncementVisibility,
  AnnouncementStatus,
} from "@/lib/types/database";

/**
 * Standard provisional candidate announcements used when the database is offline.
 */
export const FALLBACK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-001",
    title: "SCETATHON 24-Hour Hackathon Registration Preview Mode Active",
    summary: "Collegiate squads may inspect challenge tracks and assemble participant credentials prior to registration opening.",
    content: "The SCETATHON Technical Committee has published the provisional registration criteria and track domains. Teams consisting of 2 to 4 undergraduate or graduate engineering students from recognized colleges will be eligible to apply once registration officially opens.",
    category: "Registration",
    status: "published",
    visibility: "Public Website",
    priority: "Important",
    pinned: true,
    author_label: "Technical Committee & Organizing Core",
    created_by: null,
    published_at: new Date(2026, 0, 15, 10, 0, 0).toISOString(),
    created_at: new Date(2026, 0, 15, 9, 30, 0).toISOString(),
    updated_at: new Date(2026, 0, 15, 10, 0, 0).toISOString(),
  },
  {
    id: "ann-002",
    title: "Six Challenge Tracks Ratified for SCETATHON Edition",
    summary: "Explore problem statements spanning AI Systems, Next-Gen Fintech, Smart Cities, Cyber Defense, Green Tech, and Open Innovation.",
    content: "All six challenge domains have been ratified by academic mentors and industry partners. Detailed rubrics, technical competencies, and architectural guidelines are accessible on the Challenges page.",
    category: "Challenges",
    status: "published",
    visibility: "Public Website",
    priority: "Normal",
    pinned: false,
    author_label: "Academic Mentorship Council",
    created_by: null,
    published_at: new Date(2026, 0, 18, 14, 0, 0).toISOString(),
    created_at: new Date(2026, 0, 18, 13, 0, 0).toISOString(),
    updated_at: new Date(2026, 0, 18, 14, 0, 0).toISOString(),
  },
  {
    id: "ann-003",
    title: "24-Hour Operational Schedule Architecture Released",
    summary: "Phase breakdown from opening ceremonies and mentor checkpoints through code freeze and final jury presentations.",
    content: "Participants can review the complete timeline for the 24-hour sprint. Checkpoints 1 through 3 will feature dedicated industry mentors to unblock architecture and implementation challenges.",
    category: "Schedule",
    status: "published",
    visibility: "Public Website",
    priority: "Normal",
    pinned: false,
    author_label: "Event Operations Lead",
    created_by: null,
    published_at: new Date(2026, 0, 20, 11, 0, 0).toISOString(),
    created_at: new Date(2026, 0, 20, 10, 30, 0).toISOString(),
    updated_at: new Date(2026, 0, 20, 11, 0, 0).toISOString(),
  },
  {
    id: "ann-004",
    title: "Squad Verification & Workstation Networking Instructions",
    summary: "Crucial instructions for accepted team leaders regarding campus arrival, power distribution, and local subnet credentials.",
    content: "Team leaders must present official college photo IDs at the check-in desk at SCET Campus. High-speed wired ports and dual 5GHz Wi-Fi networks will be allocated per squad station.",
    category: "Event Operations",
    status: "published",
    visibility: "Registered Teams Only",
    priority: "Urgent",
    pinned: true,
    author_label: "Campus Infrastructure Team",
    created_by: null,
    published_at: new Date(2026, 0, 22, 16, 0, 0).toISOString(),
    created_at: new Date(2026, 0, 22, 15, 30, 0).toISOString(),
    updated_at: new Date(2026, 0, 22, 16, 0, 0).toISOString(),
  },
];

/**
 * Retrieves public website announcements for the public feed (/updates and homepage).
 * Strictly filters out drafts, registered-only, and committee-internal announcements.
 */
export async function getPublicAnnouncements(): Promise<Announcement[]> {
  if (!isSupabaseConfigured()) {
    return FALLBACK_ANNOUNCEMENTS.filter(
      (a) => a.status === "published" && a.visibility === "Public Website"
    );
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("status", "published")
      .eq("visibility", "Public Website")
      .order("pinned", { ascending: false })
      .order("published_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return FALLBACK_ANNOUNCEMENTS.filter(
        (a) => a.status === "published" && a.visibility === "Public Website"
      );
    }

    return data as Announcement[];
  } catch {
    return FALLBACK_ANNOUNCEMENTS.filter(
      (a) => a.status === "published" && a.visibility === "Public Website"
    );
  }
}

/**
 * Retrieves announcements accessible to an authenticated participant,
 * merged with their read receipts.
 */
export async function getParticipantAnnouncements(
  userId: string
): Promise<AnnouncementWithReadState[]> {
  if (!isSupabaseConfigured() || !userId) {
    // Offline fallback for preview mode
    return FALLBACK_ANNOUNCEMENTS.filter(
      (a) => a.status === "published" && (a.visibility === "Public Website" || a.visibility === "Registered Teams Only")
    ).map((a) => ({
      ...a,
      is_read: false,
      read_at: null,
    }));
  }

  try {
    const supabase = await createClient();

    // 1. Fetch accessible announcements (enforced by RLS)
    const { data: announcements, error: annErr } = await supabase
      .from("announcements")
      .select("*")
      .eq("status", "published")
      .order("pinned", { ascending: false })
      .order("published_at", { ascending: false });

    if (annErr || !announcements) return [];

    // 2. Fetch user's read receipts
    const { data: reads } = await supabase
      .from("announcement_reads")
      .select("announcement_id, read_at")
      .eq("user_id", userId);

    const readMap = new Map<string, string>();
    if (reads) {
      reads.forEach((r) => readMap.set(r.announcement_id, r.read_at));
    }

    return announcements.map((ann) => ({
      ...(ann as Announcement),
      is_read: readMap.has(ann.id),
      read_at: readMap.get(ann.id) || null,
    }));
  } catch {
    return [];
  }
}

/**
 * Retrieves all announcements for administrators (including drafts and archives).
 */
export async function getAdminAnnouncements(): Promise<Announcement[]> {
  if (!isSupabaseConfigured()) {
    return FALLBACK_ANNOUNCEMENTS;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return FALLBACK_ANNOUNCEMENTS;
    }

    return data as Announcement[];
  } catch {
    return FALLBACK_ANNOUNCEMENTS;
  }
}

/**
 * Creates a new announcement draft or published broadcast.
 */
export async function createAnnouncement(params: {
  title: string;
  summary: string;
  content: string;
  category: AnnouncementCategory;
  visibility: AnnouncementVisibility;
  priority?: AnnouncementPriority;
  status?: AnnouncementStatus;
  authorLabel?: string;
}): Promise<{ success: boolean; data?: Announcement; error?: string }> {
  if (!isSupabaseConfigured()) {
    return {
      success: false,
      error: "Supabase connection is offline. New announcements cannot be stored in the database.",
    };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { success: false, error: "Authentication required to publish announcements." };
    }

    const isPublished = params.status === "published";
    const newRecord = {
      title: params.title.trim(),
      summary: params.summary.trim(),
      content: params.content.trim(),
      category: params.category,
      visibility: params.visibility,
      priority: params.priority || "Normal",
      status: params.status || "draft",
      author_label: params.authorLabel?.trim() || "SCET Organizing Committee",
      created_by: user.id,
      published_at: isPublished ? new Date().toISOString() : null,
    };

    const { data, error } = await supabase
      .from("announcements")
      .insert(newRecord)
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    // Record audit log
    await supabase.from("audit_logs").insert({
      actor_id: user.id,
      action: isPublished ? "ANNOUNCEMENT_PUBLISHED" : "ANNOUNCEMENT_DRAFT_CREATED",
      entity_type: "announcement",
      entity_id: data.id,
      metadata: {
        title: params.title,
        visibility: params.visibility,
        category: params.category,
        priority: params.priority || "Normal",
      },
    });

    return { success: true, data: data as Announcement };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to create announcement";
    return { success: false, error: msg };
  }
}

/**
 * Updates an existing announcement record.
 */
export async function updateAnnouncement(
  id: string,
  updates: Partial<Omit<Announcement, "id" | "created_at" | "updated_at">>
): Promise<{ success: boolean; data?: Announcement; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Database not connected." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Authentication required." };

    const { data, error } = await supabase
      .from("announcements")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    await supabase.from("audit_logs").insert({
      actor_id: user.id,
      action: "ANNOUNCEMENT_UPDATED",
      entity_type: "announcement",
      entity_id: id,
      metadata: updates,
    });

    return { success: true, data: data as Announcement };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to update announcement";
    return { success: false, error: msg };
  }
}

/**
 * Idempotently transitions an announcement to 'published' status.
 */
export async function publishAnnouncement(
  id: string
): Promise<{ success: boolean; data?: Announcement; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Database not connected." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Authentication required." };

    const { data, error } = await supabase
      .from("announcements")
      .update({
        status: "published",
        published_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) return { success: false, error: error.message };

    await supabase.from("audit_logs").insert({
      actor_id: user.id,
      action: "ANNOUNCEMENT_PUBLISHED",
      entity_type: "announcement",
      entity_id: id,
      metadata: { published_at: new Date().toISOString() },
    });

    return { success: true, data: data as Announcement };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to publish announcement";
    return { success: false, error: msg };
  }
}

/**
 * Transitions an announcement to 'archived' status.
 */
export async function archiveAnnouncement(
  id: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Database not connected." };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { success: false, error: "Authentication required." };

    const { error } = await supabase
      .from("announcements")
      .update({ status: "archived" })
      .eq("id", id);

    if (error) return { success: false, error: error.message };

    await supabase.from("audit_logs").insert({
      actor_id: user.id,
      action: "ANNOUNCEMENT_ARCHIVED",
      entity_type: "announcement",
      entity_id: id,
      metadata: {},
    });

    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to archive announcement";
    return { success: false, error: msg };
  }
}

/**
 * Marks an announcement as read for an authenticated participant.
 */
export async function markAnnouncementAsRead(
  announcementId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    // Offline simulated success for preview
    return { success: true };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("announcement_reads").upsert(
      {
        announcement_id: announcementId,
        user_id: userId,
        read_at: new Date().toISOString(),
      },
      { onConflict: "announcement_id,user_id" }
    );

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to mark announcement as read";
    return { success: false, error: msg };
  }
}

/**
 * Batch marks a list of announcements as read for the user.
 */
export async function markAllAnnouncementsAsRead(
  userId: string,
  announcementIds: string[]
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || announcementIds.length === 0) {
    return { success: true };
  }

  try {
    const supabase = await createClient();
    const records = announcementIds.map((annId) => ({
      announcement_id: annId,
      user_id: userId,
      read_at: new Date().toISOString(),
    }));

    const { error } = await supabase
      .from("announcement_reads")
      .upsert(records, { onConflict: "announcement_id,user_id" });

    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to mark all as read";
    return { success: false, error: msg };
  }
}

