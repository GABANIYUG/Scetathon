"use client";

import React from "react";
import Link from "next/link";
import { useEventStatus } from "@/hooks/useEventStatus";
import { EVENT_STATUSES } from "@/config/operations";
import { EventOperationalStatus } from "@/lib/types/database";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface EventLiveBannerProps {
  initialStatus?: EventOperationalStatus;
  initialMessage?: string | null;
  className?: string;
}

export const EventLiveBanner: React.FC<EventLiveBannerProps> = ({
  initialStatus,
  initialMessage,
  className = "",
}) => {
  const { status, message, isLiveConnected } = useEventStatus({
    initialStatus,
    initialMessage,
  });

  const config = EVENT_STATUSES[status] || EVENT_STATUSES.preparing;

  // Render responsive glass operations banner
  return (
    <aside
      aria-label="Event Operations Status"
      className={cn(
        "relative overflow-hidden border-b transition-all duration-300",
        status === "live" &&
          "bg-emerald-950/40 border-emerald-500/30 shadow-[0_4px_24px_-4px_rgba(34,197,94,0.15)]",
        status === "paused" &&
          "bg-amber-950/30 border-amber-500/30 shadow-[0_4px_24px_-4px_rgba(245,158,11,0.1)]",
        status === "preparing" &&
          "bg-[#0e1322]/80 border-white/[0.08] backdrop-blur-md",
        status === "completed" &&
          "bg-white/[0.02] border-white/5",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
        {/* Left Side: Status pill & live indicator */}
        <div className="flex items-center gap-2.5 flex-wrap justify-center sm:justify-start">
          <div
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold tracking-wider uppercase border",
              status === "live" && "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
              status === "paused" && "bg-amber-500/20 text-amber-300 border-amber-500/40",
              status === "preparing" && "bg-[var(--color-accent-lime-subtle)] text-[var(--color-accent-lime)] border-[var(--color-accent-lime-border)]",
              status === "completed" && "bg-white/10 text-white/70 border-white/10"
            )}
          >
            {status === "live" && (
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            )}
            {status === "paused" && <Icons.AlertTriangle size={11} />}
            <span>{config.badgeLabel}</span>
          </div>

          <span className="text-[var(--color-text-secondary)] font-medium text-center sm:text-left truncate max-w-xl">
            {message || config.description}
          </span>
        </div>

        {/* Right Side: Quick link to updates feed & Realtime sync status */}
        <div className="flex items-center gap-3 shrink-0">
          {isLiveConnected && (
            <span
              title="Live Realtime Socket Active"
              className="text-[10px] font-mono text-emerald-400/80 flex items-center gap-1 hidden md:inline-flex"
            >
              <Icons.Activity size={12} />
              <span>LIVE SYNC</span>
            </span>
          )}

          <Link
            href="/updates"
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-accent-lime)] hover:text-white transition-colors cursor-pointer group"
          >
            <span>Live Bulletins</span>
            <Icons.ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
};

