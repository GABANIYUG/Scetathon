"use client";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminFilterBar } from "@/components/admin/AdminFilterBar";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { AdminDetailDrawer } from "@/components/admin/AdminDetailDrawer";
import { AdminConfirmationDialog } from "@/components/admin/AdminConfirmationDialog";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { aboutConfig } from "@/config/about";

export type StakeholderCategory =
  | "Faculty Coordinators"
  | "Student Organizers"
  | "Technical Committee"
  | "Campus Operations"
  | "Mentors"
  | "Judges"
  | "Sponsors & Partners";

export interface StakeholderEntry {
  id: string;
  category: StakeholderCategory;
  roleTitle: string;
  departmentOrOrg: string;
  responsibilityScope: string;
  statusText: string;
  isDraft?: boolean;
}

const INITIAL_PEOPLE_DATA: StakeholderEntry[] = [
  {
    id: "fac-1",
    category: "Faculty Coordinators",
    roleTitle: "Faculty Advisory Lead",
    departmentOrOrg: "Computer Engineering & IT Departments",
    responsibilityScope: "Academic oversight, institutional governance, and examination cell coordination.",
    statusText: "Convened by Department Heads // Official Roster Under Publication",
  },
  {
    id: "tech-1",
    category: "Technical Committee",
    roleTitle: "Track Design & Code Audit Lead",
    departmentOrOrg: "Technical Review Board",
    responsibilityScope: "Challenge track design, feasibility criteria formulation, and evaluation rubrics.",
    statusText: "Industry & Academic Evaluators Being Confirmed",
  },
  {
    id: "stud-1",
    category: "Student Organizers",
    roleTitle: "Student Steering Lead",
    departmentOrOrg: "SCET Student Developer Community",
    responsibilityScope: "Developer relations, platform operations, track logistics, and team onboarding.",
    statusText: "Student Steering Committee Active",
  },
  {
    id: "ops-1",
    category: "Campus Operations",
    roleTitle: "24H Facility & Logistics Lead",
    departmentOrOrg: "Campus Infrastructure Squad",
    responsibilityScope: "Workstation power infrastructure, 24-hour campus security, and medical response desk.",
    statusText: "Volunteer Enlistment Opening with Registration",
  },
  {
    id: "mentor-1",
    category: "Mentors",
    roleTitle: "Engineering Mentor (General)",
    departmentOrOrg: "Alumni & Industry Partners Network",
    responsibilityScope: "Technical guidance on systems architecture, debugging, and feasibility during the 24H sprint.",
    statusText: "Provisional Mentor Call Inactive",
  },
  {
    id: "judge-1",
    category: "Judges",
    roleTitle: "Jury Evaluator",
    departmentOrOrg: "Academic & Tech Industry Delegation",
    responsibilityScope: "Final pitch evaluation, code verification, and category award scoring.",
    statusText: "Jury Panel Ratified at Event Kickoff",
  },
  {
    id: "sponsor-1",
    category: "Sponsors & Partners",
    roleTitle: "Technology & Community Partner",
    departmentOrOrg: "Industry Collaborators",
    responsibilityScope: "API toolchain credits, developer swag, and technical workshop support.",
    statusText: "Official Partner Dossier Under Review",
  },
];

const CATEGORIES: { id: string; label: string }[] = [
  { id: "ALL", label: "All Groups" },
  { id: "Faculty Coordinators", label: "Faculty" },
  { id: "Student Organizers", label: "Students" },
  { id: "Technical Committee", label: "Technical Jury" },
  { id: "Campus Operations", label: "Operations" },
  { id: "Mentors", label: "Mentors" },
  { id: "Judges", label: "Judges" },
  { id: "Sponsors & Partners", label: "Partners" },
];

