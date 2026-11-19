"use client";

import { useState, useCallback, useMemo } from "react";
import { AnnouncementWithReadState } from "@/lib/types/database";

export function useNotificationFeed(initialFeed: AnnouncementWithReadState[]) {
  const [feed, setFeed] = useState<AnnouncementWithReadState[]>(initialFeed);
  const [isUpdating, setIsUpdating] = useState(false);

  const unreadCount = useMemo(() => {
    return feed.filter((item) => !item.is_read).length;
  }, [feed]);

  const markAsRead = useCallback(async (announcementId: string) => {
    // Optimistic update
    setFeed((prev) =>
      prev.map((item) =>
        item.id === announcementId ? { ...item, is_read: true, read_at: new Date().toISOString() } : item
      )
    );

    try {
      await fetch("/api/participant/announcements/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ announcementId }),
      });
    } catch {
      // Offline fallback preserves optimistic state
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    const unreadIds = feed.filter((item) => !item.is_read).map((item) => item.id);
    if (unreadIds.length === 0) return;

    setIsUpdating(true);
    // Optimistic update
    setFeed((prev) =>
      prev.map((item) => ({ ...item, is_read: true, read_at: new Date().toISOString() }))
    );

    try {
      await fetch("/api/participant/announcements/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true, announcementIds: unreadIds }),
      });
    } catch {
      // Offline fallback preserves optimistic state
    } finally {
      setIsUpdating(false);
    }
  }, [feed]);

  return {
    feed,
    unreadCount,
    isUpdating,
    markAsRead,
    markAllAsRead,
    setFeed,
  };
}

