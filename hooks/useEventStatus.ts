"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { EventOperationalStatus } from "@/lib/types/database";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";

interface UseEventStatusOptions {
  initialStatus?: EventOperationalStatus;
  initialMessage?: string | null;
}

export function useEventStatus(options: UseEventStatusOptions = {}) {
  const [status, setStatus] = useState<EventOperationalStatus>(options.initialStatus || "preparing");
  const [message, setMessage] = useState<string | null>(
    options.initialMessage ?? "SCETATHON 24-hour event operations are currently in preparation mode."
  );
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(false);
  const channelRef = useRef<ReturnType<ReturnType<typeof createClient>["channel"]> | null>(null);

  const fetchLatest = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/operations/status");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          if (json.data.event_status) setStatus(json.data.event_status);
          if (json.data.public_status_message !== undefined) {
            setMessage(json.data.public_status_message);
          }
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      return;
    }

    try {
      const supabase = createClient();

      const channel = supabase
        .channel("public-event-status")
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "event_settings",
            filter: "id=eq.current",
          },
          (payload) => {
            const row = payload.new as {
              event_status?: EventOperationalStatus;
              public_status_message?: string;
            };
            if (row.event_status) setStatus(row.event_status);
            if (row.public_status_message !== undefined) {
              setMessage(row.public_status_message);
            }
          }
        )
        .subscribe((subStatus) => {
          setIsLiveConnected(subStatus === "SUBSCRIBED");
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
  }, []);

  return {
    status,
    message,
    isLiveConnected,
    refresh: fetchLatest,
  };
}
