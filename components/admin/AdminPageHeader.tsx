"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface AdminPageHeaderProps {
  badge?: string;
  badgeVariant?: "default" | "accent" | "success" | "warning";
  eyebrow?: string;
  title: string;
  description: string;
  actions?: React.ReactNode;
  className?: string;
}

export const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  badge,
  badgeVariant = "accent",
  eyebrow = "ADMIN MODULE",
  title,
  description,
  actions,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/[0.08]",
        className
      )}
    >
      <div className="space-y-2 max-w-2xl">
        <div className="flex items-center gap-2.5 flex-wrap">
          {badge && (
            <Badge variant={badgeVariant} dot size="sm">
              {badge}
            </Badge>
          )}
          {eyebrow && (
            <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--color-accent-lime)] uppercase">
              {eyebrow}
            </span>
          )}
        </div>

        <h1 className="text-h2 font-extrabold text-[var(--color-text-primary)] tracking-tight">
          {title}
        </h1>

        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {description}
        </p>
      </div>

      {actions && (
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          {actions}
        </div>
      )}
    </div>
  );
};

