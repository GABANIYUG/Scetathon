"use client";

import React, { useState } from "react";
import { AnnouncementWithReadState } from "@/lib/types/database";
import { useNotificationFeed } from "@/hooks/useNotificationFeed";
import { useRealtimeAnnouncements } from "@/hooks/useRealtimeAnnouncements";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { NotificationBadge } from "./NotificationBadge";
import { NotificationItem } from "./NotificationItem";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface NotificationCenterProps {
  initialFeed: AnnouncementWithReadState[];
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ initialFeed }) => {
  const { feed, unreadCount, isUpdating, markAsRead, markAllAsRead } = useNotificationFeed(initialFeed);
  const [filter, setFilter] = useState<"ALL" | "UNREAD">("ALL");

  // Realtime hook for live toast or refresh
  const { status: realtimeStatus } = useRealtimeAnnouncements({
    channelName: "participant-notifications",
  });

  const displayedFeed = filter === "UNREAD" ? feed.filter((item) => !item.is_read) : feed;

  return (
    <GlassPanel variant="elevated" padding="lg" edgeHighlight className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent-lime)] uppercase">
              OPERATIONAL BULLETINS
            </span>
            <NotificationBadge count={unreadCount} />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white">Squad Communications Feed</h3>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          {unreadCount > 0 && (
            <button
              type="button"
              disabled={isUpdating}
              onClick={markAllAsRead}
              className="text-xs font-semibold text-[var(--color-accent-lime)] hover:text-white underline cursor-pointer disabled:opacity-50"
            >
              {isUpdating ? "Updating..." : "Mark all as read"}
            </button>
          )}

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/[0.03] border border-white/10 text-[10px] font-mono">
            <span
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                realtimeStatus === "connected" && "bg-emerald-400 animate-pulse",
                realtimeStatus === "connecting" && "bg-amber-400 animate-ping",
                (realtimeStatus === "offline" || realtimeStatus === "error") && "bg-white/40"
              )}
            />
            <span className="text-[var(--color-text-muted)] uppercase">
              {realtimeStatus === "connected" ? "Live Stream" : "Synced"}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-2">
        <button
          type="button"
          onClick={() => setFilter("ALL")}
          className={cn(
            "px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer",
            filter === "ALL"
              ? "bg-white/10 text-white font-bold"
              : "text-[var(--color-text-muted)] hover:text-white"
          )}
        >
          All Updates ({feed.length})
        </button>
        <button
          type="button"
          onClick={() => setFilter("UNREAD")}
          className={cn(
            "px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5",
            filter === "UNREAD"
              ? "bg-white/10 text-white font-bold"
              : "text-[var(--color-text-muted)] hover:text-white"
          )}
        >
          <span>Unread</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-[var(--color-accent-lime)] text-black">
              {unreadCount}
            </span>
          )}
        </button>
      </div>

      {/* Feed List */}
      <div className="space-y-3">
        {displayedFeed.length > 0 ? (
          displayedFeed.map((item) => (
            <NotificationItem key={item.id} item={item} onMarkAsRead={markAsRead} />
          ))
        ) : (
          <div className="py-12 text-center rounded-xl border border-dashed border-white/10 text-xs text-[var(--color-text-muted)] space-y-2">
            <Icons.Bell size={24} className="mx-auto text-white/20" />
            <p>
              {filter === "UNREAD"
                ? "You're all caught up! No unread bulletins."
                : "No announcements have been published to your squad yet."}
            </p>
          </div>
        )}
      </div>
    </GlassPanel>
  );
};

