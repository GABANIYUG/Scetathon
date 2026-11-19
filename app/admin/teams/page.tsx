"use client";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminFilterBar } from "@/components/admin/AdminFilterBar";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { AdminDataTable, Column } from "@/components/admin/AdminDataTable";
import { AdminDetailDrawer } from "@/components/admin/AdminDetailDrawer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";

export interface TeamMemberRecord {
  id: string;
  name: string;
  role: string;
  email: string;
}

export interface TeamRecord {
  id: string;
  teamName: string;
  college: string;
  city: string;
  leaderName: string;
  leaderEmail: string;
  members: TeamMemberRecord[];
  assignedTrack?: string;
  status: "CONFIRMED" | "FORMATION_INCOMPLETE" | "DISQUALIFIED" | "WITHDRAWN";
}

const TEAM_STATUS_FILTERS = [
  { id: "ALL", label: "All Teams", count: 0 },
  { id: "CONFIRMED", label: "Confirmed Roster", count: 0 },
  { id: "FORMATION_INCOMPLETE", label: "Incomplete Roster", count: 0 },
  { id: "WITHDRAWN", label: "Withdrawn", count: 0 },
];

export default function AdminTeamsPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamRecord | null>(null);

  // In this phase, no real or fake teams exist.
  const teams: TeamRecord[] = [];

  const columns: Column<TeamRecord>[] = [
    {
      key: "teamName",
      header: "Team Name",
      render: (item) => (
        <div>
          <span className="font-semibold text-sm text-[var(--color-text-primary)] block">
            {item.teamName}
          </span>
          <span className="text-[10px] font-mono text-[var(--color-accent-lime)]">
            ID: {item.id}
          </span>
        </div>
      ),
    },
    {
      key: "college",
      header: "College & City",
      render: (item) => (
        <div>
          <p className="font-medium text-[var(--color-text-primary)]">{item.college}</p>
          <p className="text-[10px] text-[var(--color-text-muted)]">{item.city}</p>
        </div>
      ),
    },
    {
      key: "leader",
      header: "Team Leader",
      render: (item) => (
        <div>
          <p className="font-medium text-[var(--color-text-primary)]">{item.leaderName}</p>
          <p className="text-[10px] text-[var(--color-text-muted)] font-mono">{item.leaderEmail}</p>
        </div>
      ),
    },
    {
      key: "members",
      header: "Roster Size",
      render: (item) => (
        <span className="font-mono text-xs text-[var(--color-text-secondary)]">
          {item.members.length + 1} pax
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => {
        const variants: Record<TeamRecord["status"], "default" | "accent" | "success" | "warning"> = {
          CONFIRMED: "success",
          FORMATION_INCOMPLETE: "warning",
          DISQUALIFIED: "default",
          WITHDRAWN: "default",
        };
        return (
          <Badge variant={variants[item.status]} size="sm" dot>
            {item.status.replace("_", " ")}
          </Badge>
        );
      },
    },
    {
      key: "actions",
      header: "Action",
      render: (item) => (
        <button
          onClick={() => {
            setSelectedTeam(item);
            setIsDrawerOpen(true);
          }}
          className="text-xs font-medium text-[var(--color-accent-lime)] hover:underline cursor-pointer"
        >
          View Roster
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        badge="ROSTER DIRECTORY"
        badgeVariant="accent"
        eyebrow="TEAM FORMATION & LOGISTICS"
        title="Team Directory"
        description="Inspect validated collegiate squads, track assignments, and workstation allocations for SCETATHON."
      />

      {/* Control Bar: Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <AdminFilterBar
          options={TEAM_STATUS_FILTERS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <AdminSearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by team, college or city…"
        />
      </div>

      {/* Main Data Table with Empty State */}
      <AdminDataTable
        columns={columns}
        data={teams}
        keyExtractor={(item) => item.id}
        emptyState={{
          title: "No team records are connected yet.",
          description:
            "Organizer squad allocations, bench rosters, and check-in verifications will automatically populate here once the production registration database is online. Simulated profiles are disabled to maintain data privacy.",
          icon: <Icons.Users size={28} />,
          technicalNote: "Team Directory Service: Offline // Phase 6 Integration Milestone",
        }}
      />

      {/* Team Detail Drawer */}
      <AdminDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedTeam?.teamName || "Team Roster"}
        subtitle={selectedTeam ? `${selectedTeam.college} • ${selectedTeam.city}` : undefined}
        badge={selectedTeam?.status}
        footer={
          <Button variant="ghost" size="sm" onClick={() => setIsDrawerOpen(false)}>
            Close Roster
          </Button>
        }
      >
        {selectedTeam ? (
          <div className="space-y-4 text-xs text-[var(--color-text-secondary)]">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">
                Assigned Track
              </span>
              <p className="font-semibold text-sm text-[var(--color-text-primary)]">
                {selectedTeam.assignedTrack || "Unassigned"}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-[var(--color-text-muted)]">
            No team selected.
          </div>
        )}
      </AdminDetailDrawer>
    </div>
  );
}

