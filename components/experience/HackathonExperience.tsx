"use client";

import React, { useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface ExperienceStage {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tag: string;
  durationLabel: string;
  focus: string;
  description: string;
  deliverables: string[];
  tips: string;
}

const stages: ExperienceStage[] = [
  {
    id: "discover",
    number: "01",
    title: "DISCOVER",
    subtitle: "Problem Analysis & Opportunity Framing",
    tag: "ORIENTATION & INITIATION",
    durationLabel: "STAGE 1",
    focus: "Unpack real-world problem statements, review user constraints, and interview domain mentors.",
    description:
      "The hackathon begins with deep contextual exploration. Teams dissect complex challenges, benchmark existing alternatives, and isolate high-impact technical opportunities before writing a single line of code.",
    deliverables: ["Problem Definition Matrix", "Target User Persona", "Initial Feasibility Scope"],
    tips: "Focus on problem clarity rather than immediate technical solutions.",
  },
  {
    id: "design",
    number: "02",
    title: "DESIGN",
    subtitle: "System Architecture & Experience Planning",
    tag: "ARCHITECTURAL BLUEPRINT",
    durationLabel: "STAGE 2",
    focus: "Map system flow, design interactive user journeys, and establish database & API schematics.",
    description:
      "Engineers and designers converge on cohesive technical architecture. Wireframes, component state machines, database schemas, and data pipelines are crystallized to ensure rapid execution during the build window.",
    deliverables: ["System Architecture Diagram", "Interactive Wireframes", "Tech Stack Finalization"],
    tips: "Prioritize end-to-end functionality over peripheral secondary features.",
  },
  {
    id: "build",
    number: "03",
    title: "BUILD",
    subtitle: "Collaborative Implementation & Testing",
    tag: "DEVELOPMENT CORE",
    durationLabel: "STAGE 3",
    focus: "Write clean code, integrate third-party APIs, train models, and test functional prototypes.",
    description:
      "The core 24-hour sprint. Teams execute collaboratively with modern frameworks, debug bottlenecks, stress-test real-world edge cases, and refine the user experience into a tangible working build.",
    deliverables: ["Working Codebase", "Functional Core Demo", "Unit & Integration Validation"],
    tips: "Commit early, test often, and maintain working builds at every milestone.",
  },
  {
    id: "present",
    number: "04",
    title: "PRESENT",
    subtitle: "Demonstration & Impact Assessment",
    tag: "EVALUATION & SHOWCASE",
    durationLabel: "STAGE 4",
    focus: "Pitch live interactive prototypes, demonstrate business viability, and address jury evaluations.",
    description:
      "Teams present their solutions live before industry experts, academic mentors, and peer innovators. The final pitch emphasizes technical ingenuity, execution quality, and scalable real-world impact.",
    deliverables: ["Live Interactive Demo", "Impact & Scalability Deck", "Technical Architecture Overview"],
    tips: "Let the working product tell the story with demonstrable live outcomes.",
  },
];

export const HackathonExperience: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage = stages[activeStageIndex];

  return (
    <div className="w-full space-y-8">
      {/* Interactive Stage Selector Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-4">
        {stages.map((stage, index) => {
          const isActive = index === activeStageIndex;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageIndex(index)}
              className={cn(
                "relative text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 cursor-pointer select-none border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-lime)]",
                isActive
                  ? "bg-[rgba(21,29,42,0.85)] border-[var(--color-accent-lime)] shadow-[0_8px_30px_-6px_rgba(183,255,90,0.25)]"
                  : "bg-[rgba(21,29,42,0.4)] border-white/10 hover:border-white/20 hover:bg-[rgba(21,29,42,0.6)]"
              )}
            >
              {/* Top status indicator */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={cn(
                    "text-xs font-mono font-bold tracking-widest transition-colors",
                    isActive ? "text-[var(--color-accent-lime)]" : "text-[var(--color-text-muted)]"
                  )}
                >
                  {stage.number}
                </span>
                <span
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    isActive
                      ? "bg-[var(--color-accent-lime)] shadow-[0_0_8px_#B7FF5A]"
                      : "bg-white/10"
                  )}
                />
              </div>

              {/* Title & Subtitle */}
              <h3
                className={cn(
                  "font-heading font-bold text-base sm:text-lg tracking-tight transition-colors",
                  isActive ? "text-white" : "text-[var(--color-text-secondary)]"
                )}
              >
                {stage.title}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] truncate mt-1">
                {stage.subtitle}
              </p>

              {/* Connected Active Progress Indicator Bar */}
              <div className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full overflow-hidden bg-white/5 mt-3">
                <div
                  className={cn(
                    "h-full transition-all duration-300",
                    isActive ? "w-full bg-[var(--color-accent-lime)]" : "w-0"
                  )}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Dynamic Stage Details Glass Panel */}
      <GlassPanel variant="highlight" padding="lg" className="border-white/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Stage Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="accent" dot>
                {currentStage.tag}
              </Badge>
              <Badge variant="default">
                {currentStage.durationLabel}
              </Badge>
            </div>

            <div className="space-y-2">
              <h4 className="text-display font-black text-[var(--color-text-primary)] text-3xl sm:text-4xl">
                {currentStage.title}:{" "}
                <span className="text-[var(--color-accent-lime)]">
                  {currentStage.subtitle}
                </span>
              </h4>
              <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            {/* Strategic Advice Card */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <span className="text-[var(--color-accent-cyan)] shrink-0 mt-0.5">
                <Icons.Sparkles size={18} />
              </span>
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-accent-cyan)] block mb-0.5">
                  Strategic Recommendation
                </span>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  {currentStage.tips}
                </p>
              </div>
            </div>
          </div>

          {/* Key Deliverables Side Panel */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 rounded-xl bg-[rgba(8,11,18,0.7)] border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Target Deliverables
                </span>
                <span className="text-[10px] font-mono text-[var(--color-accent-lime)]">
                  STAGE 0{activeStageIndex + 1} / 04
                </span>
              </div>

              <ul className="space-y-3">
                {currentStage.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                    <span className="w-5 h-5 rounded-md bg-[rgba(183,255,90,0.12)] border border-[rgba(183,255,90,0.25)] flex items-center justify-center text-[var(--color-accent-lime)] shrink-0 mt-0.5">
                      <Icons.Check size={12} />
                    </span>
                    <span className="text-xs sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 border-t border-white/10 text-[11px] font-mono text-[var(--color-text-muted)] flex items-center justify-between">
                <span>STAGE FOCUS:</span>
                <span className="text-white font-medium">{currentStage.title}</span>
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};

