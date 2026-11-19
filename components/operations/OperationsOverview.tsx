"use client";

import React, { useState } from "react";
import Link from "next/link";
import { EventSettings, Announcement, OperationsHealthStatus, AnnouncementMetrics } from "@/lib/types/database";
import { EventStatusController } from "./EventStatusController";
import { OperationsStatusCard } from "./OperationsStatusCard";
import { AnnouncementCard } from "@/components/announcements/AnnouncementCard";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";

interface OperationsOverviewProps {
  initialSettings: EventSettings;
  health: OperationsHealthStatus;
  metrics: AnnouncementMetrics;
  recentAnnouncements: Announcement[];
}

export const OperationsOverview: React.FC<OperationsOverviewProps> = ({
  initialSettings,
  health,
  metrics,
  recentAnnouncements,
}) => {
  const [settings, setSettings] = useState<EventSettings>(initialSettings);

  return (
    <div className="space-y-8">
      {/* Operations Readiness & Health Grid */}
      <OperationsStatusCard health={health} metrics={metrics} />

      {/* Main Event Status Controller */}
      <EventStatusController
        initialSettings={settings}
        onStatusUpdated={(updated) => setSettings(updated)}
      />

      {/* Broadcast Summary & Recent Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Broadcast Engine Breakdown */}
        <div className="lg:col-span-5 space-y-4">
          <GlassPanel variant="elevated" padding="lg" edgeHighlight className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent-lime)] uppercase block">
                  AUDIENCE SEGMENTATION
                </span>
                <h3 className="text-sm font-bold text-white">Broadcast Channels</h3>
              </div>
              <Badge variant="accent" size="sm">
                3 TARGETS
              </Badge>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Public Website Channel</span>
                  <span className="text-[11px] text-[var(--color-text-muted)]">Homepage & /updates feed</span>
                </div>
                <span className="text-xs font-mono font-bold text-[var(--color-accent-lime)]">
                  {metrics.publicCount} Bulletins
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Registered Squads Channel</span>
                  <span className="text-[11px] text-[var(--color-text-muted)]">Dashboard notification drawer</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {metrics.teamsCount} Bulletins
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Internal Committee Channel</span>
                  <span className="text-[11px] text-[var(--color-text-muted)]">Organizers & Technical Leads only</span>
                </div>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {metrics.committeeCount} Bulletins
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-white/[0.06]">
              <span className="text-[11px] text-[var(--color-text-muted)]">
                Most recent publication:
              </span>
              <span className="text-[11px] font-mono text-white">
                {metrics.lastPublishedAt
                  ? new Date(metrics.lastPublishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })
                  : "None recorded"}
              </span>
            </div>

            <div className="pt-2">
              <Link
                href="/admin/announcements"
                className="w-full py-2.5 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.06] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Icons.Megaphone size={14} className="text-[var(--color-accent-lime)]" />
                <span>Open Announcement Studio</span>
              </Link>
            </div>
          </GlassPanel>
        </div>

        {/* Right: Recent Broadcasts Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent-lime)] uppercase block">
                ACTIVITY FEED
              </span>
              <h3 className="text-base font-bold text-white">Live Dispatched Announcements</h3>
            </div>
            <Link
              href="/admin/announcements"
              className="text-xs font-semibold text-[var(--color-accent-lime)] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Manage all ({metrics.total})</span>
              <Icons.ArrowRight size={13} />
            </Link>
          </div>

          <div className="space-y-3">
            {recentAnnouncements.length > 0 ? (
              recentAnnouncements.slice(0, 3).map((item) => (
                <AnnouncementCard key={item.id} announcement={item} showAudience />
              ))
            ) : (
              <div className="p-8 text-center rounded-2xl border border-dashed border-white/10 text-xs text-[var(--color-text-muted)]">
                No active announcements currently registered.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

