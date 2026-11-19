"use client";

import React from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { cn } from "@/lib/utils";

export interface AdminStatCardProps {
  title: string;
  value: string;
  description: string;
  statusTag?: string;
  statusTone?: "lime" | "cyan" | "amber" | "muted";
  icon?: React.ReactNode;
  className?: string;
}

export const AdminStatCard: React.FC<AdminStatCardProps> = ({
  title,
  value,
  description,
  statusTag,
  statusTone = "lime",
  icon,
  className,
}) => {
  const toneStyles = {
    lime: "text-[var(--color-accent-lime)] border-[var(--color-accent-lime-border)] bg-[var(--color-accent-lime-subtle)]",
    cyan: "text-[var(--color-accent-cyan)] border-[var(--color-accent-cyan-border)] bg-[var(--color-accent-cyan-subtle)]",
    amber: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    muted: "text-[var(--color-text-muted)] border-white/10 bg-white/5",
  };

  return (
    <GlassPanel
      variant="elevated"
      padding="sm"
      className={cn("space-y-3 transition-all duration-200 hover:border-white/20", className)}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
          {title}
        </span>
        {icon && (
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-[var(--color-text-secondary)] shrink-0">
            {icon}
          </div>
        )}
      </div>

      <div>
        <div className="text-lg sm:text-xl font-bold text-[var(--color-text-primary)] tracking-tight">
          {value}
        </div>
        <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2">
          {description}
        </p>
      </div>

      {statusTag && (
        <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
          <span className="text-[var(--color-text-muted)]">Status</span>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full border uppercase tracking-wider font-semibold",
              toneStyles[statusTone]
            )}
          >
            {statusTag}
          </span>
        </div>
      )}
    </GlassPanel>
  );
};

