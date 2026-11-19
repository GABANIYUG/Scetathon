"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  status: "COMPLETE" | "PENDING" | "NOT_CONFIGURED" | "AWAITING_APPROVAL";
  category: string;
}

const READINESS_CHECKLIST: ChecklistItem[] = [
  {
    id: "reg-rules",
    title: "Registration rules confirmed",
    description: "Rules, eligibility criteria, and disclaimers configured in registration config.",
    status: "COMPLETE",
    category: "Registration",
  },
  {
    id: "team-size",
    title: "Team-size requirements confirmed",
    description: "Configured team constraints: Minimum 2 members, Maximum 4 members.",
    status: "COMPLETE",
    category: "Registration",
  },
  {
    id: "tracks-approved",
    title: "Problem statements approved",
    description: "6 engineering tracks configured; formal problem statements await jury ratification.",
    status: "AWAITING_APPROVAL",
    category: "Academics",
  },
  {
    id: "schedule-approved",
    title: "Official schedule approved",
    description: "6-phase 24-hour chronological flow designed; exact milestone timings illustrative.",
    status: "AWAITING_APPROVAL",
    category: "Operations",
  },
  {
    id: "committee-confirmed",
    title: "Committee details confirmed",
    description: "4 core role groups outlined; faculty advisors and student leads roster convening.",
    status: "PENDING",
    category: "Governance",
  },
  {
    id: "venue-confirmed",
    title: "Venue information confirmed",
    description: "SCET Campus, Athwalines, Surat, Gujarat (Sarvajanik University).",
    status: "COMPLETE",
    category: "Campus",
  },
  {
    id: "backend-connected",
    title: "Registration system connected",
    description: "Production database, authentication, and team accounts require Phase 6 backend.",
    status: "NOT_CONFIGURED",
    category: "Infrastructure",
  },
];

