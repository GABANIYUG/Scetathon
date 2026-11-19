"use client";

import React from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface AdminEmptyStateProps {
  icon?: React.ReactNode;
  badge?: string;
  badgeVariant?: "default" | "accent" | "warning";
  title: string;
  description: string;
  action?: React.ReactNode;
  technicalNote?: string;
  className?: string;
}

export const AdminEmptyState: React.FC<AdminEmptyStateProps> = ({
  icon,
  badge = "AWAITING BACKEND INTEGRATION",
  badgeVariant = "warning",
  title,
  description,
  action,
  technicalNote,
  className,
}) => {
  return (
    <GlassPanel
      variant="subtle"
      padding="lg"
      className={cn("text-center py-12 sm:py-16 space-y-5 max-w-2xl mx-auto", className)}
    >
      {badge && (
        <div className="flex justify-center">
          <Badge variant={badgeVariant} dot size="sm">
            {badge}
          </Badge>
        </div>
      )}

      {icon && (
        <div className="mx-auto w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-[var(--color-text-muted)] shadow-inner">
          {icon}
        </div>
      )}

      <div className="space-y-2 max-w-md mx-auto">
        <h3 className="text-lg font-bold text-[var(--color-text-primary)]">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {description}
        </p>
      </div>

      {action && <div className="pt-2">{action}</div>}

      {technicalNote && (
        <div className="pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[var(--color-text-muted)] max-w-sm mx-auto">
          {technicalNote}
        </div>
      )}
    </GlassPanel>
  );
};

