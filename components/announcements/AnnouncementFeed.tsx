"use client";

import React, { useState, useMemo } from "react";
import { Announcement, AnnouncementWithReadState } from "@/lib/types/database";
import { AnnouncementCard } from "./AnnouncementCard";
import { AnnouncementFilters } from "./AnnouncementFilters";
import { RealtimeStatus } from "@/hooks/useRealtimeAnnouncements";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface AnnouncementFeedProps {
  announcements: (Announcement | AnnouncementWithReadState)[];
  realtimeStatus?: RealtimeStatus;
  showAudience?: boolean;
  showReadState?: boolean;
  onMarkAsRead?: (id: string) => void;
  title?: string;
  description?: string;
}

export const AnnouncementFeed: React.FC<AnnouncementFeedProps> = ({
  announcements,
  realtimeStatus,
  showAudience = false,
  showReadState = false,
  onMarkAsRead,
  title,
  description,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedPriority, setSelectedPriority] = useState("ALL");

  const filtered = useMemo(() => {
    return announcements.filter((item) => {
      // Category filter
      if (selectedCategory !== "ALL" && item.category !== selectedCategory) {
        return false;
      }

      // Priority filter
      if (selectedPriority !== "ALL" && (item.priority || "Normal") !== selectedPriority) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        return matchesTitle || matchesSummary || matchesCategory;
      }

      return true;
    });
  }, [announcements, selectedCategory, selectedPriority, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Header and Realtime Connection Indicator */}
      {(title || realtimeStatus) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-white/[0.08]">
          <div>
            {title && <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">{title}</h2>}
            {description && <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">{description}</p>}
          </div>

          {realtimeStatus && (
            <div className="flex items-center gap-2 self-start sm:self-auto px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono">
              <span
                className={cn(
                  "w-2 h-2 rounded-full",
                  realtimeStatus === "connected" && "bg-[var(--color-accent-lime)] animate-pulse shadow-[0_0_8px_#B7FF5A]",
                  realtimeStatus === "connecting" && "bg-amber-400 animate-ping",
                  (realtimeStatus === "offline" || realtimeStatus === "error") && "bg-white/40"
                )}
              />
              <span className="text-[var(--color-text-muted)] uppercase tracking-wider">
                {realtimeStatus === "connected"
                  ? "Realtime Live Sync"
                  : realtimeStatus === "connecting"
                  ? "Connecting Stream"
                  : "Static Verified"}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Filter Toolbar */}
      <AnnouncementFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedPriority={selectedPriority}
        onPriorityChange={setSelectedPriority}
      />

      {/* Announcements List */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((item) => (
            <AnnouncementCard
              key={item.id}
              announcement={item}
              showAudience={showAudience}
              showReadState={showReadState}
              onMarkAsRead={onMarkAsRead}
            />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center rounded-2xl border border-dashed border-white/10 bg-white/[0.01] space-y-3">
          <div className="mx-auto w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-text-muted)]">
            <Icons.Megaphone size={18} />
          </div>
          <h3 className="text-sm font-semibold text-white">No announcements found</h3>
          <p className="text-xs text-[var(--color-text-muted)] max-w-sm mx-auto">
            {searchQuery || selectedCategory !== "ALL" || selectedPriority !== "ALL"
              ? "No broadcasts match your active search and category filters. Try clearing filters."
              : "No official announcements have been published to this channel yet."}
          </p>
        </div>
      )}
    </div>
  );
};

