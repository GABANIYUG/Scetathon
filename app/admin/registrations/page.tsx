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

export interface RegistrationRecord {
  id: string;
  teamName: string;
  institution: string;
  leaderName: string;
  leaderEmail: string;
  teamSize: number;
  status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "WAITLISTED";
  submittedAt: string;
}

const STATUS_FILTERS = [
  { id: "ALL", label: "All Records", count: 0 },
  { id: "SUBMITTED", label: "Submitted", count: 0 },
  { id: "UNDER_REVIEW", label: "Under Review", count: 0 },
  { id: "APPROVED", label: "Approved", count: 0 },
  { id: "WAITLISTED", label: "Waitlisted", count: 0 },
  { id: "REJECTED", label: "Rejected", count: 0 },
];

export default function AdminRegistrationsPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<RegistrationRecord | null>(null);

  // In this phase, no real or fake applications exist. Data is empty.
  const records: RegistrationRecord[] = [];

  const columns: Column<RegistrationRecord>[] = [
    {
      key: "id",
      header: "Reg ID",
      render: (item) => (
        <span className="font-mono text-xs text-[var(--color-accent-lime)]">
          {item.id}
        </span>
      ),
    },
    {
      key: "teamName",
      header: "Team Name",
      render: (item) => (
        <span className="font-semibold text-[var(--color-text-primary)]">
          {item.teamName}
        </span>
      ),
    },
    {
      key: "institution",
      header: "Institution",
      render: (item) => (
        <span className="text-[var(--color-text-secondary)] truncate max-w-[180px] block">
          {item.institution}
        </span>
      ),
    },
    {
      key: "leaderName",
      header: "Team Leader",
      render: (item) => (
        <div>
          <p className="font-medium text-[var(--color-text-primary)]">{item.leaderName}</p>
          <p className="text-[10px] text-[var(--color-text-muted)] font-mono">{item.leaderEmail}</p>
        </div>
      ),
    },
    {
      key: "teamSize",
      header: "Size",
      render: (item) => (
        <span className="font-mono text-xs">{item.teamSize} pax</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (item) => {
        const variants: Record<RegistrationRecord["status"], "default" | "accent" | "success" | "warning"> = {
          SUBMITTED: "default",
          UNDER_REVIEW: "warning",
          APPROVED: "success",
          WAITLISTED: "accent",
          REJECTED: "default",
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
            setSelectedRecord(item);
            setIsDrawerOpen(true);
          }}
          className="text-xs font-medium text-[var(--color-accent-lime)] hover:underline cursor-pointer"
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        badge="REGISTRATION REGISTRY"
        badgeVariant="accent"
        eyebrow="ADMISSIONS & VERIFICATION"
        title="Registration Management"
        description="Inspect submitted team applications, verify collegiate eligibility, and manage admission statuses."
      />

      {/* Control Bar: Search & Status Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <AdminFilterBar
          options={STATUS_FILTERS}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <AdminSearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by team or college…"
        />
      </div>

      {/* Main Data Table with Empty State */}
      <AdminDataTable
        columns={columns}
        data={records}
        keyExtractor={(item) => item.id}
        emptyState={{
          title: "No registration records are connected yet.",
          description:
            "This table is architected to display incoming team applications once the Phase 6 backend and database pipeline are connected. No simulated or mock applicant records are generated in client memory.",
          icon: <Icons.Briefcase size={28} />,
          technicalNote: "Database Connection: Inactive // Phase 6 Integration Milestone",
        }}
      />

      {/* Application Detail Drawer (Prepared for future records) */}
      <AdminDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={selectedRecord?.teamName || "Application Details"}
        subtitle={selectedRecord ? `Registration ID: ${selectedRecord.id}` : undefined}
        badge={selectedRecord?.status}
        footer={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsDrawerOpen(false)}>
              Close Panel
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              title="Backend database required to modify admission status"
            >
              Action Disabled (No DB)
            </Button>
          </div>
        }
      >
        {selectedRecord ? (
          <div className="space-y-4 text-xs text-[var(--color-text-secondary)]">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">
                Institution
              </span>
              <p className="font-semibold text-sm text-[var(--color-text-primary)]">
                {selectedRecord.institution}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">
                Leader Contact
              </span>
              <p className="font-semibold text-sm text-[var(--color-text-primary)]">
                {selectedRecord.leaderName}
              </p>
              <p className="font-mono">{selectedRecord.leaderEmail}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-[var(--color-text-muted)]">
            No application data selected.
          </div>
        )}
      </AdminDetailDrawer>
    </div>
  );
}

