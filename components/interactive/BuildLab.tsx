"use client";

import React, { useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type LabStageId = "ideate" | "prototype" | "validate" | "present";

interface LabStage {
  id: LabStageId;
  label: string;
  badge: string;
  headline: string;
  description: string;
  codeSnippet?: string;
  metrics: { label: string; value: string; status: "success" | "accent" | "cyan" }[];
  actionPrompt: string;
}

const labStages: Record<LabStageId, LabStage> = {
  ideate: {
    id: "ideate",
    label: "IDEATE",
    badge: "STAGE 01 // ANALYSIS",
    headline: "Deconstruct & Hypothesize",
    description:
      "Synthesize real-world engineering challenges. Isolate domain bottlenecks, review user feedback, and form rapid solution hypotheses with your multidisciplinary squad.",
    metrics: [
      { label: "PROBLEM RIGOR", value: "98.4%", status: "accent" },
      { label: "FEASIBILITY", value: "HIGH", status: "success" },
      { label: "TEAM CONVERGENCE", value: "100%", status: "cyan" },
    ],
    actionPrompt: "Problem Scope Ratified · Ready for Architecture",
  },
  prototype: {
    id: "prototype",
    label: "PROTOTYPE",
    badge: "STAGE 02 // SPRINT",
    headline: "Full-Stack Implementation",
    description:
      "Rapidly assemble robust full-stack infrastructure. Scaffold APIs, connect machine learning models, construct reactive UI interfaces, and maintain clean atomic commits.",
    codeSnippet: `// SCETATHON Innovation Pipeline
export async function handleChallengeStream(req: Request) {
  const { trackId, teamId, payload } = await req.json();
  const evaluation = await model.evaluate({
    context: "SCETATHON_2026",
    latencyTarget: "<50ms",
    feasibilityCheck: true
  });
  return Response.json({ status: "COMPILED", score: evaluation.impact });
}`,
    metrics: [
      { label: "BUILD STATUS", value: "PASSING", status: "success" },
      { label: "LATENCY", value: "32ms", status: "cyan" },
      { label: "COVERAGE", value: "94.2%", status: "accent" },
    ],
    actionPrompt: "Build Pipeline Operational · Running Stress Tests",
  },
  validate: {
    id: "validate",
    label: "VALIDATE",
    badge: "STAGE 03 // AUDIT",
    headline: "Stress-Testing & Rigorous Verification",
    description:
      "Subject the prototype to real-world edge cases. Audit accessibility compliance, verify backend resilience under load, and review mentor feedback before the final cutoff.",
    metrics: [
      { label: "ACCESSIBILITY", value: "WCAG AAA", status: "success" },
      { label: "THROUGHPUT", value: "2,400 req/s", status: "cyan" },
      { label: "SECURITY AUDIT", value: "VERIFIED", status: "accent" },
    ],
    actionPrompt: "All Systems Verified · Production Artifact Frozen",
  },
  present: {
    id: "present",
    label: "PRESENT",
    badge: "STAGE 04 // SHOWCASE",
    headline: "Live Product Demonstration",
    description:
      "Step onto the presentation stage. Walk jury members through interactive live workflows, demonstrate architectural depth, and communicate measurable impact.",
    metrics: [
      { label: "EVALUATION CRITERIA", value: "4 DIMENSIONS", status: "cyan" },
      { label: "PITCH CLOCK", value: "03:00 MIN", status: "accent" },
      { label: "STAGE READINESS", value: "CONFIRMED", status: "success" },
    ],
    actionPrompt: "Demonstration Ready · Jury Evaluator Connected",
  },
};

export const BuildLab: React.FC = () => {
  const [activeStageId, setActiveStageId] = useState<LabStageId>("prototype");
  const [interactiveCounter, setInteractiveCounter] = useState(1);
  const currentStage = labStages[activeStageId];

  const stageKeys: LabStageId[] = ["ideate", "prototype", "validate", "present"];

  return (
    <div className="w-full space-y-6">
      {/* Top Header Card */}
      <GlassPanel variant="highlight" padding="lg" className="border-white/15">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent-lime)] animate-pulse-subtle" />
              <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent-lime)] uppercase">
                Interactive Demonstration
              </span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-white tracking-tight">
              THE BUILD LAB
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1 max-w-xl">
              An interactive simulation of a team&apos;s workflow through the 24-hour engineering cycle. Select stages below to simulate execution states.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center gap-2 bg-[#080B12]/60 p-1.5 rounded-xl border border-white/10 shrink-0">
            {stageKeys.map((key) => {
              const stage = labStages[key];
              const isActive = activeStageId === key;

              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveStageId(key);
                    setInteractiveCounter((c) => c + 1);
                  }}
                  className={cn(
                    "px-3.5 py-2 rounded-lg text-xs font-mono font-bold tracking-wider transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-lime)]",
                    isActive
                      ? "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)] shadow-[0_0_16px_rgba(183,255,90,0.35)] font-extrabold"
                      : "text-[var(--color-text-secondary)] hover:text-white hover:bg-white/5"
                  )}
                >
                  {stage.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Interactive Stage Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 items-start">
          {/* Left: Stage Overview & Description */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2.5">
              <Badge variant="accent" dot>
                {currentStage.badge}
              </Badge>
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                CYCLE ITERATION #{interactiveCounter}
              </span>
            </div>

            <div className="space-y-2">
              <h4 className="font-heading font-bold text-xl sm:text-2xl text-white">
                {currentStage.headline}
              </h4>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            {/* Stage Metrics Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {currentStage.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-[rgba(8,11,18,0.7)] border border-white/10 text-center"
                >
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] block truncate mb-1">
                    {metric.label}
                  </span>
                  <span
                    className={cn(
                      "text-sm sm:text-base font-mono font-bold block",
                      metric.status === "accent" && "text-[var(--color-accent-lime)]",
                      metric.status === "cyan" && "text-[var(--color-accent-cyan)]",
                      metric.status === "success" && "text-[#4ADE80]"
                    )}
                  >
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Simulated Execution Action */}
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--color-accent-lime)] animate-ping" />
                <span className="text-xs font-mono text-[var(--color-text-primary)] font-medium">
                  {currentStage.actionPrompt}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setInteractiveCounter((c) => c + 1)}
                className="text-[11px] py-1 px-2.5"
              >
                Re-Simulate
              </Button>
            </div>
          </div>

          {/* Right: Technical Inspector Visual Panel */}
          <div className="lg:col-span-6">
            <div className="rounded-xl bg-[#080B12] border border-white/15 overflow-hidden shadow-2xl font-mono text-xs">
              {/* Terminal Titlebar */}
              <div className="px-4 py-2.5 bg-[#0F1520] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
                  <span className="text-[11px] text-[var(--color-text-muted)] ml-2 font-mono">
                    build-lab://stage/{activeStageId}
                  </span>
                </div>
                <span className="text-[10px] text-[var(--color-accent-lime)]">
                  LIVE · 60 FPS
                </span>
              </div>

              {/* Code or Live Telemetry Stream */}
              <div className="p-4 sm:p-5 text-[12px] leading-relaxed text-[var(--color-text-secondary)] space-y-3 max-h-[300px] overflow-y-auto">
                {currentStage.codeSnippet ? (
                  <pre className="text-white/90 whitespace-pre-wrap font-mono text-xs">
                    <code>{currentStage.codeSnippet}</code>
                  </pre>
                ) : (
                  <div className="space-y-2">
                    <p className="text-[var(--color-accent-cyan)] font-bold">
                      &gt; scetathon-core run --stage={activeStageId}
                    </p>
                    <p className="text-white/80">
                      [INITIALIZED] Loading track parameters from SCET committee standards...
                    </p>
                    <p className="text-white/80">
                      [INFO] Synchronizing team state across 24-hour sprint pipeline.
                    </p>
                    <p className="text-[var(--color-accent-lime)]">
                      [READY] Metric validation returned optimal convergence status.
                    </p>
                    <div className="pt-2 text-[11px] text-[var(--color-text-muted)] border-t border-white/10 flex justify-between">
                      <span>STATUS: OPERATIONAL</span>
                      <span>ENV: SCET_SURAT</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};
