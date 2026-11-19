import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";

interface ScheduleBlock {
  phase: string;
  hour: string;
  title: string;
  description: string;
  tag: string;
}

const scheduleFlow: ScheduleBlock[] = [
  {
    phase: "PHASE 01",
    hour: "HOUR 00 – 02",
    title: "Check-in, Keynote & Problem Statement Reveal",
    description: "Teams report to SCET campus, complete biometric check-in, set up development stations, and receive confidential problem briefs.",
    tag: "OPENING",
  },
  {
    phase: "PHASE 02",
    hour: "HOUR 02 – 06",
    title: "Architecture & First Code Sprint",
    description: "Scaffold repositories, agree on data schemas, build basic layouts, and validate initial feasibility with assigned domain mentors.",
    tag: "SPRINT 1",
  },
  {
    phase: "PHASE 03",
    hour: "HOUR 06 – 12",
    title: "Core Feature Integration & Mentor Review Round 1",
    description: "Connect APIs, train local models, and demonstrate early core progress during the mandatory first-round technical check.",
    tag: "REVIEW 1",
  },
  {
    phase: "PHASE 04",
    hour: "HOUR 12 – 18",
    title: "Overnight Intensive Sprint & Stress Testing",
    description: "Uninterrupted coding through the night. Debug edge cases, optimize throughput, and polish the user journey with refreshments on hand.",
    tag: "OVERNIGHT",
  },
  {
    phase: "PHASE 05",
    hour: "HOUR 18 – 22",
    title: "Feature Freeze & Evaluation Dry Run",
    description: "Code freeze at the 22-hour mark. Teams generate live deployments, record backup walkthroughs, and rehearse pitch demonstrations.",
    tag: "CODE FREEZE",
  },
  {
    phase: "PHASE 06",
    hour: "HOUR 22 – 24",
    title: "Live Jury Pitches, Evaluation & Awards",
    description: "Live product demonstrations before industry jury members, scoring across four rubric pillars, and award announcements.",
    tag: "FINALE",
  },
];

export const ScheduleSection: React.FC = () => {
  return (
    <section id="schedule" className="py-20 lg:py-28 relative scroll-mt-20">
      <Container size="lg">
        <SectionHeading
          eyebrow="Chronological Flow"
          title="The 24-Hour Timeline"
          description="A continuous 24-hour engineering cycle engineered to take teams from blank editors to deployed, demonstrable applications."
          className="mb-12"
        />

        {/* Schedule Notice */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="text-[var(--color-accent-cyan)] shrink-0">
              <Icons.Terminal size={16} />
            </span>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Timeline represents standard 24-hour sprint structure. Specific calendar dates will be published once officially ratified.
            </p>
          </div>
          <Badge variant="default" size="sm">
            PROVISIONAL AGENDA
          </Badge>
        </div>

        {/* Timeline Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scheduleFlow.map((item, i) => (
            <GlassPanel
              key={i}
              variant="elevated"
              padding="lg"
              className="flex flex-col justify-between space-y-4 hover:border-white/20 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-widest text-[var(--color-accent-cyan)]">
                    {item.hour}
                  </span>
                  <Badge variant="default" size="sm">
                    {item.tag}
                  </Badge>
                </div>

                <h4 className="font-heading font-bold text-lg text-white">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[var(--color-text-muted)]">
                <span>{item.phase}</span>
                <span className="text-white/40">24H CYCLE</span>
              </div>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </section>
  );
};

