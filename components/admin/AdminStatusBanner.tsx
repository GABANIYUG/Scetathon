"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";

export const AdminStatusBanner: React.FC = () => {
  return (
    <div
      role="alert"
      className="w-full bg-[rgba(245,158,11,0.08)] border-b border-[rgba(245,158,11,0.25)] text-amber-200/90 text-xs py-2.5 px-4 sm:px-6 relative z-20 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <span className="p-1 rounded bg-amber-500/20 text-amber-400 shrink-0">
            <Icons.AlertTriangle size={14} />
          </span>
          <span className="font-medium text-amber-100">
            <strong>ADMIN PREVIEW MODE</strong> — This interface is not secured and is not connected to production event data.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="warning" size="sm" dot>
            CLIENT DEMO
          </Badge>
          <span className="text-[11px] font-mono text-amber-300/70 hidden md:inline">
            Phase 5 Frontend Preview // No DB Connection
          </span>
        </div>
      </div>
    </div>
  );
};

