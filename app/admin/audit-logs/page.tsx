import React from "react";
import { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { getAuditLogs } from "@/lib/dal/operations";

export const metadata: Metadata = {
  title: "Audit Logs & System Trail | Admin Control Center",
  description: "Immutable operational audit records, status changes, and administrator mutations.",
};

export default async function AdminAuditLogsPage() {
  const logs = await getAuditLogs();

  return (
    <div className="space-y-8">
      <AdminPageHeader
        badge="SYSTEM INTEGRITY"
        badgeVariant="accent"
        eyebrow="IMMUTABLE SECURITY LOGS"
        title="Audit Logs & Activity Trail"
        description="Chronological record of operational changes, status transitions, announcement publications, and administrative mutations."
      />

      <GlassPanel variant="elevated" padding="lg" edgeHighlight className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <h2 className="text-base font-bold text-white">System Events ({logs.length})</h2>
            <p className="text-xs text-[var(--color-text-secondary)]">
              All entries are tamper-resistant and recorded via PostgreSQL server-side triggers.
            </p>
          </div>
          <Badge variant="accent" size="sm">
            IMMUTABLE
          </Badge>
        </div>

        <div className="space-y-3">
          {logs.map((log) => {
            const dateStr = new Date(log.created_at).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "numeric",
              minute: "2-digit",
              second: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={log.id}
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all space-y-2 text-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[var(--color-accent-lime)] px-2 py-0.5 rounded bg-[var(--color-accent-lime-subtle)] border border-[var(--color-accent-lime-border)] text-[10px]">
                      {log.action}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--color-text-muted)] uppercase">
                      Target: <span className="text-white">{log.entity_type}</span> ({log.entity_id})
                    </span>
                  </div>

                  <span className="font-mono text-[11px] text-[var(--color-text-muted)]">{dateStr}</span>
                </div>

                {log.metadata && Object.keys(log.metadata).length > 0 && (
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono text-[11px] text-[var(--color-text-secondary)] overflow-x-auto">
                    <code>{JSON.stringify(log.metadata, null, 2)}</code>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </GlassPanel>
    </div>
  );
}
