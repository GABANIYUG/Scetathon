"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { RegistrationStep } from "@/lib/registration-validation";

interface Step {
  number: RegistrationStep;
  label: string;
  shortLabel: string;
}

const STEPS: Step[] = [
  { number: 1, label: "Team Details",   shortLabel: "Details" },
  { number: 2, label: "Team Members",   shortLabel: "Members" },
  { number: 3, label: "Review",         shortLabel: "Review"  },
  { number: 4, label: "Status",         shortLabel: "Status"  },
];

interface RegistrationProgressProps {
  currentStep: RegistrationStep;
  completedSteps: Set<number>;
}

export const RegistrationProgress: React.FC<RegistrationProgressProps> = ({
  currentStep,
  completedSteps,
}) => {
  return (
    <div className="w-full" role="navigation" aria-label="Registration steps">
      {/* Step indicators */}
      <div className="relative flex items-center justify-between gap-0">
        {/* Background connector line */}
        <div
          className="absolute top-5 left-5 right-5 h-px bg-white/10 z-0"
          aria-hidden="true"
        />

        {/* Filled connector — grows with progress */}
        <div
          className="absolute top-5 left-5 h-px z-0 bg-gradient-to-r from-[var(--color-accent-lime)] to-[var(--color-accent-cyan)] transition-all duration-500 ease-out"
          style={{
            width: `calc(${((currentStep - 1) / (STEPS.length - 1)) * 100}% - 0px)`,
          }}
          aria-hidden="true"
        />

        {STEPS.map((step) => {
          const isCompleted = completedSteps.has(step.number);
          const isActive = step.number === currentStep;
          const isPending = !isCompleted && !isActive;

          return (
            <div
              key={step.number}
              className="relative z-10 flex flex-col items-center gap-2.5"
              aria-current={isActive ? "step" : undefined}
            >
              {/* Circle */}
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border transition-all duration-300",
                  isCompleted && "bg-[var(--color-accent-lime)] border-[var(--color-accent-lime)] text-[var(--color-bg-primary)]",
                  isActive && "bg-[var(--color-bg-elevated)] border-[var(--color-accent-lime)] text-[var(--color-accent-lime)] shadow-[0_0_16px_-2px_rgba(183,255,90,0.5)]",
                  isPending && "bg-[var(--color-bg-elevated)] border-white/15 text-[var(--color-text-muted)]"
                )}
              >
                {isCompleted ? (
                  /* Checkmark */
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span>{String(step.number).padStart(2, "0")}</span>
                )}
              </div>

              {/* Label */}
              <div className="text-center hidden sm:block">
                <span
                  className={cn(
                    "text-xs font-medium tracking-wide transition-colors duration-200",
                    isActive && "text-[var(--color-accent-lime)]",
                    isCompleted && "text-[var(--color-text-secondary)]",
                    isPending && "text-[var(--color-text-muted)]"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {/* Mobile label */}
              <div className="text-center sm:hidden">
                <span
                  className={cn(
                    "text-[10px] font-medium tracking-wide transition-colors duration-200",
                    isActive && "text-[var(--color-accent-lime)]",
                    isCompleted && "text-[var(--color-text-secondary)]",
                    isPending && "text-[var(--color-text-muted)]"
                  )}
                >
                  {step.shortLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

