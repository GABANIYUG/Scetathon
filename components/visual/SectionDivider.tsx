import React from "react";
import { cn } from "@/lib/utils";

export interface SectionDividerProps {
  className?: string;
  withNode?: boolean;
}

export const SectionDivider: React.FC<SectionDividerProps> = ({
  className,
  withNode = true,
}) => {
  return (
    <div
      className={cn(
        "relative w-full flex items-center justify-center my-12",
        className
      )}
      aria-hidden="true"
    >
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--color-border-subtle)] to-transparent" />
      {withNode && (
        <div className="absolute flex items-center justify-center px-3 bg-[var(--color-bg-primary)]">
          <div className="w-1.5 h-1.5 bg-[var(--color-border-medium)] rotate-45" />
        </div>
      )}
    </div>
  );
};

