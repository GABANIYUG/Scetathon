import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { ScheduleTimeline } from "@/components/schedule/ScheduleTimeline";

export const metadata: Metadata = {
  title: "Schedule & 24-Hour Timeline",
  description:
    "The 24-hour chronological flow of SCETATHON — check-in, sprint milestones, mentor reviews, and live product evaluations.",
};

export default function SchedulePage() {
  return (
    <div className="py-8 sm:py-12 space-y-12">
      {/* Page Hero */}
      <PageHero
        badge="TIMELINE & MILESTONES"
        badgeVariant="accent"
        title="24 HOURS. ONE"
        highlightedTitle="CONTINUOUS SPRINT."
        description="A structured chronological overview of the 24-hour engineering cycle. Designed to guide teams from problem scoping and architecture to live deployment and jury evaluation."
        metaNotice="Illustrative Timeline // Official Calendar Dates Subject to Committee Notice"
      />

      {/* Main Timeline Section */}
      <section className="pb-16 sm:pb-24">
        <Container size="lg">
          <ScheduleTimeline />
        </Container>
      </section>
    </div>
  );
}

