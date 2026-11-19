import React from "react";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { BackgroundGrid } from "@/components/visual/BackgroundGrid";
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

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--color-bg-primary)] overflow-x-hidden selection:bg-[var(--color-accent-lime)] selection:text-[var(--color-bg-primary)]">
      {/* Background Visual Foundation: Subtle Tech Grid & Controlled Atmosphere */}
      <BackgroundGrid variant="grid" glowLime glowCyan />

      {/* Enhanced Global Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {/* ===================================================================
            HERO SECTION: The Innovation Core & Editorial Value Proposition
            =================================================================== */}
        <section id="home" className="pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-28 lg:pb-32 relative scroll-mt-20">
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
                    Sarvajanik College of Engineering & Technology (SCET), Surat
                  </span>
                  . Bringing student innovators, developers, and problem solvers together to build tangible, real-world solutions.
                </p>

                {/* Clear Primary & Secondary CTAs */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <Button
                    href="#challenges"
                    size="lg"
                    variant="primary"
                    rightIcon={<Icons.ArrowRight size={18} />}
                    className="shadow-[0_0_24px_-4px_rgba(183,255,90,0.35)]"
                  >
                    Explore Challenges
                  </Button>

                  <Button
                    href="#experience"
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
            THE 24-HOUR EXPERIENCE: Interactive Team Journey
            =================================================================== */}
        <section id="experience" className="py-20 lg:py-28 relative scroll-mt-20">
          <Container size="lg">
            <SectionHeading
              eyebrow="The 24-Hour Cycle"
              title="The Architecture of a Hackathon Sprint"
              description="A step-by-step interactive journey through how inter-college teams convert raw challenge statements into battle-tested prototypes."
              className="mb-12"
            />

            <HackathonExperience />
          </Container>
        </section>

        <SectionDivider />

        {/* ===================================================================
            THE BUILD LAB: Interactive Innovation Demonstration
            =================================================================== */}
        <section id="lab" className="py-20 lg:py-28 relative scroll-mt-20 bg-[var(--color-bg-secondary)]">
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
            SCHEDULE: Chronological 24-Hour Flow
            =================================================================== */}
        <ScheduleSection />

        {/* ===================================================================
            FINAL CALL TO ACTION: Build What Doesn't Exist Yet
            =================================================================== */}
        <FinalCtaSection />
      </main>

      {/* Global Application Footer */}
      <Footer />
    </div>
  );
}
