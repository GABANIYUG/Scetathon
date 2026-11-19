"use client";

import React, { useState } from "react";
import {
  Announcement,
  AnnouncementCategory,
  AnnouncementPriority,
  AnnouncementVisibility,
} from "@/lib/types/database";
import { ANNOUNCEMENT_CATEGORIES, ANNOUNCEMENT_AUDIENCES, ANNOUNCEMENT_PRIORITIES } from "@/config/operations";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";
import { AnnouncementPreview } from "./AnnouncementPreview";

interface AnnouncementComposerProps {
  initialData?: Partial<Announcement>;
  onSave: (data: {
    title: string;
    summary: string;
    content: string;
    category: AnnouncementCategory;
    visibility: AnnouncementVisibility;
    priority: AnnouncementPriority;
    status: "draft" | "published";
    authorLabel: string;
  }) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
}

export const AnnouncementComposer: React.FC<AnnouncementComposerProps> = ({
  initialData,
  onSave,
  onCancel,
  isSubmitting = false,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [summary, setSummary] = useState(initialData?.summary || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState<AnnouncementCategory>(initialData?.category || "General");
  const [visibility, setVisibility] = useState<AnnouncementVisibility>(initialData?.visibility || "Public Website");
  const [priority, setPriority] = useState<AnnouncementPriority>(initialData?.priority || "Normal");
  const [authorLabel, setAuthorLabel] = useState(initialData?.author_label || "SCET Organizing Committee");
  const [previewOpen, setPreviewOpen] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (targetStatus: "draft" | "published") => {
    setValidationError("");
    if (!title.trim()) {
      setValidationError("Please enter an announcement title.");
      return;
    }
    if (!summary.trim()) {
      setValidationError("Please provide a concise summary.");
      return;
    }
    if (!content.trim()) {
      setValidationError("Please provide detailed announcement body text.");
      return;
    }

    await onSave({
      title: title.trim(),
      summary: summary.trim(),
      content: content.trim(),
      category,
      visibility,
      priority,
      status: targetStatus,
      authorLabel: authorLabel.trim(),
    });
  };

  return (
    <>
      <GlassPanel variant="elevated" padding="lg" edgeHighlight className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent-lime)] uppercase block">
              COMMUNICATIONS STUDIO
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white">
              {initialData?.id ? "Edit Broadcast Notice" : "Draft New Event Announcement"}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="px-3 py-1.5 rounded-xl border border-white/10 hover:border-white/20 text-xs text-[var(--color-text-secondary)] hover:text-white inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Icons.Eye size={14} />
            <span>Live Preview</span>
          </button>
        </div>

        {validationError && (
          <div
            role="alert"
            className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2"
          >
            <Icons.AlertTriangle size={15} className="shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
              Announcement Title <span className="text-[var(--color-accent-lime)]">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Checkpoint 1 Mentorship Rotations Commence in Lab 302"
              className="glass-input w-full h-11 px-4 text-xs sm:text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none"
            />
          </div>

          {/* Category, Audience & Priority Selector Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AnnouncementCategory)}
                className="glass-input w-full h-10 px-3 text-xs text-[var(--color-text-primary)] rounded-xl outline-none bg-[#0e131f]"
              >
                {ANNOUNCEMENT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Audience */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
                Target Audience
              </label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as AnnouncementVisibility)}
                className="glass-input w-full h-10 px-3 text-xs text-[var(--color-text-primary)] rounded-xl outline-none bg-[#0e131f]"
              >
                {Object.keys(ANNOUNCEMENT_AUDIENCES).map((aud) => (
                  <option key={aud} value={aud}>
                    {aud}
                  </option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as AnnouncementPriority)}
                className="glass-input w-full h-10 px-3 text-xs text-[var(--color-text-primary)] rounded-xl outline-none bg-[#0e131f]"
              >
                {Object.keys(ANNOUNCEMENT_PRIORITIES).map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
              Brief Summary (Visible in Cards & Feeds) <span className="text-[var(--color-accent-lime)]">*</span>
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="1-2 sentences highlighting the core message and required action..."
              className="glass-input w-full p-3 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none resize-none"
            />
          </div>

          {/* Full Content */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
              Complete Announcement Body <span className="text-[var(--color-accent-lime)]">*</span>
            </label>
            <textarea
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Full detailed message, room numbers, mentor rosters, technical links, and instructions..."
              className="glass-input w-full p-3 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none"
            />
          </div>

          {/* Author Signature */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase">
              Author Label / Sign-off
            </label>
            <input
              type="text"
              value={authorLabel}
              onChange={(e) => setAuthorLabel(e.target.value)}
              placeholder="e.g. SCET Organizing Committee, Technical Mentorship Core"
              className="glass-input w-full h-10 px-3.5 text-xs text-[var(--color-text-primary)] rounded-xl outline-none"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-2">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--color-text-muted)] hover:text-white hover:bg-white/5 border border-transparent"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              disabled={isSubmitting}
              onClick={() => handleSubmit("draft")}
            >
              Save as Draft
            </Button>

            <Button
              type="button"
              variant="primary"
              size="md"
              disabled={isSubmitting}
              onClick={() => handleSubmit("published")}
              className="glow-lime"
            >
              <Icons.Send size={14} className="mr-1.5" />
              <span>{isSubmitting ? "Publishing..." : "Broadcast Announcement"}</span>
            </Button>
          </div>
        </div>
      </GlassPanel>

      <AnnouncementPreview
        isOpen={previewOpen}
        onClose={() => setPreviewOpen(false)}
        announcement={{
          title,
          summary,
          content,
          category,
          visibility,
          priority,
          author_label: authorLabel,
        }}
      />
    </>
  );
};
