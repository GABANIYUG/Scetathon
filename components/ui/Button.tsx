import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isExternal?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isExternal,
      leftIcon,
      rightIcon,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-lime)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-primary)] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed";

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)] hover:bg-[var(--color-accent-lime-hover)] active:bg-[var(--color-accent-lime-active)] font-semibold shadow-sm hover:shadow-[0_0_20px_-4px_rgba(183,255,90,0.35)] border border-[var(--color-accent-lime)]",
      secondary:
        "bg-[var(--color-bg-elevated)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated-hover)] hover:text-white border border-[var(--color-border-subtle)] hover:border-[var(--color-border-medium)] active:bg-white/10",
      outline:
        "bg-transparent text-[var(--color-text-primary)] border border-[var(--color-border-medium)] hover:border-[var(--color-accent-lime)] hover:text-[var(--color-accent-lime)] hover:bg-[var(--color-accent-lime-subtle)] active:bg-[var(--color-accent-lime-subtle)]",
      ghost:
        "bg-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5 active:bg-white/10 border border-transparent",
    };

    const sizeStyles: Record<ButtonSize, string> = {
      sm: "text-xs px-3 py-1.5 gap-1.5 font-medium tracking-wide",
      md: "text-sm px-4 py-2.5 gap-2 font-medium tracking-wide",
      lg: "text-base px-6 py-3.5 gap-2.5 font-semibold tracking-wide",
    };

    const combinedClasses = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      fullWidth ? "w-full" : "",
      className
    );

    if (href) {
      if (!isExternal && href.startsWith("/")) {
        return (
          <Link
            href={href}
            className={combinedClasses}
            aria-disabled={disabled}
            onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          >
            {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
            <span>{children}</span>
            {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
          </Link>
        );
      }

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className={combinedClasses}
          aria-disabled={disabled}
          onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
        >
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={combinedClasses}
        {...props}
      >
        {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

