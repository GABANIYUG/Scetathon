import React from "react";
import { OperationsHealthStatus, AnnouncementMetrics } from "@/lib/types/database";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface OperationsStatusCardProps {
  health: OperationsHealthStatus;
  metrics: AnnouncementMetrics;
}

export const OperationsStatusCard: React.FC<OperationsStatusCardProps> = ({ health, metrics }) => {
  const healthItems = [
    {
      name: "Database Engine",
      status: health.databaseConnected ? "Connected" : "Offline Fallback",
      isHealthy: health.databaseConnected,
      icon: Icons.Layers,
      detail: health.databaseConnected ? "PostgreSQL 15+ RLS Active" : "Local In-Memory Mode",
    },
    {
      name: "Realtime Engine",
      status: health.realtimeAvailable ? "Streaming" : "Polling Mode",
      isHealthy: health.realtimeAvailable,
      icon: Icons.Activity,
      detail: health.realtimeAvailable ? "Websocket Channels Ready" : "Manual Refresh Fallback",
    },
    {
      name: "Auth & RBAC System",
      status: health.authConfigured ? "Enforced" : "Config Pending",
      isHealthy: health.authConfigured,
      icon: Icons.Shield,
      detail: "3 Administrator Roles Defined",
    },
    {
      name: "Broadcast Engine",
      status: `${metrics.published} Published`,
      isHealthy: true,
      icon: Icons.Megaphone,
      detail: `${metrics.draft} Drafts · ${metrics.archived} Archived`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {healthItems.map((item) => (
        <GlassPanel key={item.name} variant="elevated" padding="md" edgeHighlight className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-accent-lime)]">
              <item.icon size={16} />
            </div>

            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border",
                item.isHealthy
                  ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
                  : "bg-amber-500/10 text-amber-300 border-amber-500/30"
              )}
            >
              <span
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  item.isHealthy ? "bg-emerald-400" : "bg-amber-400"
                )}
              />
              {item.status}
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono tracking-wider text-[var(--color-text-muted)] uppercase block">
              {item.name}
            </span>
            <span className="text-xs text-[var(--color-text-secondary)] font-medium">
              {item.detail}
            </span>
          </div>
        </GlassPanel>
      ))}
    </div>
  );
};

