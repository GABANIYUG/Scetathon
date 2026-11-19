"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import type {
  TeamMember,
  TeamDetails,
  ValidationError,
} from "@/lib/registration-validation";
import { createEmptyMember } from "@/lib/registration-validation";

interface TeamMemberCardInlineProps {
  member: TeamMember;
  index: number;
  errors: ValidationError[];
  onUpdate: (updated: TeamMember) => void;
  onRemove: () => void;
}

const ROLE_OPTIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "ML / AI Engineer",
  "Data Scientist",
  "UI/UX Designer",
  "DevOps / Cloud",
  "Mobile Developer",
  "Hardware / IoT",
  "Other",
];

const TeamMemberCardInline: React.FC<TeamMemberCardInlineProps> = ({
  member,
  index,
  errors,
  onUpdate,
  onRemove,
}) => {
  const [expanded, setExpanded] = useState(true);

  const getError = (suffix: string) =>
    errors.find((e) => e.field === `member_${member.id}_${suffix}`)?.message;

  const handleChange = (key: keyof TeamMember, value: string) =>
    onUpdate({ ...member, [key]: value });

  const isComplete =
    member.name.trim().length >= 2 &&
    member.email.includes("@") &&
    member.phone.trim().length >= 10 &&
    member.role.trim().length >= 2;

  return (
    <div
      className={cn(
        "relative rounded-xl border transition-all duration-200 overflow-hidden",
        isComplete
          ? "border-[var(--color-accent-lime-border)] bg-[rgba(183,255,90,0.04)]"
          : "border-white/10 bg-white/[0.03]"
      )}
    >
      {/* Card header */}
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="w-full flex items-center justify-between px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent-lime)]"
        aria-expanded={expanded}
      >
        <div className="flex items-center gap-3">
          {/* Member number badge */}
          <span
            className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
              isComplete
                ? "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)]"
                : "bg-white/10 text-[var(--color-text-muted)]"
            )}
          >
            {index + 2}
          </span>
          <div>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">
              {member.name.trim() || `Member ${index + 2}`}
            </p>
            {member.role && (
              <p className="text-xs text-[var(--color-text-muted)]">
                {member.role}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isComplete && (
            <span className="hidden sm:flex items-center gap-1 text-[10px] font-bold tracking-widest text-[var(--color-accent-lime)] uppercase bg-[var(--color-accent-lime-subtle)] px-2 py-0.5 rounded-full border border-[var(--color-accent-lime-border)]">
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Done
            </span>
          )}
          {/* Chevron */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "text-[var(--color-text-muted)] transition-transform duration-200",
              expanded && "rotate-180"
            )}
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>
      </button>

      {/* Expanded fields */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-white/[0.06]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label
                htmlFor={`mem-${member.id}-name`}
                className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase block"
              >
                Full Name <span className="text-[var(--color-accent-lime)]">*</span>
              </label>
              <input
                id={`mem-${member.id}-name`}
                type="text"
                value={member.name}
                placeholder="Full name"
                onChange={(e) => handleChange("name", e.target.value)}
                className={cn(
                  "glass-input w-full h-11 px-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none transition-all duration-200",
                  getError("name")
                    ? "border-red-500/60 focus:border-red-500"
                    : "focus:border-[var(--color-accent-lime)] focus:ring-1 focus:ring-[var(--color-accent-lime-border)]"
                )}
                aria-invalid={getError("name") ? "true" : undefined}
              />
              {getError("name") && (
                <p role="alert" className="text-xs text-red-400">{getError("name")}</p>
              )}
            </div>

            {/* Role */}
            <div className="space-y-1.5">
              <label
                htmlFor={`mem-${member.id}-role`}
                className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase block"
              >
                Role <span className="text-[var(--color-accent-lime)]">*</span>
              </label>
              <select
                id={`mem-${member.id}-role`}
                value={member.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className={cn(
                  "glass-input w-full h-11 px-4 text-sm text-[var(--color-text-primary)] rounded-xl outline-none transition-all duration-200 appearance-none cursor-pointer",
                  !member.role && "text-[var(--color-text-muted)]",
                  getError("role")
                    ? "border-red-500/60 focus:border-red-500"
                    : "focus:border-[var(--color-accent-lime)] focus:ring-1 focus:ring-[var(--color-accent-lime-border)]"
                )}
                aria-invalid={getError("role") ? "true" : undefined}
              >
                <option value="" disabled>Select role…</option>
                {ROLE_OPTIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {getError("role") && (
                <p role="alert" className="text-xs text-red-400">{getError("role")}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor={`mem-${member.id}-email`}
                className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase block"
              >
                Email <span className="text-[var(--color-accent-lime)]">*</span>
              </label>
              <input
                id={`mem-${member.id}-email`}
                type="email"
                value={member.email}
                placeholder="member@college.edu"
                onChange={(e) => handleChange("email", e.target.value)}
                className={cn(
                  "glass-input w-full h-11 px-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none transition-all duration-200",
                  getError("email")
                    ? "border-red-500/60 focus:border-red-500"
                    : "focus:border-[var(--color-accent-lime)] focus:ring-1 focus:ring-[var(--color-accent-lime-border)]"
                )}
                aria-invalid={getError("email") ? "true" : undefined}
              />
              {getError("email") && (
                <p role="alert" className="text-xs text-red-400">{getError("email")}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label
                htmlFor={`mem-${member.id}-phone`}
                className="text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase block"
              >
                Mobile <span className="text-[var(--color-accent-lime)]">*</span>
              </label>
              <input
                id={`mem-${member.id}-phone`}
                type="tel"
                value={member.phone}
                placeholder="10-digit number"
                onChange={(e) => handleChange("phone", e.target.value)}
                className={cn(
                  "glass-input w-full h-11 px-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none transition-all duration-200",
                  getError("phone")
                    ? "border-red-500/60 focus:border-red-500"
                    : "focus:border-[var(--color-accent-lime)] focus:ring-1 focus:ring-[var(--color-accent-lime-border)]"
                )}
                aria-invalid={getError("phone") ? "true" : undefined}
              />
              {getError("phone") && (
                <p role="alert" className="text-xs text-red-400">{getError("phone")}</p>
              )}
            </div>
          </div>

          {/* Remove button */}
          <div className="flex justify-end pt-1">
            <button
              type="button"
              onClick={onRemove}
              className="text-xs font-medium text-red-400 hover:text-red-300 flex items-center gap-1.5 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400 rounded px-2 py-1"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              Remove member
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────────────────

interface TeamMembersFormProps {
  members: TeamMember[];
  teamDetails: TeamDetails;
  errors: ValidationError[];
  minSize: number;
  maxSize: number;
  onChange: (members: TeamMember[]) => void;
}

export const TeamMembersForm: React.FC<TeamMembersFormProps> = ({
  members,
  teamDetails,
  errors,
  minSize,
  maxSize,
  onChange,
}) => {
  const totalCount = members.length + 1; // +1 for leader
  const canAdd = totalCount < maxSize;
  const globalError = errors.find(
    (e) =>
      e.field === "members" || e.field === "members_duplicate_email"
  );

  const addMember = () => {
    if (!canAdd) return;
    onChange([...members, createEmptyMember()]);
  };

  const updateMember = (index: number, updated: TeamMember) => {
    const next = [...members];
    next[index] = updated;
    onChange(next);
  };

  const removeMember = (index: number) => {
    onChange(members.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h3 font-bold text-[var(--color-text-primary)] mb-1">
          Team Members
        </h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Add {minSize - 1}–{maxSize - 1} additional team members (you are the leader).
        </p>
      </div>

      {/* Team size indicator */}
      <div className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: maxSize }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all duration-200",
                i === 0
                  ? "bg-[var(--color-accent-lime)] border-[var(--color-accent-lime)] text-[var(--color-bg-primary)]"
                  : i < totalCount
                  ? "bg-[var(--color-accent-cyan-subtle)] border-[var(--color-accent-cyan-border)] text-[var(--color-accent-cyan)]"
                  : "bg-white/5 border-white/10 text-[var(--color-text-muted)]"
              )}
            >
              {i + 1}
            </div>
          ))}
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-[var(--color-text-primary)]">
            {totalCount} / {maxSize} members
          </p>
          <p className="text-[11px] text-[var(--color-text-muted)]">
            {totalCount < minSize
              ? `Add at least ${minSize - totalCount} more`
              : totalCount === maxSize
              ? "Team is full"
              : `${maxSize - totalCount} slot(s) remaining`}
          </p>
        </div>
      </div>

      {/* Leader card (read-only) */}
      <div className="relative rounded-xl border border-[var(--color-accent-lime-border)] bg-[rgba(183,255,90,0.04)] px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)] shrink-0">
            1
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-[var(--color-text-primary)] truncate">
                {teamDetails.leaderName || "Team Leader"}
              </p>
              <span className="text-[10px] font-bold tracking-widest text-[var(--color-accent-lime)] bg-[var(--color-accent-lime-subtle)] px-2 py-0.5 rounded-full border border-[var(--color-accent-lime-border)] uppercase">
                Leader
              </span>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
              {teamDetails.leaderEmail || "—"}
            </p>
          </div>
          <span className="text-xs text-[var(--color-text-muted)] hidden sm:block">
            Edit in Step 1
          </span>
        </div>
      </div>

      {/* Additional members */}
      <div className="space-y-3">
        {members.map((member, index) => (
          <TeamMemberCardInline
            key={member.id}
            member={member}
            index={index}
            errors={errors}
            onUpdate={(updated) => updateMember(index, updated)}
            onRemove={() => removeMember(index)}
          />
        ))}
      </div>

      {/* Global validation error */}
      {globalError && (
        <div
          role="alert"
          className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-400"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5" aria-hidden="true">
            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          {globalError.message}
        </div>
      )}

      {/* Add member button */}
      {canAdd && (
        <button
          type="button"
          onClick={addMember}
          className="w-full h-12 rounded-xl border border-dashed border-white/20 hover:border-[var(--color-accent-lime-border)] hover:bg-[var(--color-accent-lime-subtle)] text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent-lime)] transition-all duration-200 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent-lime)]"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><path d="M12 8v8" /><path d="M8 12h8" />
          </svg>
          Add team member
        </button>
      )}

      {!canAdd && (
        <p className="text-xs text-center text-[var(--color-text-muted)]">
          Maximum team size of {maxSize} reached (including leader).
        </p>
      )}
    </div>
  );
};

