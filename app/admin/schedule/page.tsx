"use client";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminDetailDrawer } from "@/components/admin/AdminDetailDrawer";
import { AdminConfirmationDialog } from "@/components/admin/AdminConfirmationDialog";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminContentPreview } from "@/components/admin/AdminContentPreview";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { schedulePhases as initialPhases, SchedulePhase } from "@/config/schedule";

export interface EditableSchedulePhase extends SchedulePhase {
  isModified?: boolean;
}

export default function AdminSchedulePage() {
  const [phases, setPhases] = useState<EditableSchedulePhase[]>(() =>
    initialPhases.map((p) => ({ ...p, isModified: false }))
  );

  const [selectedPhase, setSelectedPhase] = useState<EditableSchedulePhase | null>(null);
  const [editForm, setEditForm] = useState<EditableSchedulePhase | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [hasChangesNotice, setHasChangesNotice] = useState(false);

  const handleOpenEdit = (phase: EditableSchedulePhase) => {
    setSelectedPhase(phase);
    setEditForm({ ...phase });
    setIsEditing(true);
    setIsDrawerOpen(true);
  };

  const handleSaveDraft = () => {
    if (!editForm) return;
    const updated = phases.map((p) =>
      p.phase === editForm.phase ? { ...editForm, isModified: true } : p
    );
    setPhases(updated);
    setSelectedPhase(editForm);
    setIsEditing(false);
    setHasChangesNotice(true);
  };

  const handleResetToConfig = () => {
    setPhases(initialPhases.map((p) => ({ ...p, isModified: false })));
    setIsResetConfirmOpen(false);
    setIsDrawerOpen(false);
    setHasChangesNotice(false);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <AdminPageHeader
        badge="TIMELINE OPERATIONS"
        badgeVariant="accent"
        eyebrow="EVENT ITINERARY & STAGING"
        title="Schedule Management"
        description="Review milestone timing, edit phase descriptions, and preview 24-hour chronological flow ahead of committee ratification."
        actions={
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsResetConfirmOpen(true)}
            leftIcon={<Icons.RotateCcw size={14} />}
          >
            Reset to Config
          </Button>
        }
      />

      {/* Safety Notice Banner */}
      <div className="p-3.5 rounded-xl border border-[var(--color-accent-cyan-border)] bg-[rgba(101,217,242,0.04)] text-xs text-[var(--color-text-secondary)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icons.Info size={15} className="text-[var(--color-accent-cyan)] shrink-0" />
          <span>
            <strong>Provisional Schedule Notice</strong> — Exact milestone timings are illustrative and pending Technical Committee confirmation. Edits in this panel are temporary client-side previews.
          </span>
        </div>
        {hasChangesNotice && (
          <span className="text-[10px] font-mono font-bold text-[var(--color-accent-cyan)] px-2 py-0.5 rounded bg-[var(--color-accent-cyan-subtle)] shrink-0">
            Preview Edits Active
          </span>
        )}
      </div>

      {/* Chronological Phase Cards List */}
      <div className="space-y-3">
        {phases.map((phase) => (
          <GlassPanel
            key={phase.phase}
            variant="elevated"
            padding="md"
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/20 transition-all duration-200"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--color-accent-lime)] uppercase bg-white/5 px-2 py-0.5 rounded">
                  {phase.phase}
                </span>
                <span className="text-xs font-mono text-[var(--color-accent-cyan)]">
                  {phase.hourRange}
                </span>
                {phase.isModified && (
                  <Badge variant="warning" size="sm">
                    Edited Draft
                  </Badge>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                  {phase.title}
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)] mt-0.5 leading-relaxed">
                  {phase.shortSummary}
                </p>
              </div>

              <div className="text-[11px] font-mono text-[var(--color-text-muted)] flex items-center gap-2">
                <span>Focus:</span>
                <span className="text-[var(--color-text-secondary)]">{phase.operationalFocus}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
              <button
                onClick={() => {
                  setSelectedPhase(phase);
                  setIsEditing(false);
                  setIsDrawerOpen(true);
                }}
                className="text-xs font-medium text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10"
              >
                <Icons.Eye size={13} />
                Inspect
              </button>

              <button
                onClick={() => handleOpenEdit(phase)}
                className="text-xs font-semibold text-[var(--color-accent-lime)] hover:text-[var(--color-accent-lime-hover)] transition-colors cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-accent-lime-subtle)] border border-[var(--color-accent-lime-border)]"
              >
                <Icons.Edit size={13} />
                Edit Phase
              </button>
            </div>
          </GlassPanel>
        ))}
      </div>

      {/* Schedule Edit / Inspect Drawer */}
      <AdminDetailDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={isEditing ? `Edit ${selectedPhase?.phase}` : selectedPhase?.title || "Phase Agenda"}
        subtitle={selectedPhase ? `${selectedPhase.phase} • ${selectedPhase.hourRange}` : undefined}
        badge={selectedPhase?.operationalFocus}
        footer={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </Button>
            {isEditing ? (
              <Button variant="primary" size="sm" onClick={handleSaveDraft}>
                Save Local Edit
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (selectedPhase) handleOpenEdit(selectedPhase);
                }}
              >
                Edit Phase Fields
              </Button>
            )}
          </div>
        }
      >
        {isEditing && editForm ? (
          <div className="space-y-4">
            <AdminFormField label="Phase Title" id="phase-title" required>
              <input
                id="phase-title"
                type="text"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <div className="grid grid-cols-2 gap-3">
              <AdminFormField label="Hour Range" id="phase-hours" required>
                <input
                  id="phase-hours"
                  type="text"
                  value={editForm.hourRange}
                  onChange={(e) => setEditForm({ ...editForm, hourRange: e.target.value })}
                  className="glass-input w-full h-10 px-3 text-xs rounded-xl"
                />
              </AdminFormField>

              <AdminFormField label="Relative Clock" id="phase-rel" required>
                <input
                  id="phase-rel"
                  type="text"
                  value={editForm.relativeTime}
                  onChange={(e) => setEditForm({ ...editForm, relativeTime: e.target.value })}
                  className="glass-input w-full h-10 px-3 text-xs rounded-xl"
                />
              </AdminFormField>
            </div>

            <AdminFormField label="Operational Focus" id="phase-focus" required>
              <input
                id="phase-focus"
                type="text"
                value={editForm.operationalFocus}
                onChange={(e) => setEditForm({ ...editForm, operationalFocus: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <AdminFormField label="Short Summary" id="phase-summary" required>
              <textarea
                id="phase-summary"
                rows={3}
                value={editForm.shortSummary}
                onChange={(e) => setEditForm({ ...editForm, shortSummary: e.target.value })}
                className="glass-input w-full p-3 text-xs rounded-xl resize-none"
              />
            </AdminFormField>

            <AdminFormField label="Participant Instructions" id="phase-instructions">
              <textarea
                id="phase-instructions"
                rows={3}
                value={editForm.participantInstructions}
                onChange={(e) => setEditForm({ ...editForm, participantInstructions: e.target.value })}
                className="glass-input w-full p-3 text-xs rounded-xl resize-none"
              />
            </AdminFormField>
          </div>
        ) : selectedPhase ? (
          <div className="space-y-5">
            <AdminContentPreview title="Public Schedule Card Preview">
              <div className="space-y-3 text-xs">
                <span className="text-[10px] font-mono text-[var(--color-accent-lime)] uppercase">
                  {`${selectedPhase.phase} // ${selectedPhase.hourRange}`}
                </span>
                <h4 className="text-base font-bold text-white">
                  {selectedPhase.title}
                </h4>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  {selectedPhase.shortSummary}
                </p>
                <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-[11px] text-[var(--color-text-muted)]">
                  <strong className="text-[var(--color-text-secondary)] block mb-0.5">Participant Guidelines:</strong>
                  {selectedPhase.participantInstructions}
                </div>
              </div>
            </AdminContentPreview>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2 text-xs">
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">
                Detailed Agenda Breakdown
              </span>
              <ul className="space-y-1.5 list-disc list-inside text-[var(--color-text-secondary)]">
                {selectedPhase.detailedAgenda.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}
      </AdminDetailDrawer>

      {/* Confirmation Dialog for Reset */}
      <AdminConfirmationDialog
        isOpen={isResetConfirmOpen}
        title="Reset Schedule to Ratified Configuration?"
        message="This will discard all client-side timeline changes and reload the 6 standard phases from config/schedule.ts."
        confirmLabel="Reset Schedule"
        onConfirm={handleResetToConfig}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}
