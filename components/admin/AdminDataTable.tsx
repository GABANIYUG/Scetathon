"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AdminEmptyState } from "./AdminEmptyState";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface AdminDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (item: T) => string | number;
  emptyState?: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    technicalNote?: string;
  };
  className?: string;
}

export function AdminDataTable<T>({
  columns,
  data,
  keyExtractor,
  emptyState,
  className,
}: AdminDataTableProps<T>) {
  if (data.length === 0 && emptyState) {
    return (
      <AdminEmptyState
        title={emptyState.title}
        description={emptyState.description}
        icon={emptyState.icon}
        technicalNote={emptyState.technicalNote}
      />
    );
  }

  return (
    <div className={cn("w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]", className)}>
      <div className="overflow-x-auto scrollbar-none">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.03]">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "py-3.5 px-4 font-mono font-semibold uppercase tracking-wider text-[11px] text-[var(--color-text-muted)]",
                    col.headerClassName
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.06]">
            {data.map((item) => (
              <tr
                key={keyExtractor(item)}
                className="hover:bg-white/[0.025] transition-colors duration-150 text-[var(--color-text-secondary)]"
              >
                {columns.map((col) => (
                  <td key={col.key} className={cn("py-3.5 px-4", col.className)}>
                    {col.render ? col.render(item) : (item as Record<string, unknown>)[col.key] as React.ReactNode}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

