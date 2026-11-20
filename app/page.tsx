import React, { Suspense } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { InnovationCore } from "@/components/visual/InnovationCore";
import { SectionDivider } from "@/components/visual/SectionDivider";
import { EventInfoStrip } from "@/components/sections/EventInfoStrip";
import { AboutSection } from "@/components/sections/AboutSection";
import { ChallengePreview } from "@/components/sections/ChallengePreview";
import { HackathonExperience } from "@/components/experience/HackathonExperience";
import { BuildLab } from "@/components/interactive/BuildLab";
import { ScheduleSection } from "@/components/sections/ScheduleSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EventLiveBanner } from "@/components/operations/EventLiveBanner";
import { getEventSettings } from "@/lib/dal/settings";

export default async function HomePage() {
  const settings = await getEventSettings();

  return (
    <>
      {/* Live Event Operations Banner */}
      <Suspense fallback={null}>
        <EventLiveBanner
          initialStatus={settings.event_status}
          initialMessage={settings.public_status_message}
        />
      </Suspense>

      {/* ===================================================================
          HERO SECTION: The Innovation Core & Editorial Value Proposition
          =================================================================== */}
      <section id="home" className="pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 relative scroll-mt-24">
        <Container size="lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Editorial Headline & Introduction */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Eyebrow Badge */}
              <div className="inline-flex items-center gap-2">
                <Badge variant="accent" dot size="md">
                  SCETATHON / 24-HOUR HACKATHON
                </Badge>
                <span className="text-xs font-mono text-[var(--color-text-muted)] tracking-wider uppercase hidden sm:inline-block">
                  {siteConfig.institution.shortName} · SURAT
                </span>
              </div>

              {/* Main Confident Headline */}
              <h1 className="text-display font-extrabold text-[var(--color-text-primary)] tracking-tight uppercase leading-[0.98]">
                BUILD WHAT{" "}
                <span className="text-[var(--color-accent-lime)] glow-text-lime block">
                  DOESN&apos;T EXIST YET.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-body-lg text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
                The premier 24-hour inter-college hackathon hosted at{" "}
                <span className="text-white font-medium">
                  {siteConfig.institution.fullName}
                </span>
                . Bringing student innovators, developers, and problem solvers together to build tangible, real-world solutions.
              </p>

              {/* Clear Primary & Secondary CTAs navigating to dedicated routes */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Button
                  href="/challenges"
                  size="lg"
                  variant="primary"
                  rightIcon={<Icons.ArrowRight size={18} />}
                  className="shadow-[0_0_24px_-4px_rgba(183,255,90,0.35)]"
                >
                  Explore Challenges
                </Button>

                <Button
                  href="/experience"
                  size="lg"
                  variant="outline"
                  leftIcon={<Icons.Sparkles size={18} />}
                >
                  Discover the Experience
                </Button>
              </div>

              {/* Rapid Credentials Mini-Strip */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs font-mono text-[var(--color-text-muted)]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-lime)]" />
                  <span>24 HOURS CONTINUOUS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-cyan)]" />
                  <span>CAMPUS HACKATHON</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]" />
                  <span>INTER-COLLEGE TEAMS</span>
                </div>
              </div>
            </div>

            {/* Right Column: The 3D-inspired Innovation Core Visual */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <InnovationCore />
            </div>
          </div>
        </Container>
      </section>

      {/* ===================================================================
          EVENT INFORMATION STRIP: Verified Institutional Metrics
          =================================================================== */}
      <EventInfoStrip />

      {/* ===================================================================
          ABOUT SCETATHON: Purpose, Spirit & Campus Legacy
          =================================================================== */}
      <AboutSection />

      <SectionDivider />

      {/* ===================================================================
          CHALLENGE PREVIEW: Curated Engineering Tracks
          =================================================================== */}
      <ChallengePreview />

      <SectionDivider />

      {/* ===================================================================
          THE 24-HOUR EXPERIENCE: Interactive Team Journey Preview
          =================================================================== */}
      <section id="experience-preview" className="py-20 lg:py-28 relative scroll-mt-24">
        <Container size="lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="The 24-Hour Cycle"
              title="The Architecture of a Hackathon Sprint"
              description="A step-by-step interactive journey through how inter-college teams convert raw challenge statements into battle-tested prototypes."
            />
            <div className="shrink-0">
              <Button href="/experience" variant="outline" rightIcon={<Icons.ArrowRight size={15} />}>
                Detailed Experience
              </Button>
            </div>
          </div>

          <HackathonExperience />
        </Container>
      </section>

      <SectionDivider />

      {/* ===================================================================
          THE BUILD LAB: Interactive Innovation Demonstration
          =================================================================== */}
      <section id="lab" className="py-20 lg:py-28 relative scroll-mt-24 bg-[var(--color-bg-secondary)]">
        <Container size="lg">
          <SectionHeading
            eyebrow="Interactive Lab"
            title="Inside The Build Environment"
            description="Test-drive the SCETATHON engineering pipeline. Interact with the live execution simulation below to preview how teams ideate, prototype, validate, and present."
            align="center"
            className="mb-12 text-center"
          />

          <BuildLab />
        </Container>
      </section>

      <SectionDivider />

      {/* ===================================================================
          SCHEDULE: Chronological 24-Hour Flow Preview
          =================================================================== */}
      <div className="relative">
        <ScheduleSection />
        <div className="text-center pb-12 -mt-8">
          <Button href="/schedule" variant="outline" size="md" rightIcon={<Icons.ArrowRight size={16} />}>
            View Dedicated Schedule Experience
          </Button>
        </div>
      </div>

      {/* ===================================================================
          FINAL CALL TO ACTION: Build What Doesn't Exist Yet
          =================================================================== */}
      <FinalCtaSection />
    </>
  );
}
