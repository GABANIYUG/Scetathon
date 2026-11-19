"use client";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminFilterBar } from "@/components/admin/AdminFilterBar";
import { AdminSearchInput } from "@/components/admin/AdminSearchInput";
import { AdminDetailDrawer } from "@/components/admin/AdminDetailDrawer";
import { AdminConfirmationDialog } from "@/components/admin/AdminConfirmationDialog";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminContentPreview } from "@/components/admin/AdminContentPreview";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { challengeTracks as initialTracks, ChallengeTrack } from "@/config/tracks";

export type TrackApprovalStatus = "DRAFT" | "AWAITING_APPROVAL" | "APPROVED" | "PUBLISHED";

export interface EditableTrack extends ChallengeTrack {
  approvalStatus: TrackApprovalStatus;
  isModified?: boolean;
}

export default function AdminChallengesPage() {
  const [tracks, setTracks] = useState<EditableTrack[]>(() =>
    initialTracks.map((t) => ({
      ...t,
      approvalStatus: t.status === "RATIFIED" ? "APPROVED" : "AWAITING_APPROVAL",
      isModified: false,
    }))
  );

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<EditableTrack | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [hasChangesNotice, setHasChangesNotice] = useState(false);

  // Edit form state
  const [editForm, setEditForm] = useState<EditableTrack | null>(null);

  const categories = [
    { id: "ALL", label: "All Tracks", count: tracks.length },
    { id: "Artificial Intelligence", label: "AI & Agents", count: tracks.filter((t) => t.category.includes("Artificial Intelligence")).length },
    { id: "Security & Protocols", label: "Security & Web3", count: tracks.filter((t) => t.category.includes("Security") || t.category.includes("Web3")).length },
    { id: "IoT & Smart Systems", label: "Smart IoT", count: tracks.filter((t) => t.category.includes("IoT")).length },
    { id: "Assistive Tech", label: "Healthcare", count: tracks.filter((t) => t.category.includes("Assistive")).length },
    { id: "Open Track", label: "Moonshots", count: tracks.filter((t) => t.category.includes("Open")).length },
    { id: "Digital Commerce", label: "FinTech", count: tracks.filter((t) => t.category.includes("Commerce") || t.category.includes("FinTech")).length },
  ];

  const filteredTracks = tracks.filter((track) => {
    const matchesCategory =
      activeCategory === "ALL" ||
      track.category.toLowerCase().includes(activeCategory.toLowerCase());
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.number.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenEdit = (track: EditableTrack) => {
    setSelectedTrack(track);
    setEditForm({ ...track });
    setIsEditing(true);
    setIsDrawerOpen(true);
  };

  const handleCreateDraft = () => {
    const newDraft: EditableTrack = {
      id: `draft-track-${Date.now()}`,
      slug: `draft-track-${Date.now()}`,
      number: `TRACK 0${tracks.length + 1}`,
      title: "New Challenge Domain (Draft)",
      category: "Open Track",
      shortDescription: "Draft description of the proposed engineering domain.",
      detailedOverview: "Detailed problem statement scope and evaluation criteria.",
      keyThemes: ["Emerging Technology", "Prototype Feasibility"],
      technicalCompetencies: ["Full-Stack", "API Integration"],
      opportunityAreas: ["Regional business automation", "Campus infrastructure"],
      status: "PROVISIONAL",
      statusLabel: "Draft Track // Local Preview",
      approvalStatus: "DRAFT",
      isModified: true,
    };
    setSelectedTrack(newDraft);
    setEditForm(newDraft);
    setIsEditing(true);
    setIsDrawerOpen(true);
  };

  const handleSaveDraft = () => {
    if (!editForm) return;
    const exists = tracks.some((t) => t.id === editForm.id);
    const updated = exists
      ? tracks.map((t) => (t.id === editForm.id ? { ...editForm, isModified: true } : t))
      : [...tracks, { ...editForm, isModified: true }];

    setTracks(updated);
    setSelectedTrack(editForm);
    setIsEditing(false);
    setHasChangesNotice(true);
  };

  const handleResetToConfig = () => {
    setTracks(
      initialTracks.map((t) => ({
        ...t,
        approvalStatus: t.status === "RATIFIED" ? "APPROVED" : "AWAITING_APPROVAL",
        isModified: false,
      }))
    );
    setIsResetConfirmOpen(false);
    setIsDrawerOpen(false);
    setHasChangesNotice(false);
  };

  const approvalStatusBadge = (status: TrackApprovalStatus) => {
    switch (status) {
      case "DRAFT":
        return <Badge variant="default" size="sm">Draft</Badge>;
      case "AWAITING_APPROVAL":
        return <Badge variant="warning" size="sm" dot>Awaiting Approval</Badge>;
      case "APPROVED":
        return <Badge variant="success" size="sm" dot>Approved</Badge>;
      case "PUBLISHED":
        return <Badge variant="accent" size="sm" dot>Published</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        badge="CONTENT MANAGEMENT"
        badgeVariant="accent"
        eyebrow="ACADEMICS & CURRICULUM"
        title="Challenge & Track Management"
        description="Review, draft, and stage engineering tracks for SCETATHON ahead of formal committee ratification."
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
              onClick={handleCreateDraft}
              leftIcon={<Icons.Plus size={14} />}
            >
              Add Draft Track
            </Button>
          </div>
        }
      />

      {/* Safety Notice Banner */}
      <div className="p-3.5 rounded-xl border border-[var(--color-accent-lime-border)] bg-[rgba(183,255,90,0.04)] text-xs text-[var(--color-text-secondary)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icons.Info size={15} className="text-[var(--color-accent-lime)] shrink-0" />
          <span>
            <strong>Client-Side Preview</strong> — Any modifications are temporary preview changes and are not saved to the official event configuration files or live database.
          </span>
        </div>
        {hasChangesNotice && (
          <span className="text-[10px] font-mono font-bold text-[var(--color-accent-lime)] px-2 py-0.5 rounded bg-[var(--color-accent-lime-subtle)] shrink-0">
            Preview Edits Active
          </span>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <AdminFilterBar
          options={categories}
          activeFilter={activeCategory}
          onFilterChange={setActiveCategory}
        />

        <AdminSearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search tracks by title or keyword…"
        />
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTracks.map((track) => (
          <GlassPanel
            key={track.id}
            variant="elevated"
            padding="md"
            className="flex flex-col justify-between space-y-4 hover:border-white/20 transition-all duration-200"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--color-accent-lime)] uppercase">
                  {track.number}
                </span>
                <div className="flex items-center gap-2">
                  {track.isModified && (
                    <span className="text-[9px] font-mono uppercase bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded border border-amber-500/30">
                      Local Edit
                    </span>
                  )}
                  {approvalStatusBadge(track.approvalStatus)}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                  {track.title}
                </h3>
                <span className="text-xs text-[var(--color-accent-cyan)] font-mono">
                  {track.category}
                </span>
              </div>

              <p className="text-xs text-[var(--color-text-secondary)] line-clamp-3 leading-relaxed">
                {track.shortDescription}
              </p>

              {/* Competencies Badges */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {track.keyThemes.slice(0, 3).map((theme) => (
                  <span
                    key={theme}
                    className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[var(--color-text-muted)] font-mono"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  setSelectedTrack(track);
                  setIsEditing(false);
                  setIsDrawerOpen(true);
                }}
                className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Icons.Eye size={13} />
                Preview Scope
              </button>

              <button
                onClick={() => handleOpenEdit(track)}
                className="text-xs font-semibold text-[var(--color-accent-lime)] hover:text-[var(--color-accent-lime-hover)] transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Icons.Edit size={13} />
                Edit Draft
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Track Details / Edit Drawer */}
      <AdminDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={isEditing ? "Edit Track Draft" : selectedTrack?.title || "Track Overview"}
        subtitle={selectedTrack ? `${selectedTrack.number} • ${selectedTrack.category}` : undefined}
        badge={selectedTrack?.approvalStatus}
        footer={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            {isEditing ? (
              <Button variant="primary" size="sm" onClick={handleSaveDraft}>
                Save Local Draft
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (selectedTrack) handleOpenEdit(selectedTrack);
                }}
              >
                Modify Track
              </Button>
            )}
          </div>
        }
      >
        {isEditing && editForm ? (
          <div className="space-y-4">
            <AdminFormField label="Track Title" id="track-title" required>
              <input
                id="track-title"
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <div className="grid grid-cols-2 gap-3">
              <AdminFormField label="Track Number" id="track-num" required>
                <input
                  id="track-num"
                  type="text"
                  value={editForm.number}
                  onChange={(e) => setEditForm({ ...editForm, number: e.target.value })}
                  className="glass-input w-full h-10 px-3 text-xs rounded-xl"
                />
              </AdminFormField>

              <AdminFormField label="Approval Status" id="track-status" required>
                <select
                  id="track-status"
                  value={editForm.approvalStatus}
                  onChange={(e) =>
                    setEditForm({ ...editForm, approvalStatus: e.target.value as TrackApprovalStatus })
                  }
                  className="glass-input w-full h-10 px-3 text-xs rounded-xl"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="AWAITING_APPROVAL">Awaiting Approval</option>
                  <option value="APPROVED">Approved</option>
                  <option value="PUBLISHED">Published</option>
                </select>
              </AdminFormField>
            </div>

            <AdminFormField label="Category Domain" id="track-cat" required>
              <input
                id="track-cat"
                type="text"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <AdminFormField label="Short Description" id="track-short" required>
              <textarea
                id="track-short"
                rows={3}
                value={editForm.shortDescription}
                onChange={(e) => setEditForm({ ...editForm, shortDescription: e.target.value })}
                className="glass-input w-full p-3 text-xs rounded-xl resize-none"
              />
            </AdminFormField>

            <AdminFormField label="Detailed Overview" id="track-detailed">
              <textarea
                id="track-detailed"
                rows={5}
                value={editForm.detailedOverview}
                onChange={(e) => setEditForm({ ...editForm, detailedOverview: e.target.value })}
                className="glass-input w-full p-3 text-xs rounded-xl resize-none"
              />
            </AdminFormField>
          </div>
        ) : selectedTrack ? (
          <div className="space-y-5">
            <AdminContentPreview title="Public Challenge Preview">
              <div className="space-y-3 text-xs">
                <span className="text-[10px] font-mono text-[var(--color-accent-lime)] uppercase">
                  {`${selectedTrack.number} // ${selectedTrack.category}`}
                </span>
                <h4 className="text-base font-bold text-white">
                  {selectedTrack.title}
                </h4>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {selectedTrack.detailedOverview}
                </p>
                <div className="pt-2 border-t border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase">
                    Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTrack.technicalCompetencies.map((comp) => (
                      <span key={comp} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-[var(--color-accent-cyan)] font-mono">
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </AdminContentPreview>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">
                Opportunity Areas
              </span>
              <ul className="space-y-1.5 list-disc list-inside text-[var(--color-text-secondary)]">
                {selectedTrack.opportunityAreas.map((area, i) => (
                  <li key={i}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </AdminDetailDrawer>

      {/* Confirmation Dialog for Reset */}
      <AdminConfirmationDialog
        isOpen={isResetConfirmOpen}
        title="Reset Challenge Tracks to Original Config?"
        message="This will discard all client-side draft tracks and temporary field modifications. The 6 ratified tracks from config/tracks.ts will be reloaded."
        confirmLabel="Reset Tracks"
        onConfirm={handleResetToConfig}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}
