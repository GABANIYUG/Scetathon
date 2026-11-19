import React from "react";
import { Announcement } from "@/lib/types/database";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { AnnouncementCard } from "./AnnouncementCard";
import { Icons } from "@/components/ui/icons";

interface AnnouncementPreviewProps {
  announcement: Partial<Announcement>;
  isOpen: boolean;
  onClose: () => void;
}

export const AnnouncementPreview: React.FC<AnnouncementPreviewProps> = ({
  announcement,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const mockRecord: Announcement = {
    id: announcement.id || "preview-id",
    title: announcement.title || "Announcement Title Preview",
    summary: announcement.summary || "Summary text will be rendered here for quick reading.",
    content: announcement.content || "Full detailed announcement content will appear in this section.",
    category: announcement.category || "General",
    status: announcement.status || "draft",
    visibility: announcement.visibility || "Public Website",
    priority: announcement.priority || "Normal",
    pinned: announcement.pinned || false,
    author_label: announcement.author_label || "SCET Organizing Committee",
    created_by: null,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
    >
      <div className="w-full max-w-2xl space-y-4">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent-lime)] uppercase">
              PRE-FLIGHT SIMULATION
            </span>
            <span className="text-xs font-bold text-white">Live Broadcast Preview</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-white/10"
          >
            <Icons.Close size={18} />
          </button>
        </div>

        <GlassPanel variant="elevated" padding="lg" edgeHighlight glow="lime">
          <div className="space-y-4">
            <div className="text-[11px] font-mono text-[var(--color-text-muted)] uppercase border-b border-white/10 pb-2">
              Preview Mode · Target Audience: <span className="text-white font-semibold">{mockRecord.visibility}</span>
            </div>

            <AnnouncementCard announcement={mockRecord} showAudience />

            <div className="pt-2 text-right">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/10"
              >
                Close Preview
              </button>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};

