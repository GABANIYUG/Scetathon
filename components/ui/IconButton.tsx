import React from "react";
import { cn } from "@/lib/utils";

export type IconButtonVariant = "ghost" | "outline" | "solid" | "accent";
export type IconButtonSize = "sm" | "md" | "lg";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  "aria-label": string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  href?: string;
  isExternal?: boolean;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = "ghost",
      size = "md",
      href,
      isExternal,
      children,
      disabled,
      "aria-label": ariaLabel,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-md transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-lime)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";

    const variantStyles: Record<IconButtonVariant, string> = {
      ghost:
        "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5 active:bg-white/10",
      outline:
        "bg-transparent text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-medium)] hover:bg-white/5",
      solid:
        "bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated-hover)] border border-[var(--color-border-subtle)]",
      accent:
        "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)] hover:bg-[var(--color-accent-lime-hover)] active:bg-[var(--color-accent-lime-active)] shadow-sm",
    };

    const sizeStyles: Record<IconButtonSize, string> = {
      sm: "w-8 h-8 text-xs",
      md: "w-10 h-10 text-sm",
      lg: "w-12 h-12 text-base",
    };

    const combinedClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          aria-label={ariaLabel}
          className={combinedClasses}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-label={ariaLabel}
        className={combinedClasses}
        {...props}
      >
        {children}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

