"use client";

import React, { useState } from "react";
import { AnnouncementWithReadState } from "@/lib/types/database";
import { AnnouncementPriorityBadge } from "@/components/announcements/AnnouncementPriorityBadge";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  item: AnnouncementWithReadState;
  onMarkAsRead: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({ item, onMarkAsRead }) => {
  const [expanded, setExpanded] = useState(false);

  const publishedDate = item.published_at
    ? new Date(item.published_at).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "Recent";

  return (
    <div
      className={cn(
        "p-4 rounded-xl border transition-all duration-200",
        !item.is_read
          ? "bg-white/[0.04] border-[var(--color-accent-lime)]/30 hover:border-[var(--color-accent-lime)]/50 shadow-[0_0_15px_-4px_rgba(183,255,90,0.1)]"
          : "bg-white/[0.01] border-white/5 hover:border-white/10"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {!item.is_read && (
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-lime)] shrink-0 animate-pulse" />
          )}
          <AnnouncementPriorityBadge priority={item.priority} size="sm" />
          <span className="text-[10px] font-mono tracking-wider text-[var(--color-text-muted)] uppercase">
            {item.category}
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] font-mono text-[var(--color-text-muted)]">{publishedDate}</span>
          {!item.is_read && (
            <button
              type="button"
              onClick={() => onMarkAsRead(item.id)}
              title="Mark as read"
              className="text-[11px] text-[var(--color-accent-lime)] hover:text-white underline cursor-pointer"
            >
              Mark read
            </button>
          )}
        </div>
      </div>

      <div className="mt-2 space-y-1.5">
        <h4 className="text-sm font-bold text-white tracking-tight">{item.title}</h4>
        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">{item.summary}</p>

        {item.content && item.content !== item.summary && (
          <div className="pt-1.5">
            {expanded ? (
              <div className="p-3 rounded-lg bg-black/40 border border-white/5 text-xs text-[var(--color-text-secondary)] space-y-2 leading-relaxed">
                <p>{item.content}</p>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="text-[10px] font-semibold text-[var(--color-accent-lime)] hover:underline inline-flex items-center gap-1 cursor-pointer pt-1"
                >
                  Show less
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="text-[11px] font-medium text-[var(--color-accent-lime)] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Read full bulletin</span>
                <Icons.ChevronDown size={12} />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1">
          <Icons.Shield size={11} className="text-[var(--color-accent-lime)]/80" />
          <span>{item.author_label || "SCET Organizing Committee"}</span>
        </span>
        <span className="font-mono text-[9px] uppercase tracking-wider text-white/40">
          {item.visibility === "Registered Teams Only" ? "Squad Confidential" : "Public Bulletin"}
        </span>
      </div>
    </div>
  );
};

