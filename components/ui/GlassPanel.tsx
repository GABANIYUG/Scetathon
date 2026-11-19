import React from "react";
import { cn } from "@/lib/utils";

export type GlassVariant = "subtle" | "elevated" | "interactive" | "highlight";
export type GlassPadding = "none" | "sm" | "md" | "lg" | "xl";

export interface GlassPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: GlassVariant;
  padding?: GlassPadding;
  edgeHighlight?: boolean;
  glow?: "none" | "lime" | "cyan";
  as?: React.ElementType;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  variant = "elevated",
  padding = "md",
  edgeHighlight = true,
  glow = "none",
  as: Component = "div",
  className,
  children,
  ...props
}) => {
  const variantStyles: Record<GlassVariant, string> = {
    subtle: "glass-subtle",
    elevated: "glass-elevated",
    interactive: "glass-interactive",
    highlight: "glass-highlight",
  };

  const paddingStyles: Record<GlassPadding, string> = {
    none: "p-0",
    sm: "p-4 sm:p-5",
    md: "p-6 sm:p-7",
    lg: "p-8 sm:p-10",
    xl: "p-10 sm:p-12",
  };

  const glowStyles = {
    none: "",
    lime: "shadow-[0_0_30px_-6px_rgba(183,255,90,0.2)] border-[rgba(183,255,90,0.25)]",
    cyan: "shadow-[0_0_30px_-6px_rgba(101,217,242,0.2)] border-[rgba(101,217,242,0.25)]",
  };

  return (
    <Component
      className={cn(
        "relative rounded-2xl overflow-hidden",
        variantStyles[variant],
        paddingStyles[padding],
        edgeHighlight && "glass-edge-highlight",
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

