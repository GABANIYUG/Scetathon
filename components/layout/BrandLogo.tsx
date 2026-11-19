import React from "react";
import { cn } from "@/lib/utils";

export interface BrandLogoProps {
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className,
  showTagline = false,
  size = "md",
}) => {
  const iconSizes = {
    sm: 24,
    md: 28,
    lg: 36,
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      {/* Minimal Custom Geometric Mark */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg
          width={iconSizes[size]}
          height={iconSizes[size]}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Subtle outer tech frame */}
          <rect
            x="2"
            y="2"
            width="28"
            height="28"
            rx="6"
            fill="var(--color-bg-elevated)"
            stroke="var(--color-border-medium)"
            strokeWidth="1.2"
          />
          {/* Geometric angular S / polygon motif */}
          <path
            d="M9 10.5h14L15.5 16h7.5L9 22"
            stroke="var(--color-accent-lime)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Precision cyan accent node */}
          <circle cx="23" cy="22" r="1.75" fill="var(--color-accent-cyan)" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="flex flex-col">
        <div className="flex items-center tracking-tight">
          <span
            className={cn(
              "font-heading font-extrabold tracking-tight text-[var(--color-text-primary)]",
              textSizes[size]
            )}
          >
            SCET<span className="text-[var(--color-accent-lime)]">ATHON</span>
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-mono tracking-widest text-[var(--color-text-muted)] uppercase">
            24H Hackathon
          </span>
        )}
      </div>
    </div>
  );
};

