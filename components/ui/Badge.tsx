import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "accent" | "success" | "warning";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  size = "md",
  dot = false,
  children,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center font-mono font-medium tracking-wider uppercase rounded-full select-none transition-colors";

  const variantStyles: Record<BadgeVariant, string> = {
    default:
      "bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]",
    accent:
      "bg-[var(--color-accent-lime-subtle)] text-[var(--color-accent-lime)] border border-[var(--color-accent-lime-border)]",
    success:
      "bg-[rgba(74,222,128,0.12)] text-[#4ADE80] border border-[rgba(74,222,128,0.28)]",
    warning:
      "bg-[rgba(251,191,36,0.12)] text-[#FBBF24] border border-[rgba(251,191,36,0.28)]",
  };

  const dotStyles: Record<BadgeVariant, string> = {
    default: "bg-[var(--color-text-muted)]",
    accent: "bg-[var(--color-accent-lime)] shadow-[0_0_8px_rgba(183,255,90,0.6)]",
    success: "bg-[#4ADE80] shadow-[0_0_8px_rgba(74,222,128,0.6)]",
    warning: "bg-[#FBBF24] shadow-[0_0_8px_rgba(251,191,36,0.6)]",
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: "text-[10px] px-2 py-0.5 gap-1.5",
    md: "text-xs px-2.5 py-1 gap-1.5",
  };

  return (
    <span
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotStyles[variant])}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
};

