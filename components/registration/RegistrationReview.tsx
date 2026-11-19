"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type {
  RegistrationFormData,
  ValidationError,
} from "@/lib/registration-validation";

interface RegistrationReviewProps {
  data: RegistrationFormData;
  previewDisclaimer: string;
  errors: ValidationError[];
  onEditStep: (step: 1 | 2) => void;
  onConsentChange: (value: boolean) => void;
}

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[10px] font-bold tracking-widest text-[var(--color-text-muted)] uppercase mb-3">
    {children}
  </p>
);

const DataRow: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex items-start gap-4 py-2.5 border-b border-white/[0.06] last:border-0">
    <span className="text-xs font-medium text-[var(--color-text-muted)] w-32 shrink-0 mt-px">
      {label}
    </span>
    <span className="text-sm font-medium text-[var(--color-text-primary)] flex-1 min-w-0 break-words">
      {value || <span className="text-[var(--color-text-muted)] italic">Not provided</span>}
    </span>
  </div>
);

export const RegistrationReview: React.FC<RegistrationReviewProps> = ({
  data,
  previewDisclaimer,
  errors,
  onEditStep,
  onConsentChange,
}) => {
  const consentError = errors.find((e) => e.field === "consent")?.message;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h3 font-bold text-[var(--color-text-primary)] mb-1">
          Review Your Details
        </h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Confirm everything looks correct before proceeding.
        </p>
      </div>

      {/* Team Details Block */}
      <div className="rounded-xl border border-white/10 bg-white/[0.025] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
          <SectionLabel>Team Details</SectionLabel>
          <button
            type="button"
            onClick={() => onEditStep(1)}
            className="text-xs font-semibold text-[var(--color-accent-lime)] hover:text-[var(--color-accent-lime-hover)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent-lime)] rounded px-2 py-0.5"
          >
            Edit
          </button>
        </div>
        <div className="px-5">
          <DataRow label="Team Name" value={data.teamDetails.teamName} />
          <DataRow label="College" value={data.teamDetails.collegeName} />
          <DataRow label="City" value={data.teamDetails.city} />
          <DataRow label="Leader Name" value={data.teamDetails.leaderName} />
          <DataRow label="Leader Email" value={data.teamDetails.leaderEmail} />
          <DataRow label="Leader Phone" value={data.teamDetails.leaderPhone} />
        </div>
      </div>

      {/* Team Members Block */}
      <div className="rounded-xl border border-white/10 bg-white/[0.025] overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
          <SectionLabel>
            Team Members ({data.members.length + 1} total)
          </SectionLabel>
          <button
            type="button"
            onClick={() => onEditStep(2)}
            className="text-xs font-semibold text-[var(--color-accent-lime)] hover:text-[var(--color-accent-lime-hover)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent-lime)] rounded px-2 py-0.5"
          >
            Edit
          </button>
        </div>

        <div className="divide-y divide-white/[0.06]">
          {/* Leader */}
          <div className="px-5 py-3.5 flex items-start gap-3">
            <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)] shrink-0 mt-0.5">
              1
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {data.teamDetails.leaderName}
                </p>
                <span className="text-[9px] font-bold tracking-widest text-[var(--color-accent-lime)] bg-[var(--color-accent-lime-subtle)] px-1.5 py-0.5 rounded-full border border-[var(--color-accent-lime-border)] uppercase">
                  Leader
                </span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                {data.teamDetails.leaderEmail}
              </p>
            </div>
          </div>

          {/* Additional members */}
          {data.members.map((member, i) => (
            <div key={member.id} className="px-5 py-3.5 flex items-start gap-3">
              <span className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold bg-[var(--color-accent-cyan-subtle)] border border-[var(--color-accent-cyan-border)] text-[var(--color-accent-cyan)] shrink-0 mt-0.5">
                {i + 2}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {member.name || "—"}
                  </p>
                  {member.role && (
                    <span className="text-[9px] font-medium text-[var(--color-text-muted)] bg-white/5 px-1.5 py-0.5 rounded">
                      {member.role}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {member.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview disclaimer + consent */}
      <div
        className={cn(
          "rounded-xl border p-5 space-y-4 transition-all duration-200",
          consentError
            ? "border-red-500/40 bg-red-500/5"
            : "border-white/10 bg-white/[0.025]"
        )}
      >
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--color-accent-lime-subtle)] border border-[var(--color-accent-lime-border)] shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent-lime)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
            </svg>
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--color-text-primary)] mb-1">
              Preview Notice
            </p>
            <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
              {previewDisclaimer}
            </p>
          </div>
        </div>

        {/* Consent checkbox */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 shrink-0">
            <input
              type="checkbox"
              checked={data.consentGiven}
              onChange={(e) => onConsentChange(e.target.checked)}
              className="sr-only peer"
              aria-describedby={consentError ? "consent-error" : undefined}
            />
            <div
              className={cn(
                "w-5 h-5 rounded flex items-center justify-center border-2 transition-all duration-200",
                data.consentGiven
                  ? "bg-[var(--color-accent-lime)] border-[var(--color-accent-lime)]"
                  : consentError
                  ? "bg-transparent border-red-500/60"
                  : "bg-transparent border-white/30 group-hover:border-white/50"
              )}
            >
              {data.consentGiven && (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-bg-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-xs text-[var(--color-text-secondary)] leading-relaxed group-hover:text-[var(--color-text-primary)] transition-colors duration-150">
            I understand this is a preview demonstration. No personal data will be stored,
            processed, or transmitted.
          </span>
        </label>

        {consentError && (
          <p id="consent-error" role="alert" className="text-xs text-red-400 pl-8">
            {consentError}
          </p>
        )}
      </div>
    </div>
  );
};

