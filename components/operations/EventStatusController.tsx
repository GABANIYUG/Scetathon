"use client";

import React, { useState } from "react";
import { EventOperationalStatus, EventSettings } from "@/lib/types/database";
import { EVENT_STATUSES } from "@/config/operations";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface EventStatusControllerProps {
  initialSettings: EventSettings;
  onStatusUpdated?: (newSettings: EventSettings) => void;
}

export const EventStatusController: React.FC<EventStatusControllerProps> = ({
  initialSettings,
  onStatusUpdated,
}) => {
  const [currentStatus, setCurrentStatus] = useState<EventOperationalStatus>(
    initialSettings.event_status || "preparing"
  );
  const [selectedStatus, setSelectedStatus] = useState<EventOperationalStatus>(
    initialSettings.event_status || "preparing"
  );
  const [statusMessage, setStatusMessage] = useState<string>(
    initialSettings.public_status_message || ""
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleUpdate = async () => {
    setIsUpdating(true);
    setFeedback(null);

    try {
      const res = await fetch("/api/admin/operations/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: selectedStatus,
          message: statusMessage.trim(),
        }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setFeedback({
          type: "error",
          text: json.error || "Failed to update event operational status.",
        });
        setIsUpdating(false);
        return;
      }

      setCurrentStatus(selectedStatus);
      setFeedback({
        type: "success",
        text: `Event operational status successfully transitioned to "${EVENT_STATUSES[selectedStatus].label}". Audit log recorded.`,
      });

      if (onStatusUpdated && json.data) {
        onStatusUpdated(json.data);
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Network or database connection error while saving event status.",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <GlassPanel variant="elevated" padding="lg" edgeHighlight className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent-lime)] uppercase block">
            LIVE DISPATCH CONTROL
          </span>
          <h2 className="text-base sm:text-lg font-bold text-white">Event Operational State</h2>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-[var(--color-text-muted)] uppercase">Active State:</span>
          <span
            className={cn(
              "px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold tracking-wider uppercase border",
              currentStatus === "live" && "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
              currentStatus === "paused" && "bg-amber-500/20 text-amber-300 border-amber-500/40",
              currentStatus === "preparing" && "bg-[var(--color-accent-lime-subtle)] text-[var(--color-accent-lime)] border-[var(--color-accent-lime-border)]",
              currentStatus === "completed" && "bg-white/10 text-white/70 border-white/10"
            )}
          >
            {EVENT_STATUSES[currentStatus].label}
          </span>
        </div>
      </div>

      {feedback && (
        <div
          role="alert"
          className={cn(
            "p-3.5 rounded-xl text-xs flex items-center gap-2",
            feedback.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border border-red-500/30 text-red-400"
          )}
        >
          {feedback.type === "success" ? <Icons.CheckCircle size={16} /> : <Icons.AlertTriangle size={16} />}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* State Selector Buttons */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
          Select Operational Phase
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {(["preparing", "live", "paused", "completed"] as const).map((key) => {
            const item = EVENT_STATUSES[key];
            const isSelected = selectedStatus === key;
            const isCurrent = currentStatus === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedStatus(key)}
                className={cn(
                  "p-3.5 rounded-xl border text-left transition-all cursor-pointer relative",
                  isSelected
                    ? "bg-white/[0.08] border-[var(--color-accent-lime)] shadow-[0_0_20px_-4px_rgba(183,255,90,0.25)]"
                    : "bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]"
                )}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-white">{item.label}</span>
                  {isCurrent && (
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--color-accent-lime)] text-black">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Public Status Message Input */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
            Public Operational Message (Live Banner Banner Display)
          </label>
          <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
            Displayed on Homepage & Participant Portal
          </span>
        </div>
        <input
          type="text"
          value={statusMessage}
          onChange={(e) => setStatusMessage(e.target.value)}
          placeholder="e.g. SCETATHON is currently underway! Mentor rotations for Checkpoint 1 active."
          className="glass-input w-full h-11 px-4 text-xs sm:text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none"
        />
      </div>

      {/* Submit Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/[0.08]">
        <p className="text-[11px] text-[var(--color-text-muted)]">
          Requires Faculty Administrator authorization. Updates propagate to all connected clients immediately.
        </p>

        <Button
          type="button"
          variant="primary"
          size="md"
          disabled={isUpdating || (selectedStatus === currentStatus && statusMessage === (initialSettings.public_status_message || ""))}
          onClick={handleUpdate}
          className="glow-lime shrink-0"
        >
          <Icons.Radio size={15} className="mr-1.5" />
          <span>{isUpdating ? "Broadcasting..." : "Commit Status Change"}</span>
        </Button>
      </div>
    </GlassPanel>
  );
};

