"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { Announcement } from "@/lib/types/database";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";

export type RealtimeStatus = "connected" | "connecting" | "offline" | "error";

interface UseRealtimeAnnouncementsOptions {
  initialAnnouncements?: Announcement[];
  onNewAnnouncement?: (announcement: Announcement) => void;
  channelName?: string;
}

export function useRealtimeAnnouncements({
  initialAnnouncements = [],
  onNewAnnouncement,
  channelName = "public-announcements",
}: UseRealtimeAnnouncementsOptions = {}) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [status, setStatus] = useState<RealtimeStatus>(() =>
    isSupabaseConfigured() ? "connecting" : "offline"
  );
  const [lastRefreshedAt, setLastRefreshedAt] = useState<Date>(new Date());
  const channelRef = useRef<ReturnType<ReturnType<typeof createClient>["channel"]> | null>(null);

  const refreshAnnouncements = useCallback(async () => {
    try {
      const res = await fetch("/api/updates");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          setAnnouncements(json.data);
          setLastRefreshedAt(new Date());
        }
      }
    } catch {
      // Ignore network errors on refresh
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    try {
      const supabase = createClient();

      const channel = supabase
        .channel(channelName)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "announcements",
          },
          (payload) => {
            // Re-fetch to respect RLS and security boundaries
            refreshAnnouncements();

            if (payload.eventType === "INSERT" && onNewAnnouncement) {
              onNewAnnouncement(payload.new as Announcement);
            }
          }
        )
        .subscribe((subStatus) => {
          if (subStatus === "SUBSCRIBED") {
            setStatus("connected");
          } else if (subStatus === "CHANNEL_ERROR") {
            setStatus("error");
          } else if (subStatus === "TIMED_OUT" || subStatus === "CLOSED") {
            setStatus("offline");
          }
        });

      channelRef.current = channel;

      return () => {
        if (channelRef.current) {
          supabase.removeChannel(channelRef.current);
          channelRef.current = null;
        }
      };
    } catch {
      // Offline fallback
    }
  }, [channelName, onNewAnnouncement, refreshAnnouncements]);

  return {
    announcements,
    status,
    lastRefreshedAt,
    refresh: refreshAnnouncements,
  };
}
