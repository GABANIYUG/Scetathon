"use client";

import React, { useState } from "react";
import { Announcement, AnnouncementWithReadState } from "@/lib/types/database";
import { ANNOUNCEMENT_AUDIENCES, ANNOUNCEMENT_PRIORITIES } from "@/config/operations";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { AnnouncementPriorityBadge } from "./AnnouncementPriorityBadge";
import { cn } from "@/lib/utils";

interface AnnouncementCardProps {
  announcement: Announcement | AnnouncementWithReadState;
  showAudience?: boolean;
  showReadState?: boolean;
  onMarkAsRead?: (id: string) => void;
  className?: string;
}

export const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  announcement,
  showAudience = false,
  showReadState = false,
  onMarkAsRead,
  className = "",
}) => {
  const [expanded, setExpanded] = useState(false);

  const priority = announcement.priority || "Normal";
  const priorityConfig = ANNOUNCEMENT_PRIORITIES[priority];
  const audienceConfig = ANNOUNCEMENT_AUDIENCES[announcement.visibility];

  const hasReadState = "is_read" in announcement;
  const isUnread = showReadState && hasReadState && !announcement.is_read;

  const publishedDate = announcement.published_at
    ? new Date(announcement.published_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "Draft (Unpublished)";

  return (
    <GlassPanel
      variant="elevated"
      padding="md"
      edgeHighlight
      className={cn(
        "relative transition-all duration-300 group hover:border-white/20",
        priorityConfig.borderClass,
        priorityConfig.glowClass,
        isUnread && "bg-[var(--color-bg-elevated)]/90 border-[var(--color-accent-lime)]/30",
        className
      )}
    >
      {/* Pinned / Unread Indicator */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex flex-wrap items-center gap-2">
          {announcement.pinned && (
            <Badge variant="accent" size="sm">
              <span className="flex items-center gap-1">
                <Icons.Pin size={11} /> PINNED
              </span>
            </Badge>
          )}

          <AnnouncementPriorityBadge priority={priority} size="sm" />

          <Badge variant="outline" size="sm">
            {announcement.category}
          </Badge>

          {showAudience && audienceConfig && (
            <span className="text-[10px] font-mono tracking-wider text-[var(--color-text-muted)] uppercase hidden sm:inline-block">
              {audienceConfig.badgeText}
            </span>
          )}
        </div>

        {/* Unread dot or Mark-as-read button */}
        {isUnread && (
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold text-[var(--color-accent-lime)]">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-lime)] animate-pulse" />
              NEW
            </span>
            {onMarkAsRead && (
              <button
                type="button"
                onClick={() => onMarkAsRead(announcement.id)}
                className="text-[11px] text-[var(--color-text-muted)] hover:text-white underline cursor-pointer"
              >
                Mark read
              </button>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="space-y-2">
        <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-primary)] tracking-tight group-hover:text-white transition-colors">
          {announcement.title}
        </h3>

        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {announcement.summary}
        </p>

        {/* Detailed Content accordion */}
        {announcement.content && announcement.content !== announcement.summary && (
          <div className="pt-2">
            {expanded ? (
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs text-[var(--color-text-secondary)] leading-relaxed">
                <p>{announcement.content}</p>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="text-[11px] font-semibold text-[var(--color-accent-lime)] hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
                >
                  Show less
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="text-[11px] font-semibold text-[var(--color-accent-lime)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read detailed announcement</span>
                <Icons.ChevronDown size={13} />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Footer Metadata */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between text-[11px] text-[var(--color-text-muted)] gap-2">
        <div className="flex items-center gap-1.5">
          <Icons.Shield size={12} className="text-[var(--color-accent-lime)]/80" />
          <span>{announcement.author_label || "SCET Organizing Committee"}</span>
        </div>

        <div className="flex items-center gap-1.5 font-mono">
          <Icons.Clock size={12} />
          <span>{publishedDate}</span>
        </div>
      </div>
    </GlassPanel>
  );
};

