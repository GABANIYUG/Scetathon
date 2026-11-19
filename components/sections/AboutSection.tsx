import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 lg:py-28 relative scroll-mt-20">
      <Container size="lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Copy */}
          <div className="lg:col-span-7 space-y-6">
            <SectionHeading
              eyebrow="The SCETATHON Philosophy"
              title="24 Hours to Turn Theoretical Knowledge Into Working Reality."
              description="Engineering isn't about memorizing syntax or writing passive code. It's about constructing tangible solutions under time pressure with an ambitious, focused team."
            />

            <div className="space-y-4 text-body text-[var(--color-text-secondary)]">
              <p>
                Organized at{" "}
                <span className="text-white font-medium">
                  {siteConfig.institution.fullName}
                </span>{" "}
                in Surat, SCETATHON brings together student builders, designers, and technologists for an uninterrupted 24-hour hackathon sprint.
              </p>
              <p>
                From rapid ideation and architectural wireframing to writing code and presenting before an expert jury, participants experience the full lifecycle of modern technological innovation in a single day.
              </p>
            </div>

            {/* Core Values Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-[var(--color-accent-lime)] block font-mono text-xs font-bold">
                  01 // AUTONOMY
                </span>
                <span className="text-sm font-semibold text-white block">
                  Open Problem Space
                </span>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Pick challenges that genuinely matter to your team.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-[var(--color-accent-cyan)] block font-mono text-xs font-bold">
                  02 // EXECUTION
                </span>
                <span className="text-sm font-semibold text-white block">
                  Working Artifacts
                </span>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Present functional prototypes over hypothetical slide decks.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1.5">
                <span className="text-[#4ADE80] block font-mono text-xs font-bold">
                  03 // COMMUNITY
                </span>
                <span className="text-sm font-semibold text-white block">
                  Peer Synergy
                </span>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Collaborate across college campuses and tech domains.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Editorial Glass Composition */}
          <div className="lg:col-span-5 space-y-4">
            <GlassPanel variant="highlight" padding="lg" className="border-white/20">
              <div className="space-y-5">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--color-accent-lime)] shadow-[0_0_8px_#B7FF5A]" />
                    <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                      Campus Engineering Heritage
                    </span>
                  </div>
                  <Badge variant="accent">EST. SURAT</Badge>
                </div>

                <div className="space-y-3">
                  <h4 className="font-heading font-bold text-xl text-white">
                    Sarvajanik College of Engineering & Technology
                  </h4>
                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    SCET stands as one of South Gujarat&apos;s premier engineering institutions, with decades of academic rigor, active technical clubs, and a thriving developer ecosystem.
                  </p>
                </div>

                {/* Verified Specs Checklist */}
                <div className="pt-2 space-y-2 border-t border-white/10">
                  <div className="flex items-center gap-2.5 text-xs text-[var(--color-text-secondary)]">
                    <Icons.Check size={14} className="text-[var(--color-accent-lime)] shrink-0" />
                    <span>State-of-the-art campus computer infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[var(--color-text-secondary)]">
                    <Icons.Check size={14} className="text-[var(--color-accent-lime)] shrink-0" />
                    <span>High-speed dedicated networking & power redundancy</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[var(--color-text-secondary)]">
                    <Icons.Check size={14} className="text-[var(--color-accent-lime)] shrink-0" />
                    <span>Direct access to academic and industry technical mentors</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-[rgba(8,11,18,0.8)] border border-white/10 text-[11px] font-mono text-[var(--color-text-muted)] flex items-center justify-between">
                  <span>LOCATION: SURAT, GUJARAT</span>
                  <span className="text-[var(--color-accent-cyan)]">INDIA</span>
                </div>
              </div>
            </GlassPanel>
          </div>
        </div>
      </Container>
    </section>
  );
};

