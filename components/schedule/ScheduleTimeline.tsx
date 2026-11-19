"use client";

import React, { useState } from "react";
import { schedulePhases, scheduleVenueInfo } from "@/config/schedule";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export const ScheduleTimeline: React.FC = () => {
  const [selectedPhaseIndex, setSelectedPhaseIndex] = useState(0);
  const activePhase = schedulePhases[selectedPhaseIndex];

  return (
    <div className="space-y-12">
      {/* Horizontal Phase Selector for Desktop / Responsive Stage Tabs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-accent-lime)] animate-pulse-subtle" />
            <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent-lime)] uppercase">
              24-Hour Operational Milestones
            </span>
          </div>
          <span className="text-xs font-mono text-[var(--color-text-muted)]">
            PHASE {selectedPhaseIndex + 1} OF {schedulePhases.length}
          </span>
        </div>

        {/* Phase Buttons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {schedulePhases.map((phase, idx) => {
            const isSelected = idx === selectedPhaseIndex;

            return (
              <button
                key={phase.phase}
                onClick={() => setSelectedPhaseIndex(idx)}
                className={cn(
                  "p-3.5 rounded-xl text-left transition-all duration-200 select-none cursor-pointer border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-lime)]",
                  isSelected
                    ? "bg-[rgba(21,29,42,0.9)] border-[var(--color-accent-lime)] shadow-[0_4px_20px_-4px_rgba(183,255,90,0.3)]"
                    : "bg-[rgba(21,29,42,0.4)] border-white/10 hover:border-white/20 hover:bg-[rgba(21,29,42,0.6)]"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span
                    className={cn(
                      "text-[10px] font-mono font-bold tracking-wider",
                      isSelected ? "text-[var(--color-accent-lime)]" : "text-[var(--color-text-muted)]"
                    )}
                  >
                    {phase.hourRange}
                  </span>
                  <span
                    className={cn(
                      "w-1.5 h-1.5 rounded-full",
                      isSelected ? "bg-[var(--color-accent-lime)] shadow-[0_0_6px_#B7FF5A]" : "bg-white/15"
                    )}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs font-heading font-bold block truncate",
                    isSelected ? "text-white" : "text-[var(--color-text-secondary)]"
                  )}
                >
                  {phase.title.split(",")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Phase Detail Showcase Card */}
      <GlassPanel variant="highlight" padding="lg" className="border-white/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Phase Overview */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="accent" dot>
                {activePhase.statusTag}
              </Badge>
              <Badge variant="default">
                {activePhase.relativeTime}
              </Badge>
            </div>

            <div className="space-y-2">
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                {activePhase.title}
              </h3>
              <p className="text-body text-[var(--color-text-secondary)] leading-relaxed">
                {activePhase.shortSummary}
              </p>
            </div>

            {/* Participant Instructions Box */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
              <span className="text-[var(--color-accent-lime)] shrink-0 mt-0.5">
                <Icons.Sparkles size={18} />
              </span>
              <div>
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-accent-lime)] block mb-0.5">
                  Participant Action Required
                </span>
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
                  {activePhase.participantInstructions}
                </p>
              </div>
            </div>
          </div>

          {/* Detailed Agenda Breakdown */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-5 sm:p-6 rounded-xl bg-[rgba(8,11,18,0.7)] border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">
                  Phase Operational Agenda
                </span>
                <span className="text-[10px] font-mono text-[var(--color-accent-cyan)]">
                  {activePhase.operationalFocus}
                </span>
              </div>

              <ul className="space-y-3">
                {activePhase.detailedAgenda.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[var(--color-text-secondary)]">
                    <span className="w-4 h-4 rounded-full bg-[rgba(101,217,242,0.15)] flex items-center justify-center text-[var(--color-accent-cyan)] shrink-0 mt-0.5">
                      <Icons.Check size={10} />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Complete Vertical Chronological Timeline Overview */}
      <div className="space-y-6 pt-6">
        <div className="space-y-1">
          <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent-cyan)] uppercase block">
            Chronological Reference
          </span>
          <h3 className="font-heading font-bold text-2xl text-white">
            Full 24-Hour Sequence
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            A comprehensive overview of every stage from initial workstation check-in to final jury deliberation.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l border-white/15 space-y-8 my-6">
          {schedulePhases.map((phase, idx) => {
            const isCurrent = idx === selectedPhaseIndex;

            return (
              <div
                key={phase.phase}
                className={cn(
                  "relative group cursor-pointer transition-all duration-200",
                  isCurrent ? "opacity-100" : "opacity-80 hover:opacity-100"
                )}
                onClick={() => setSelectedPhaseIndex(idx)}
              >
                {/* Timeline Node Bullet */}
                <span
                  className={cn(
                    "absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-200",
                    isCurrent
                      ? "bg-[var(--color-accent-lime)] border-[var(--color-bg-primary)] shadow-[0_0_12px_#B7FF5A] scale-125"
                      : "bg-[#151D2A] border-white/30 group-hover:border-[var(--color-accent-lime)]"
                  )}
                />

                <GlassPanel
                  variant={isCurrent ? "highlight" : "elevated"}
                  padding="md"
                  className={cn(
                    "transition-all",
                    isCurrent ? "border-[var(--color-accent-lime)]/40" : "hover:border-white/20"
                  )}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-[var(--color-accent-lime)]">
                        {phase.hourRange}
                      </span>
                      <span className="text-xs font-mono text-[var(--color-text-muted)]">
                        ({phase.relativeTime})
                      </span>
                    </div>
                    <Badge variant="default" size="sm">
                      {phase.phase}
                    </Badge>
                  </div>

                  <h4 className="font-heading font-bold text-lg text-white mb-2">
                    {phase.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {phase.shortSummary}
                  </p>
                </GlassPanel>
              </div>
            );
          })}
        </div>
      </div>

      {/* Campus Venue & Facility Details */}
      <GlassPanel variant="subtle" padding="lg" className="border-white/15">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent-cyan)] uppercase block">
              Official Venue & Facilities
            </span>
            <h3 className="font-heading font-bold text-2xl text-white">
              {scheduleVenueInfo.campus}
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)]">
              {scheduleVenueInfo.location} · {scheduleVenueInfo.venue}
            </p>
            <p className="text-xs font-mono text-[var(--color-text-muted)] pt-2">
              {scheduleVenueInfo.datesNotice}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-2.5">
            <span className="text-[10px] font-mono font-bold text-white uppercase block mb-1">
              Confirmed Campus Infrastructure
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {scheduleVenueInfo.facilities.map((facility, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-[var(--color-text-secondary)]">
                  <Icons.Check size={14} className="text-[var(--color-accent-lime)] shrink-0 mt-0.5" />
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};
