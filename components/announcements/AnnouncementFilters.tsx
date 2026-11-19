"use client";

import React from "react";
import { ANNOUNCEMENT_CATEGORIES } from "@/config/operations";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface AnnouncementFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedPriority: string;
  onPriorityChange: (priority: string) => void;
}

export const AnnouncementFilters: React.FC<AnnouncementFiltersProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedPriority,
  onPriorityChange,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Search & Priority Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Icons.Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search announcements, tags, milestones..."
            className="glass-input w-full h-10 pl-10 pr-4 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] hover:text-white"
            >
              <Icons.Close size={14} />
            </button>
          )}
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 shrink-0 overflow-x-auto pb-1 sm:pb-0">
          <span className="text-[11px] font-mono text-[var(--color-text-muted)] uppercase tracking-wider mr-1">
            Priority:
          </span>
          {(["ALL", "Normal", "Important", "Urgent"] as const).map((priority) => (
            <button
              key={priority}
              type="button"
              onClick={() => onPriorityChange(priority)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all cursor-pointer border",
                selectedPriority === priority
                  ? "bg-white/10 text-white border-white/20 font-semibold"
                  : "bg-transparent text-[var(--color-text-muted)] border-transparent hover:text-white hover:bg-white/5"
              )}
            >
              {priority}
            </button>
          ))}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          type="button"
          onClick={() => onCategoryChange("ALL")}
          className={cn(
            "px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer border",
            selectedCategory === "ALL"
              ? "bg-[var(--color-accent-lime)] text-black border-[var(--color-accent-lime)] font-bold shadow-[0_0_12px_-2px_rgba(183,255,90,0.4)]"
              : "bg-white/5 text-[var(--color-text-secondary)] border-white/10 hover:border-white/20 hover:text-white"
          )}
        >
          All Updates
        </button>

        {ANNOUNCEMENT_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer border",
              selectedCategory === cat
                ? "bg-[var(--color-accent-lime)] text-black border-[var(--color-accent-lime)] font-bold shadow-[0_0_12px_-2px_rgba(183,255,90,0.4)]"
                : "bg-white/5 text-[var(--color-text-secondary)] border-white/10 hover:border-white/20 hover:text-white"
            )}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
