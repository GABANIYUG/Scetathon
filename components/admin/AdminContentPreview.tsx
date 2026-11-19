"use client";

import React from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface AdminContentPreviewProps {
  title?: string;
  badge?: string;
  badgeVariant?: "default" | "accent" | "warning";
  children: React.ReactNode;
  notice?: string;
  className?: string;
}

export const AdminContentPreview: React.FC<AdminContentPreviewProps> = ({
  title = "PUBLIC RENDERING PREVIEW",
  badge = "CLIENT DEMO",
  badgeVariant = "accent",
  children,
  notice = "Simulated public appearance // Not published to live event channels",
  className,
}) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono uppercase tracking-wider text-[var(--color-text-muted)] text-[10px] font-semibold">
          {title}
        </span>
        <Badge variant={badgeVariant} dot size="sm">
          {badge}
        </Badge>
      </div>

      <GlassPanel
        variant="elevated"
        padding="md"
        edgeHighlight
        className="border-dashed border-white/20 relative"
      >
        {children}
      </GlassPanel>

      {notice && (
        <p className="text-[10px] font-mono text-[var(--color-text-muted)] text-center">
          {notice}
        </p>
      )}
    </div>
  );
};

