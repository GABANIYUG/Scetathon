"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface FilterOption {
  id: string;
  label: string;
  count?: number | string;
}

export interface AdminFilterBarProps {
  options: FilterOption[];
  activeFilter: string;
  onFilterChange: (id: string) => void;
  className?: string;
}

export const AdminFilterBar: React.FC<AdminFilterBarProps> = ({
  options,
  activeFilter,
  onFilterChange,
  className,
}) => {
  return (
    <div
      role="tablist"
      aria-label="Filter Options"
      className={cn(
        "flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 w-fit max-w-full overflow-x-auto scrollbar-none",
        className
      )}
    >
      {options.map((option) => {
        const isActive = option.id === activeFilter;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(option.id)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 select-none flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent-lime)]",
              isActive
                ? "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)] font-semibold shadow-sm"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5"
            )}
          >
            <span>{option.label}</span>
            {option.count !== undefined && (
              <span
                className={cn(
                  "text-[10px] font-mono px-1.5 py-0.2 rounded-full",
                  isActive
                    ? "bg-[var(--color-bg-primary)]/20 text-[var(--color-bg-primary)]"
                    : "bg-white/10 text-[var(--color-text-muted)]"
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

