import React from "react";
import { cn } from "@/lib/utils";

export type CardVariant = "default" | "subtle" | "interactive" | "outline";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: "none" | "sm" | "md" | "lg";
}

export const Card: React.FC<CardProps> = ({
  className,
  variant = "default",
  padding = "md",
  children,
  ...props
}) => {
  const baseStyles =
    "relative rounded-xl transition-all duration-200 overflow-hidden";

  const variantStyles: Record<CardVariant, string> = {
    default:
      "bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] shadow-[0_4px_20px_-2px_rgba(0,0,0,0.5)]",
    subtle:
      "bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)]",
    interactive:
      "bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-medium)] hover:bg-[var(--color-bg-elevated-hover)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.6)] cursor-pointer",
    outline:
      "bg-transparent border border-[var(--color-border-subtle)] hover:border-[var(--color-border-medium)]",
  };

  const paddingStyles: Record<string, string> = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={cn(baseStyles, variantStyles[variant], paddingStyles[padding], className)}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("flex flex-col space-y-1.5 mb-4", className)} {...props} />;

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => (
  <h3
    className={cn(
      "font-heading font-semibold text-lg text-[var(--color-text-primary)] tracking-tight",
      className
    )}
    {...props}
  />
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  ...props
}) => (
  <p
    className={cn("text-sm text-[var(--color-text-secondary)] leading-relaxed", className)}
    {...props}
  />
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn("text-sm", className)} {...props} />;

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => (
  <div
    className={cn("flex items-center pt-4 mt-4 border-t border-[var(--color-border-subtle)]", className)}
    {...props}
  />
);

