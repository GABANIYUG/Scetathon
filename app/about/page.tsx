import React from "react";
import type { Metadata } from "next";
import { aboutConfig } from "@/config/about";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "About SCETATHON & Host Institution",
  description:
    "Learn about the mission, vision, engineering heritage, and organizing principles behind SCETATHON at SCET Surat.",
};

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12 space-y-16">
      {/* Page Hero */}
      <PageHero
        badge="INSTITUTIONAL HERITAGE"
        badgeVariant="accent"
        title="BUILT BY INNOVATION."
        highlightedTitle="DRIVEN BY POSSIBILITY."
        description={aboutConfig.hero.description}
        metaNotice="Sarvajanik College of Engineering & Technology · Surat, India"
      />

      {/* Section 1: The SCETATHON Philosophy & Identity */}
      <section className="scroll-mt-24">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <SectionHeading
                eyebrow="The Event Philosophy"
                title="Why a 24-Hour Collegiate Hackathon?"
                description="Modern engineering students spend hundreds of hours studying theoretical concepts. SCETATHON creates an intensive, high-energy proving ground where that knowledge must immediately function."
              />

              <div className="space-y-4 text-body text-[var(--color-text-secondary)]">
                <p>
                  SCETATHON was conceived by faculty mentors and student developer communities at{" "}
                  <strong className="text-white font-semibold">SCET Surat</strong> to address the gap between classroom curricula and real-world product engineering.
                </p>
                <p>
                  By compressing the software product lifecycle into 24 uninterrupted hours, participants learn to make swift architectural decisions, balance trade-offs, integrate third-party APIs, and pitch their working prototypes with conviction.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Badge variant="accent">Pragmatic Engineering</Badge>
                <Badge variant="default">Multidisciplinary Teams</Badge>
                <Badge variant="success">Working Prototypes</Badge>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <GlassPanel variant="highlight" padding="lg" className="border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent-lime)]">
                      CORE PRINCIPLE
                    </span>
                    <Badge variant="default" size="sm">
                      VERIFIED TENET
                    </Badge>
                  </div>
                  <h3 className="font-heading font-bold text-xl text-white">
                    Execution Trumps Hypotheses
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    At SCETATHON, teams are evaluated on verifiable, running code and demonstrable hardware interactions — not hypothetical slides or unfinished prototypes.
                  </p>
                  <div className="p-3 rounded-lg bg-[rgba(8,11,18,0.7)] border border-white/10 text-[11px] font-mono text-[var(--color-text-muted)] flex items-center justify-between">
                    <span>EVALUATION STANDARD:</span>
                    <span className="text-[var(--color-accent-lime)]">FUNCTIONAL ARTIFACTS</span>
                  </div>
                </div>
              </GlassPanel>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 2: Mission & Vision */}
      <section className="py-16 bg-[var(--color-bg-secondary)] border-y border-white/5 scroll-mt-24">
        <Container size="lg">
          <SectionHeading
            eyebrow="Guiding Commitments"
            title="Mission & Vision"
            description="Our foundational guiding statements, formulated by the organizing committee to orient every track, evaluation rubric, and participant interaction."
            align="center"
            className="mb-12 text-center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Working Mission */}
            <GlassPanel variant="highlight" padding="lg" className="space-y-4 border-white/15">
              <div className="flex items-center justify-between">
                <Badge variant="accent">{aboutConfig.mission.label}</Badge>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">PURPOSE</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">
                {aboutConfig.mission.heading}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {aboutConfig.mission.statement}
              </p>
            </GlassPanel>

            {/* Working Vision */}
            <GlassPanel variant="highlight" padding="lg" className="space-y-4 border-white/15">
              <div className="flex items-center justify-between">
                <Badge variant="default">{aboutConfig.vision.label}</Badge>
                <span className="text-xs font-mono text-[var(--color-text-muted)]">ASPIRATION</span>
              </div>
              <h3 className="font-heading font-bold text-2xl text-white">
                {aboutConfig.vision.heading}
              </h3>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {aboutConfig.vision.statement}
              </p>
            </GlassPanel>
          </div>
        </Container>
      </section>

      {/* Section 3: Host Institution (SCET Surat) Verified Facts */}
      <section className="scroll-mt-24">
        <Container size="lg">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Academic Host"
              title="Sarvajanik College of Engineering & Technology"
              description="A respected cornerstone of engineering education in Surat, Gujarat, fostering technical excellence under Sarvajanik University."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {aboutConfig.institution.verifiedFacts.map((fact, idx) => (
                <GlassPanel key={idx} variant="elevated" padding="md" className="space-y-2">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--color-accent-lime)] uppercase block">
                    {fact.label}
                  </span>
                  <span className="font-heading font-bold text-lg text-white block">
                    {fact.value}
                  </span>
                  <span className="text-xs text-[var(--color-text-secondary)] block">
                    {fact.detail}
                  </span>
                </GlassPanel>
              ))}
            </div>

            <div className="p-5 rounded-2xl bg-[rgba(21,29,42,0.6)] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold text-white">
                  Official Campus Location
                </h4>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {aboutConfig.institution.location}
                </p>
              </div>
              <Badge variant="default" size="sm">
                SURAT · GUJARAT · INDIA
              </Badge>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 4: Organizing Committee Structure & Transparent Placeholder */}
      <section className="pb-16 sm:pb-24 scroll-mt-24">
        <Container size="lg">
          <SectionHeading
            eyebrow="Governance & Logistics"
            title="Organizing Structure"
            description="SCETATHON is administered through a dedicated collaboration between college faculty advisors, student engineering leads, and technical reviewers."
            className="mb-10"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {aboutConfig.committeeStructure.map((group, idx) => (
              <GlassPanel key={idx} variant="elevated" padding="lg" className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[var(--color-accent-cyan)]">
                    BRANCH 0{idx + 1}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[var(--color-accent-cyan)]/70" />
                </div>
                <h3 className="font-heading font-bold text-lg text-white">
                  {group.roleGroup}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {group.description}
                </p>
                <div className="pt-2 border-t border-white/10">
                  <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                    {group.statusText}
                  </span>
                </div>
              </GlassPanel>
            ))}
          </div>

          {/* Committee Roster Placeholder Announcement */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
            <span className="text-[var(--color-accent-lime)] shrink-0 mt-0.5">
              <Icons.Sparkles size={18} />
            </span>
            <div className="space-y-1">
              <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-accent-lime)] block">
                Official Organizing Dossier
              </span>
              <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                {aboutConfig.committeeNotice}
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
