"use client";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminContentPreview } from "@/components/admin/AdminContentPreview";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";

export interface AnnouncementDraft {
  title: string;
  category: "General" | "Registration" | "Challenges" | "Schedule" | "Important Notice";
  visibility: "Public Website" | "Registered Teams Only" | "Internal Committee Only";
  summary: string;
  content: string;
  authorLabel: string;
}

const INITIAL_DRAFT: AnnouncementDraft = {
  title: "SCETATHON 24-Hour Hackathon Registration Guidelines Preview",
  category: "Registration",
  visibility: "Public Website",
  summary: "Official guidance for collegiate teams preparing roster submissions for the upcoming hackathon at SCET Surat.",
  content:
    "The organizing committee has published the provisional registration criteria for SCETATHON. Collegiate teams consisting of 2 to 4 undergraduate or graduate engineering students from recognized institutions will be eligible to participate upon formal announcement. Teams must designate a lead contact and prepare student credentials prior to squad verification.",
  authorLabel: "Technical Committee & Organizing Core",
};

export default function AdminAnnouncementsPage() {
  const [draft, setDraft] = useState<AnnouncementDraft>(INITIAL_DRAFT);
  const [draftHistory, setDraftHistory] = useState<AnnouncementDraft[]>([INITIAL_DRAFT]);
  const [successToast, setSuccessToast] = useState(false);

  const handleReset = () => {
    setDraft({
      title: "",
      category: "General",
      visibility: "Public Website",
      summary: "",
      content: "",
      authorLabel: "SCET Organizing Committee",
    });
  };

  const handleStageDraft = () => {
    if (!draft.title.trim()) return;
    setDraftHistory([draft, ...draftHistory.filter((d) => d.title !== draft.title)]);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 3500);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <AdminPageHeader
        badge="COMMUNICATIONS"
        badgeVariant="accent"
        eyebrow="PUBLIC BROADCAST & ALERTS"
        title="Announcement Management"
        description="Draft, stage, and preview official hackathon communications. Publishing pipeline requires backend connectivity."
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Clear Composer
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled
              title="Phase 6 backend integration required to publish live announcements"
              leftIcon={<Icons.Megaphone size={14} />}
            >
              Publish Live (No Backend)
            </Button>
          </div>
        }
      />

      {/* Safety Notice Banner */}
      <div className="p-3.5 rounded-xl border border-amber-500/25 bg-amber-500/5 text-xs text-amber-200/90 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icons.Info size={15} className="text-amber-400 shrink-0" />
          <span>
            <strong>Draft Composer Only</strong> — Announcements composed here exist in client state for UI evaluation. No actual broadcasts or notifications are delivered.
          </span>
        </div>
        <span className="text-[10px] font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 shrink-0">
          Backend Inactive
        </span>
      </div>

      {successToast && (
        <div className="p-3 rounded-xl bg-[var(--color-accent-lime-subtle)] border border-[var(--color-accent-lime-border)] text-xs text-[var(--color-accent-lime)] flex items-center gap-2 animate-in fade-in duration-200">
          <Icons.Check size={14} />
          <span>Draft staged locally in preview history. Live dispatch disabled until Phase 6.</span>
        </div>
      )}

      {/* Two-Column Layout: Composer + Live Public Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Composer Form */}
        <div className="lg:col-span-7 space-y-5">
          <GlassPanel variant="elevated" padding="md" className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <span className="text-xs font-bold text-[var(--color-text-primary)]">
                Announcement Composer
              </span>
              <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                Required fields *
              </span>
            </div>

            <AdminFormField label="Announcement Title" id="ann-title" required>
              <input
                id="ann-title"
                type="text"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
                placeholder="e.g. Technical Track Guidelines Ratified"
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <AdminFormField label="Category" id="ann-cat" required>
                <select
                  id="ann-cat"
                  value={draft.category}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      category: e.target.value as AnnouncementDraft["category"],
                    })
                  }
                  className="glass-input w-full h-10 px-3 text-xs rounded-xl"
                >
                  <option value="General">General</option>
                  <option value="Registration">Registration</option>
                  <option value="Challenges">Challenges</option>
                  <option value="Schedule">Schedule</option>
                  <option value="Important Notice">Important Notice</option>
                </select>
              </AdminFormField>

              <AdminFormField label="Visibility Target" id="ann-vis" required>
                <select
                  id="ann-vis"
                  value={draft.visibility}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      visibility: e.target.value as AnnouncementDraft["visibility"],
                    })
                  }
                  className="glass-input w-full h-10 px-3 text-xs rounded-xl"
                >
                  <option value="Public Website">Public Website</option>
                  <option value="Registered Teams Only">Registered Teams Only</option>
                  <option value="Internal Committee Only">Internal Committee Only</option>
                </select>
              </AdminFormField>
            </div>

            <AdminFormField
              label="Short Summary"
              id="ann-sum"
              required
              hint={`${draft.summary.length} / 180 characters`}
            >
              <textarea
                id="ann-sum"
                rows={2}
                maxLength={180}
                value={draft.summary}
                onChange={(e) => setDraft({ ...draft, summary: e.target.value })}
                placeholder="Brief summary displayed on social strips and preview cards…"
                className="glass-input w-full p-3 text-xs rounded-xl resize-none"
              />
            </AdminFormField>

            <AdminFormField
              label="Full Announcement Content"
              id="ann-content"
              required
              hint={`${draft.content.length} characters`}
            >
              <textarea
                id="ann-content"
                rows={6}
                value={draft.content}
                onChange={(e) => setDraft({ ...draft, content: e.target.value })}
                placeholder="Full markdown or text statement…"
                className="glass-input w-full p-3 text-xs rounded-xl resize-none"
              />
            </AdminFormField>

            <AdminFormField label="Attribution / Byline" id="ann-author">
              <input
                id="ann-author"
                type="text"
                value={draft.authorLabel}
                onChange={(e) => setDraft({ ...draft, authorLabel: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <div className="pt-2 flex items-center justify-between">
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                Local preview mode active
              </span>
              <Button variant="primary" size="sm" onClick={handleStageDraft}>
                Stage Local Draft
              </Button>
            </div>
          </GlassPanel>
        </div>

        {/* Right: Live Preview Panel */}
        <div className="lg:col-span-5 space-y-6 sticky top-24">
          <AdminContentPreview
            title="Live Public Card Preview"
            badge="SIMULATION"
            badgeVariant="accent"
          >
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-accent-lime)] bg-white/5 px-2 py-0.5 rounded">
                  {draft.category || "General"}
                </span>
                <span className="text-[10px] font-mono text-[var(--color-text-muted)]">
                  Target: {draft.visibility}
                </span>
              </div>

              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                {draft.title || "Untitled Announcement"}
              </h3>

              <p className="text-xs text-[var(--color-text-secondary)] font-medium leading-relaxed">
                {draft.summary || "Summary will render here…"}
              </p>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-[var(--color-text-muted)] leading-relaxed">
                {draft.content || "Full statement content will render here…"}
              </div>

              <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[var(--color-text-muted)]">
                <span>By: {draft.authorLabel || "SCET Organizing Committee"}</span>
                <span className="text-[var(--color-accent-cyan)]">Draft Mode</span>
              </div>
            </div>
          </AdminContentPreview>

          {/* Staged Drafts List */}
          <GlassPanel variant="subtle" padding="sm" className="space-y-3">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--color-text-muted)] uppercase block">
              Staged Local Drafts ({draftHistory.length})
            </span>
            <div className="space-y-2">
              {draftHistory.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setDraft(item)}
                  className="w-full text-left p-2.5 rounded-lg bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 transition-colors cursor-pointer space-y-1 block"
                >
                  <p className="text-xs font-semibold text-[var(--color-text-primary)] truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--color-text-muted)]">
                    <span>{item.category}</span>
                    <span>Click to load</span>
                  </div>
                </button>
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  );
}
