import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ChallengeExplorer } from "@/components/challenges/ChallengeExplorer";

export const metadata: Metadata = {
  title: "Challenges & Engineering Domains",
  description:
    "Explore the curated problem solving tracks planned for SCETATHON — 24-hour inter-college hackathon at SCET Surat.",
};

export default function ChallengesPage() {
  return (
    <div className="py-8 sm:py-12 space-y-12">
      {/* Page Hero */}
      <PageHero
        badge="CHALLENGE DIRECTORY"
        badgeVariant="accent"
        title="FIND THE PROBLEM"
        highlightedTitle="WORTH SOLVING."
        description="Explore engineering domains and discover opportunities to create meaningful technology solutions. Review planned tracks and technical competencies ahead of official statement releases."
        metaNotice="Provisional Directory // Statements Ratified at Event Kickoff"
      />

      {/* Main Interactive Explorer */}
      <section className="pb-16 sm:pb-24">
        <Container size="lg">
          <ChallengeExplorer />
        </Container>
      </section>
    </div>
  );
}

