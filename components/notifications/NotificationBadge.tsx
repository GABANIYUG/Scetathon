import React from "react";
import { cn } from "@/lib/utils";

interface NotificationBadgeProps {
  count: number;
  className?: string;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({ count, className = "" }) => {
  if (count <= 0) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[var(--color-accent-lime-subtle)] text-[var(--color-accent-lime)] border border-[var(--color-accent-lime-border)]",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-lime)] animate-pulse" />
      <span>{count} UNREAD</span>
    </span>
  );
};

