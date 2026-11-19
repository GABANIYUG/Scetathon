"use client";

import React from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import type { RegistrationFormData } from "@/lib/registration-validation";

export interface LiveRegistrationResult {
  registration_id: string;
  team_id: string;
  team_name: string;
}

interface RegistrationStatusProps {
  data: RegistrationFormData;
  modeNotice: string;
  liveSubmissionResult?: LiveRegistrationResult | null;
  onReset: () => void;
  onBackToReview: () => void;
}

export const RegistrationStatus: React.FC<RegistrationStatusProps> = ({
  data,
  modeNotice,
  liveSubmissionResult,
  onReset,
  onBackToReview,
}) => {
  const isRealSubmission = Boolean(liveSubmissionResult?.registration_id);

  return (
    <div className="space-y-8 text-center py-4">
      {/* Visual Indicator Icon */}
      <div className="mx-auto w-20 h-20 rounded-2xl bg-[var(--color-accent-lime-subtle)] border border-[var(--color-accent-lime-border)] flex items-center justify-center text-[var(--color-accent-lime)] shadow-[0_0_30px_-6px_rgba(183,255,90,0.3)]">
        {isRealSubmission ? (
          <Icons.Check size={36} />
        ) : (
          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        )}
      </div>

      {/* Heading & Badge */}
      <div className="space-y-3 max-w-lg mx-auto">
        <div className="flex justify-center">
          <Badge
            variant={isRealSubmission ? "success" : "accent"}
            dot
            size="md"
          >
            {isRealSubmission ? "DATABASE TRANSACTION COMMITTED" : "PREVIEW COMPLETED"}
          </Badge>
        </div>
        <h2 className="text-h2 font-bold text-[var(--color-text-primary)]">
          {isRealSubmission ? "Registration Application Submitted!" : "Registration Flow Previewed"}
        </h2>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
          {isRealSubmission
            ? "Your squad registration has been recorded in the SCETATHON PostgreSQL database. The application is now pending Faculty Committee review."
            : modeNotice}
        </p>
      </div>

      {/* Real Registration Identifier Card */}
      {isRealSubmission && liveSubmissionResult && (
        <div className="max-w-md mx-auto p-4 rounded-xl bg-[var(--color-accent-lime-subtle)] border border-[var(--color-accent-lime-border)] text-left space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-[var(--color-text-muted)] uppercase">Database Registration ID</span>
            <span className="text-[var(--color-accent-lime)] font-bold">VERIFIED</span>
          </div>
          <p className="font-mono text-sm text-white break-all select-all font-semibold">
            {liveSubmissionResult.registration_id}
          </p>
          <div className="text-[11px] text-[var(--color-text-muted)] font-mono">
            Team ID: {liveSubmissionResult.team_id}
          </div>
        </div>
      )}

      {/* Team Summary Card */}
      <div className="max-w-md mx-auto p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-left space-y-3">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
            Configured Team
          </span>
          <span className="text-xs font-mono text-[var(--color-accent-lime)]">
            {data.members.length + 1} Members
          </span>
        </div>

        <div>
          <div className="text-base font-bold text-[var(--color-text-primary)] truncate">
            {data.teamDetails.teamName || "Untitled Team"}
          </div>
          <div className="text-xs text-[var(--color-text-muted)] truncate">
            {data.teamDetails.collegeName || "Institution not provided"} • {data.teamDetails.city || "City"}
          </div>
        </div>

        <div className="pt-2 text-xs text-[var(--color-text-secondary)] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-cyan)]" />
          Leader: <span className="text-[var(--color-text-primary)] font-medium">{data.teamDetails.leaderName}</span> ({data.teamDetails.leaderEmail})
        </div>
      </div>

      {!isRealSubmission && (
        <div className="max-w-md mx-auto p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-[var(--color-text-muted)] leading-relaxed">
          <strong className="text-[var(--color-text-secondary)] block mb-1">
            Preview Mode Demonstration
          </strong>
          Registration mode is currently in preview mode. No live registration record was created. When registration mode is switched to &quot;open&quot; in the admin panel and Supabase credentials are connected, applications commit directly to PostgreSQL.
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        {isRealSubmission ? (
          <Button href="/dashboard" variant="primary" size="md">
            Go to Participant Dashboard
          </Button>
        ) : (
          <>
            <Button variant="outline" size="md" onClick={onBackToReview}>
              Review Form Entries
            </Button>
            <Button variant="secondary" size="md" onClick={onReset}>
              Reset & Start Fresh
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