export default function AdminOverviewPage() {
  const [filterCategory, setFilterCategory] = useState<string>("ALL");

  const statusBadge = (status: ChecklistItem["status"]) => {
    switch (status) {
      case "COMPLETE":
        return <Badge variant="success" size="sm" dot>Complete</Badge>;
      case "AWAITING_APPROVAL":
        return <Badge variant="warning" size="sm" dot>Awaiting Approval</Badge>;
      case "PENDING":
        return <Badge variant="default" size="sm" dot>Pending</Badge>;
      case "NOT_CONFIGURED":
        return <Badge variant="default" size="sm">Not Configured</Badge>;
    }
  };

  const filteredChecklist = filterCategory === "ALL"
    ? READINESS_CHECKLIST
    : READINESS_CHECKLIST.filter((item) => item.category === filterCategory);

  const completedCount = READINESS_CHECKLIST.filter((i) => i.status === "COMPLETE").length;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <AdminPageHeader
        badge="EVENT DASHBOARD"
        badgeVariant="accent"
        eyebrow="ORGANIZING COMMITTEE WORKSPACE"
        title="EVENT CONTROL CENTER"
        description="Monitor the SCETATHON event configuration and manage its operational information."
        actions={
          <div className="flex items-center gap-2">
            <Button
              href="/admin/settings"
              variant="outline"
              size="sm"
              leftIcon={<Icons.Settings size={14} />}
            >
              Event Settings
            </Button>
            <Button
              href="/admin/announcements"
              variant="primary"
              size="sm"
              leftIcon={<Icons.Plus size={14} />}
            >
              Draft Announcement
            </Button>
          </div>
        }
      />

      {/* Overview Status Cards Grid */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono uppercase tracking-wider text-[var(--color-text-muted)] text-[10px] font-semibold">
            System Status Indicators
          </span>
          <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
            Frontend Demonstration Mode
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          <AdminStatCard
            title="Registration Pipeline"
            value="Preview Mode"
            description="Client-side team formation form verified. Database connection pending Phase 6."
            statusTag="Preview Only"
            statusTone="amber"
            icon={<Icons.Briefcase size={18} />}
          />

          <AdminStatCard
            title="Challenge Tracks"
            value="6 Tracks Configured"
            description="Curated engineering tracks defined across AI, Web3, IoT, Health, FinTech, & Moonshots."
            statusTag="Provisional"
            statusTone="lime"
            icon={<Icons.Layers size={18} />}
          />

          <AdminStatCard
            title="24-Hour Schedule"
            value="6 Chronological Phases"
            description="Illustrative timeline from Check-in to Grand Finale. Awaiting jury ratification."
            statusTag="Illustrative"
            statusTone="cyan"
            icon={<Icons.Calendar size={18} />}
          />

          <AdminStatCard
            title="Announcements"
            value="Awaiting Backend Data"
            description="Announcement composer active for drafting. Live publishing requires API connection."
            statusTag="Not Connected"
            statusTone="muted"
            icon={<Icons.Megaphone size={18} />}
          />

          <AdminStatCard
            title="Committee Roster"
            value="4 Working Groups"
            description="Faculty Advisory, Technical Committee, Student Core, and Campus Operations structured."
            statusTag="Convening"
            statusTone="cyan"
            icon={<Icons.Shield size={18} />}
          />

          <AdminStatCard
            title="Host Institution"
            value="SCET Surat"
            description="Sarvajanik College of Engineering & Technology, Athwalines campus facility confirmed."
            statusTag="Confirmed"
            statusTone="lime"
            icon={<Icons.Dashboard size={18} />}
          />
        </div>
      </section>

      {/* Event Readiness Checklist */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-[var(--color-text-primary)]">
              Event Readiness Checklist
            </h2>
            <p className="text-xs text-[var(--color-text-muted)]">
              Audited preparation milestones based on verified configuration.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--color-text-muted)]">
              Completed: <strong className="text-[var(--color-accent-lime)]">{completedCount}</strong> / {READINESS_CHECKLIST.length}
            </span>
            {/* Filter buttons */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono">
              {["ALL", "Registration", "Academics", "Operations", "Infrastructure"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={cn(
                    "px-2 py-1 rounded transition-colors cursor-pointer",
                    filterCategory === cat
                      ? "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)] font-bold"
                      : "text-[var(--color-text-muted)] hover:text-white"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        <GlassPanel variant="subtle" padding="none" className="divide-y divide-white/[0.06] overflow-hidden">
          {filteredChecklist.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/[0.02] transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)] bg-white/5 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  {item.description}
                </p>
              </div>

              <div className="shrink-0 self-start sm:self-center">
                {statusBadge(item.status)}
              </div>
            </div>
          ))}
        </GlassPanel>
      </section>

      {/* Quick Actions Shortcuts */}
      <section className="space-y-3">
        <span className="font-mono uppercase tracking-wider text-[var(--color-text-muted)] text-[10px] font-semibold block">
          Operational Navigation Shortcuts
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            href="/admin/challenges"
            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[var(--color-accent-lime-border)] transition-all duration-200 group flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-lime)] transition-colors block">
                Manage Tracks
              </span>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                6 engineering domains
              </span>
            </div>
            <Icons.ChevronRight size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-lime)] transition-colors" />
          </Link>

          <Link
            href="/admin/schedule"
            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-[var(--color-accent-cyan-border)] transition-all duration-200 group flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-cyan)] transition-colors block">
                Review Schedule
              </span>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                24-hour itinerary
              </span>
            </div>
            <Icons.ChevronRight size={16} className="text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-cyan)] transition-colors" />
          </Link>

          <Link
            href="/admin/people"
            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200 group flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-white transition-colors block">
                Organizing Roster
              </span>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                Committee & mentors
              </span>
            </div>
            <Icons.ChevronRight size={16} className="text-[var(--color-text-muted)] group-hover:text-white transition-colors" />
          </Link>

          <Link
            href="/admin/settings"
            className="p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20 transition-all duration-200 group flex items-center justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-[var(--color-text-primary)] group-hover:text-white transition-colors block">
                Event Settings
              </span>
              <span className="text-[11px] text-[var(--color-text-muted)]">
                Global parameters
              </span>
            </div>
            <Icons.ChevronRight size={16} className="text-[var(--color-text-muted)] group-hover:text-white transition-colors" />
          </Link>
        </div>
      </section>
    </div>
  );
}

