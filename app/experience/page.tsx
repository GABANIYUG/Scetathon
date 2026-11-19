import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { HackathonExperience } from "@/components/experience/HackathonExperience";
import { BuildLab } from "@/components/interactive/BuildLab";
import { experienceHighlights } from "@/config/experience";

export const metadata: Metadata = {
  title: "The Experience & Builder Journey",
  description:
    "Discover what participating in SCETATHON feels like — from problem scoping and architecture to overnight coding and live presentations.",
};

export default function ExperiencePage() {
  const renderIcon = (name: string) => {
    switch (name) {
      case "Terminal":
        return <Icons.Terminal size={20} className="text-[var(--color-accent-lime)]" />;
      case "Sparkles":
        return <Icons.Sparkles size={20} className="text-[var(--color-accent-cyan)]" />;
      case "Check":
        return <Icons.Check size={20} className="text-[#4ADE80]" />;
      case "ArrowRight":
        return <Icons.ArrowRight size={20} className="text-[var(--color-accent-lime)]" />;
      case "ExternalLink":
        return <Icons.ExternalLink size={20} className="text-[var(--color-accent-cyan)]" />;
      default:
        return <Icons.GitHub size={20} className="text-white" />;
    }
  };

  return (
    <div className="py-8 sm:py-12 space-y-16">
      {/* Page Hero */}
      <PageHero
        badge="THE PARTICIPANT EXPERIENCE"
        badgeVariant="accent"
        title="FROM AN IDEA TO"
        highlightedTitle="SOMETHING REAL."
        description="A 24-hour hackathon isn't an exam or a conference. It is a high-velocity collaborative crucible where student engineers and designers learn through immediate, real-world execution."
        metaNotice="Immersive Builder Journey // 4 Structured Engineering Stages"
      />

      {/* Section 1: Interactive Four-Stage Journey */}
      <section className="scroll-mt-24">
        <Container size="lg">
          <SectionHeading
            eyebrow="The Four Milestones"
            title="The Lifecycle of a Hackathon Squad"
            description="Explore how multidisciplinary student teams progress through problem discovery, system architecture, intensive building, and live evaluation."
            className="mb-10"
          />

          <HackathonExperience />
        </Container>
      </section>

      {/* Section 2: Expanded Build Lab Simulation */}
      <section className="py-16 bg-[var(--color-bg-secondary)] border-y border-white/5 scroll-mt-24">
        <Container size="lg">
          <SectionHeading
            eyebrow="Interactive Simulation"
            title="The Build Lab Simulator"
            description="An interactive frontend model demonstrating how technical teams test hypotheses, inspect live compilation feedback, audit accessibility, and rehearse pitches."
            align="center"
            className="mb-12 text-center"
          />

          <BuildLab />
        </Container>
      </section>

      {/* Section 3: Educational Experience Highlights */}
      <section className="pb-16 sm:pb-24 scroll-mt-24">
        <Container size="lg">
          <SectionHeading
            eyebrow="Core Competency Gains"
            title="What Builders Gain From 24 Hours"
            description="SCETATHON emphasizes tangible engineering growth, peer collaboration, and realistic product design without deceptive promises or inflated claims."
            className="mb-12"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experienceHighlights.map((highlight, idx) => (
              <GlassPanel
                key={idx}
                variant="interactive"
                padding="lg"
                className="space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      {renderIcon(highlight.iconName)}
                    </div>
                    <Badge variant="default" size="sm">
                      {highlight.tag}
                    </Badge>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white">
                    {highlight.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {highlight.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-[var(--color-text-muted)] flex items-center justify-between">
                  <span>OUTCOME {idx + 1} OF 6</span>
                  <span className="text-[var(--color-accent-lime)]">PEDAGOGICAL VALUE</span>
                </div>
              </GlassPanel>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

