import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { RegistrationWizard } from "@/components/registration/RegistrationWizard";
import { registrationConfig } from "@/config/registration";

export const metadata: Metadata = {
  title: "Team Registration & Roster Formation",
  description:
    "Assemble your engineering squad and preview the registration workflow for SCETATHON — 24-hour inter-college hackathon at SCET Surat.",
};

export default function RegisterPage() {
  const { mode, modeNotice } = registrationConfig;

  return (
    <div className="py-8 sm:py-12 space-y-10">
      {/* Page Hero */}
      <PageHero
        badge="REGISTRATION DESK"
        eyebrow="TEAM FORMATION"
        title="YOUR TEAM. YOUR IDEA."
        highlightedTitle="YOUR 24 HOURS."
        description="Assemble your squad, configure member disciplines, and experience the registration pipeline. Ensure all members are verified students from accredited institutions."
        metaNotice="Demonstration Environment // No Personal Records Persisted"
      />

      {/* Mode Status Banner */}
      <section>
        <Container size="lg">
          <div className="p-4 rounded-xl border border-[var(--color-accent-lime-border)] bg-[rgba(183,255,90,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-lime)] animate-pulse shrink-0" />
              <span className="font-mono uppercase tracking-wider text-[var(--color-accent-lime)] font-semibold">
                Status: {mode}
              </span>
              <span className="text-white/20 hidden sm:inline">|</span>
              <span className="text-[var(--color-text-secondary)]">
                {modeNotice[mode]}
              </span>
            </div>
            <div className="font-mono text-[var(--color-text-muted)] text-[11px] shrink-0">
              Min: {registrationConfig.teamSize.min} / Max: {registrationConfig.teamSize.max} members
            </div>
          </div>
        </Container>
      </section>

      {/* Main Interactive Registration Flow */}
      <section className="pb-16 sm:pb-24">
        <Container size="lg">
          <RegistrationWizard />
        </Container>
      </section>
    </div>
  );
}

