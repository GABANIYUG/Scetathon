"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { RegistrationFormData, RegistrationStep } from "@/lib/registration-validation";

interface TeamCompositionProps {
  formData: RegistrationFormData;
  currentStep: RegistrationStep;
  minSize: number;
  maxSize: number;
  className?: string;
}

export const TeamComposition: React.FC<TeamCompositionProps> = ({
  formData,
  currentStep,
  minSize,
  maxSize,
  className,
}) => {
  const { teamDetails, members } = formData;
  const totalMembers = members.length + 1; // +1 for leader
  const hasLeader = Boolean(teamDetails.leaderName.trim());
  const hasTeamName = Boolean(teamDetails.teamName.trim());
  const hasCollege = Boolean(teamDetails.collegeName.trim());

  const isMinMet = totalMembers >= minSize;
  const isComplete = hasLeader && hasTeamName && hasCollege && isMinMet;

  return (
    <aside
      className={cn(
        "rounded-2xl border border-white/10 bg-[var(--color-bg-elevated)]/60 backdrop-blur-xl p-5 sm:p-6 space-y-6 shadow-xl",
        className
      )}
      aria-label="Live Team Composition Summary"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent-lime)] uppercase block">
            Team Summary
          </span>
          <h3 className="text-base font-bold text-[var(--color-text-primary)]">
            {teamDetails.teamName.trim() || "Untitled Team"}
          </h3>
        </div>
        <span
          className={cn(
            "text-[10px] font-bold px-2 py-0.5 rounded-full border tracking-wide uppercase",
            isComplete
              ? "bg-[var(--color-accent-lime-subtle)] text-[var(--color-accent-lime)] border-[var(--color-accent-lime-border)]"
              : "bg-white/5 text-[var(--color-text-muted)] border-white/10"
          )}
        >
          {isComplete ? "Ready" : "In Progress"}
        </span>
      </div>

      {/* Institution Info */}
      <div className="space-y-1.5 text-xs">
        <div className="text-[var(--color-text-muted)] font-mono uppercase text-[10px]">
          Institution & City
        </div>
        <p className="text-[var(--color-text-secondary)] font-medium">
          {teamDetails.collegeName.trim() || "College name not set"}
        </p>
        {teamDetails.city.trim() && (
          <p className="text-[var(--color-text-muted)] text-[11px]">
            {teamDetails.city.trim()}
          </p>
        )}
      </div>

      {/* Roster Capacity Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--color-text-muted)]">Roster Size</span>
          <span className="font-mono font-bold text-[var(--color-text-primary)]">
            {totalMembers} / {maxSize} members
          </span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <div
            className={cn(
              "h-full transition-all duration-300 rounded-full",
              totalMembers < minSize
                ? "bg-[var(--color-accent-cyan)]"
                : "bg-[var(--color-accent-lime)]"
            )}
            style={{ width: `${Math.min((totalMembers / maxSize) * 100, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] font-mono">
          <span>Min: {minSize}</span>
          <span>Max: {maxSize}</span>
        </div>
      </div>

      {/* Member Roster List */}
      <div className="space-y-3">
        <div className="text-[10px] font-mono tracking-widest text-[var(--color-text-muted)] uppercase">
          Roster Breakdown
        </div>

        <ul className="space-y-2 text-xs">
          {/* Leader */}
          <li className="flex items-center justify-between p-2 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-2 truncate">
              <span className="w-5 h-5 rounded-full bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)] font-bold text-[10px] flex items-center justify-center shrink-0">
                L
              </span>
              <span className="font-medium text-[var(--color-text-primary)] truncate">
                {teamDetails.leaderName.trim() || "Team Leader"}
              </span>
            </div>
            <span className="text-[10px] font-mono text-[var(--color-accent-lime)] shrink-0">
              Leader
            </span>
          </li>

          {/* Members */}
          {members.map((member, idx) => (
            <li
              key={member.id}
              className="flex items-center justify-between p-2 rounded-lg bg-white/[0.02] border border-white/5"
            >
              <div className="flex items-center gap-2 truncate">
                <span className="w-5 h-5 rounded-full bg-[var(--color-accent-cyan-subtle)] text-[var(--color-accent-cyan)] border border-[var(--color-accent-cyan-border)] font-bold text-[10px] flex items-center justify-center shrink-0">
                  {idx + 2}
                </span>
                <span className="font-medium text-[var(--color-text-secondary)] truncate">
                  {member.name.trim() || `Member ${idx + 2}`}
                </span>
              </div>
              <span className="text-[10px] text-[var(--color-text-muted)] shrink-0 truncate max-w-[90px]">
                {member.role.trim() || "Member"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Live Checkpoints */}
      <div className="space-y-2 pt-2 border-t border-white/[0.08]">
        <div className="text-[10px] font-mono tracking-widest text-[var(--color-text-muted)] uppercase">
          Requirements
        </div>
        <ul className="space-y-1.5 text-xs">
          <li className="flex items-center gap-2">
            <span
              className={cn(
                "w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px]",
                hasTeamName && hasCollege
                  ? "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)]"
                  : "bg-white/10 text-[var(--color-text-muted)]"
              )}
            >
              ✓
            </span>
            <span className={hasTeamName && hasCollege ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-muted)]"}>
              Team & College identified
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span
              className={cn(
                "w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px]",
                hasLeader
                  ? "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)]"
                  : "bg-white/10 text-[var(--color-text-muted)]"
              )}
            >
              ✓
            </span>
            <span className={hasLeader ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-muted)]"}>
              Team leader details set
            </span>
          </li>
          <li className="flex items-center gap-2">
            <span
              className={cn(
                "w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px]",
                isMinMet
                  ? "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)]"
                  : "bg-white/10 text-[var(--color-text-muted)]"
              )}
            >
              ✓
            </span>
            <span className={isMinMet ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-muted)]"}>
              Minimum {minSize} members registered
            </span>
          </li>
        </ul>
      </div>

      {/* Contextual Step Indicator */}
      <div className="text-[11px] font-mono text-[var(--color-text-muted)] bg-white/[0.02] p-2.5 rounded-lg border border-white/5">
        Current Stage: <span className="text-[var(--color-accent-lime)]">Step 0{currentStep} of 04</span>
      </div>
    </aside>
  );
};