export default function AdminPeoplePage() {
  const [entries, setEntries] = useState<StakeholderEntry[]>(INITIAL_PEOPLE_DATA);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<StakeholderEntry | null>(null);
  const [editForm, setEditForm] = useState<StakeholderEntry | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const filteredEntries = entries.filter((item) => {
    const matchesCat = activeCategory === "ALL" || item.category === activeCategory;
    const matchesSearch =
      item.roleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.departmentOrOrg.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.responsibilityScope.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleOpenEdit = (entry: StakeholderEntry) => {
    setSelectedEntry(entry);
    setEditForm({ ...entry });
    setIsEditing(true);
    setIsDrawerOpen(true);
  };

  const handleAddDraft = () => {
    const newEntry: StakeholderEntry = {
      id: `draft-person-${Date.now()}`,
      category: activeCategory === "ALL" ? "Student Organizers" : (activeCategory as StakeholderCategory),
      roleTitle: "New Stakeholder Role (Draft)",
      departmentOrOrg: "SCET Working Group",
      responsibilityScope: "Scope of responsibilities and coordination tasks.",
      statusText: "Draft Role // Local Preview",
      isDraft: true,
    };
    setSelectedEntry(newEntry);
    setEditForm(newEntry);
    setIsEditing(true);
    setIsDrawerOpen(true);
  };

  const handleSaveDraft = () => {
    if (!editForm) return;
    const exists = entries.some((e) => e.id === editForm.id);
    const updated = exists
      ? entries.map((e) => (e.id === editForm.id ? { ...editForm, isDraft: true } : e))
      : [editForm, ...entries];
    setEntries(updated);
    setSelectedEntry(editForm);
    setIsEditing(false);
  };

  const handleResetToConfig = () => {
    setEntries(INITIAL_PEOPLE_DATA);
    setIsResetConfirmOpen(false);
    setIsDrawerOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        badge="STAKEHOLDER DIRECTORY"
        badgeVariant="accent"
        eyebrow="GOVERNANCE & COMMUNITY"
        title="People, Sponsors & Committee"
        description="Organize committee working groups, evaluate mentor rosters, and stage partner placeholders."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResetConfirmOpen(true)}
              leftIcon={<Icons.RotateCcw size={14} />}
            >
              Reset to Config
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddDraft}
              leftIcon={<Icons.Plus size={14} />}
            >
              Add Role Entry
            </Button>
          </div>
        }
      />

      {/* Safety Notice Banner */}
      <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs text-[var(--color-text-secondary)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icons.Info size={15} className="text-[var(--color-accent-lime)] shrink-0" />
          <span>
            <strong>Institutional Privacy Guarantee</strong> — In accordance with event policy, individual personal names, photos, and credentials are omitted until official publication. Generic working group representations are maintained.
          </span>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <AdminFilterBar
          options={CATEGORIES.map((c) => ({
            id: c.id,
            label: c.label,
            count: c.id === "ALL" ? entries.length : entries.filter((e) => e.category === c.id).length,
          }))}
          activeFilter={activeCategory}
          onFilterChange={setActiveCategory}
        />

        <AdminSearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search by role or department…"
        />
      </div>

      {/* Stakeholder Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredEntries.map((entry) => (
          <GlassPanel
            key={entry.id}
            variant="elevated"
            padding="md"
            className="flex flex-col justify-between space-y-4 hover:border-white/20 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-accent-lime)] bg-white/5 px-2 py-0.5 rounded">
                  {entry.category}
                </span>
                {entry.isDraft && (
                  <Badge variant="warning" size="sm">
                    Draft Entry
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-[var(--color-text-primary)]">
                  {entry.roleTitle}
                </h3>
                <p className="text-xs text-[var(--color-accent-cyan)] font-mono mt-0.5">
                  {entry.departmentOrOrg}
                </p>
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                {entry.responsibilityScope}
              </p>

              <div className="pt-2 border-t border-white/[0.06] text-[11px] font-mono text-[var(--color-text-muted)]">
                {entry.statusText}
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setSelectedEntry(entry);
                  setIsEditing(false);
                  setIsDrawerOpen(true);
                }}
                className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Icons.Eye size={13} />
                Inspect
              </button>

              <button
                onClick={() => handleOpenEdit(entry)}
                className="text-xs font-semibold text-[var(--color-accent-lime)] hover:text-[var(--color-accent-lime-hover)] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Icons.Edit size={13} />
                Edit
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Detail / Edit Drawer */}
      <AdminDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={isEditing ? "Edit Role Entry" : selectedEntry?.roleTitle || "Stakeholder Scope"}
        subtitle={selectedEntry ? `${selectedEntry.category} • ${selectedEntry.departmentOrOrg}` : undefined}
        badge={selectedEntry?.category}
        footer={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            {isEditing ? (
              <Button variant="primary" size="sm" onClick={handleSaveDraft}>
                Save Local Entry
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (selectedEntry) handleOpenEdit(selectedEntry);
                }}
              >
                Edit Role
              </Button>
            )}
          </div>
        }
      >
        {isEditing && editForm ? (
          <div className="space-y-4">
            <AdminFormField label="Role Title" id="person-title" required>
              <input
                id="person-title"
                type="text"
                value={editForm.roleTitle}
                onChange={(e) => setEditForm({ ...editForm, roleTitle: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <AdminFormField label="Category Group" id="person-cat" required>
              <select
                id="person-cat"
                value={editForm.category}
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    category: e.target.value as StakeholderCategory,
                  })
                }
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              >
                <option value="Faculty Coordinators">Faculty Coordinators</option>
                <option value="Student Organizers">Student Organizers</option>
                <option value="Technical Committee">Technical Committee</option>
                <option value="Campus Operations">Campus Operations</option>
                <option value="Mentors">Mentors</option>
                <option value="Judges">Judges</option>
                <option value="Sponsors & Partners">Sponsors & Partners</option>
              </select>
            </AdminFormField>

            <AdminFormField label="Department / Organization" id="person-dept" required>
              <input
                id="person-dept"
                type="text"
                value={editForm.departmentOrOrg}
                onChange={(e) => setEditForm({ ...editForm, departmentOrOrg: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <AdminFormField label="Responsibility Scope" id="person-scope" required>
              <textarea
                id="person-scope"
                rows={3}
                value={editForm.responsibilityScope}
                onChange={(e) => setEditForm({ ...editForm, responsibilityScope: e.target.value })}
                className="glass-input w-full p-3 text-xs rounded-xl resize-none"
              />
            </AdminFormField>

            <AdminFormField label="Status Text" id="person-status">
              <input
                id="person-status"
                type="text"
                value={editForm.statusText}
                onChange={(e) => setEditForm({ ...editForm, statusText: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>
          </div>
        ) : selectedEntry ? (
          <div className="space-y-4 text-xs text-[var(--color-text-secondary)]">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">
                Organization / Body
              </span>
              <p className="font-semibold text-sm text-[var(--color-text-primary)]">
                {selectedEntry.departmentOrOrg}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">
                Responsibility Scope
              </span>
              <p className="leading-relaxed">{selectedEntry.responsibilityScope}</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">
                Status Rationale
              </span>
              <p className="font-mono text-[11px] text-[var(--color-accent-cyan)]">
                {selectedEntry.statusText}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] text-[var(--color-text-muted)] font-mono">
              Note: {aboutConfig.committeeNotice}
            </div>
          </div>
        ) : null}
      </AdminDetailDrawer>

      {/* Confirmation Dialog for Reset */}
      <AdminConfirmationDialog
        isOpen={isResetConfirmOpen}
        title="Reset Committee & Stakeholders?"
        message="This will discard all client-side draft roles and reload the default committee structure from config/about.ts."
        confirmLabel="Reset Roster"
        onConfirm={handleResetToConfig}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}

