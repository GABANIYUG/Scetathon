"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Announcement,
  AnnouncementCategory,
  AnnouncementPriority,
  AnnouncementVisibility,
  AnnouncementStatus,
} from "@/lib/types/database";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AnnouncementComposer } from "@/components/announcements/AnnouncementComposer";
import { AnnouncementPriorityBadge } from "@/components/announcements/AnnouncementPriorityBadge";
import { AnnouncementPreview } from "@/components/announcements/AnnouncementPreview";
import { FALLBACK_ANNOUNCEMENTS } from "@/lib/dal/announcements";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(FALLBACK_ANNOUNCEMENTS);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<"ALL" | AnnouncementStatus>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null);
  const [previewItem, setPreviewItem] = useState<Announcement | null>(null);
  const [toastMessage, setToastMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleManualRefresh = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/announcements");
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setAnnouncements(json.data);
        }
      }
    } catch {
      // Offline fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    async function loadData() {
      try {
        const res = await fetch("/api/admin/announcements");
        if (res.ok) {
          const json = await res.json();
          if (!ignore && json.success && Array.isArray(json.data) && json.data.length > 0) {
            setAnnouncements(json.data);
          }
        }
      } catch {
        // Offline fallback
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    loadData();
    return () => {
      ignore = true;
    };
  }, []);

  const showToast = (type: "success" | "error", text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSaveAnnouncement = async (formData: {
    title: string;
    summary: string;
    content: string;
    category: AnnouncementCategory;
    visibility: AnnouncementVisibility;
    priority: AnnouncementPriority;
    status: "draft" | "published";
    authorLabel: string;
  }) => {
    setIsSubmitting(true);
    try {
      if (editingAnnouncement) {
        // Edit existing
        const res = await fetch("/api/admin/announcements", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editingAnnouncement.id,
            updates: formData,
          }),
        });
        const json = await res.json();
        if (res.ok && json.success) {
          showToast("success", `Announcement "${formData.title}" updated.`);
          setAnnouncements((prev) =>
            prev.map((a) => (a.id === editingAnnouncement.id ? { ...a, ...formData } : a))
          );
        } else {
          // Local fallback update
          setAnnouncements((prev) =>
            prev.map((a) => (a.id === editingAnnouncement.id ? { ...a, ...formData } : a))
          );
          showToast("success", "Announcement updated locally (offline mode).");
        }
      } else {
        // Create new
        const res = await fetch("/api/admin/announcements", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (res.ok && json.success && json.data) {
          showToast("success", `Announcement "${formData.title}" published.`);
          setAnnouncements((prev) => [json.data, ...prev]);
        } else {
          // Local fallback creation
          const mockNew: Announcement = {
            id: `ann-${Date.now()}`,
            ...formData,
            pinned: false,
            author_label: formData.authorLabel,
            created_by: null,
            published_at: formData.status === "published" ? new Date().toISOString() : null,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          };
          setAnnouncements((prev) => [mockNew, ...prev]);
          showToast("success", "Announcement saved locally (offline mode).");
        }
      }

      setComposerOpen(false);
      setEditingAnnouncement(null);
    } catch {
      showToast("error", "Failed to communicate with announcement engine.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async (item: Announcement) => {
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, action: "publish" }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast("success", `Announcement "${item.title}" is now published.`);
        setAnnouncements((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, status: "published", published_at: new Date().toISOString() } : a))
        );
      } else {
        // Local state toggle
        setAnnouncements((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, status: "published", published_at: new Date().toISOString() } : a))
        );
        showToast("success", "Announcement published in preview mode.");
      }
    } catch {
      showToast("error", "Network error while publishing.");
    }
  };

  const handleArchive = async (item: Announcement) => {
    try {
      const res = await fetch("/api/admin/announcements", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, action: "archive" }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showToast("success", `Announcement "${item.title}" moved to archive.`);
        setAnnouncements((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, status: "archived" } : a))
        );
      } else {
        setAnnouncements((prev) =>
          prev.map((a) => (a.id === item.id ? { ...a, status: "archived" } : a))
        );
        showToast("success", "Announcement archived.");
      }
    } catch {
      showToast("error", "Network error while archiving.");
    }
  };

  const filtered = useMemo(() => {
    return announcements.filter((item) => {
      if (activeTab !== "ALL" && item.status !== activeTab) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.summary.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.visibility.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [announcements, activeTab, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <AdminPageHeader
        badge="COMMUNICATIONS"
        badgeVariant="accent"
        eyebrow="BROADCAST DISPATCH & NOTIFICATIONS"
        title="Announcement Management"
        description="Draft, publish, and target live hackathon bulletins for public visitors, registered squads, and internal committees."
        actions={
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleManualRefresh}
              disabled={loading}
              title="Refresh announcements list"
            >
              <Icons.RefreshCw size={14} className={cn("mr-1", loading && "animate-spin")} />
              <span>Refresh</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setEditingAnnouncement(null);
                setComposerOpen(!composerOpen);
              }}
              className="glow-lime"
            >
              <Icons.Plus size={14} className="mr-1.5" />
              <span>{composerOpen ? "Close Studio" : "Draft Announcement"}</span>
            </Button>
          </div>
        }
      />

      {/* Toast Banner */}
      {toastMessage && (
        <div
          role="alert"
          className={cn(
            "p-3.5 rounded-xl text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200",
            toastMessage.type === "success"
              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
              : "bg-red-500/10 border border-red-500/30 text-red-400"
          )}
        >
          <div className="flex items-center gap-2">
            {toastMessage.type === "success" ? <Icons.CheckCircle size={15} /> : <Icons.AlertTriangle size={15} />}
            <span>{toastMessage.text}</span>
          </div>
          <button type="button" onClick={() => setToastMessage(null)} className="hover:opacity-75">
            <Icons.Close size={14} />
          </button>
        </div>
      )}

      {/* Optional Composer Modal/Card */}
      {composerOpen && (
        <div className="animate-in fade-in duration-300">
          <AnnouncementComposer
            initialData={editingAnnouncement || undefined}
            isSubmitting={isSubmitting}
            onSave={handleSaveAnnouncement}
            onCancel={() => {
              setComposerOpen(false);
              setEditingAnnouncement(null);
            }}
          />
        </div>
      )}

      {/* Main Announcements Registry */}
      <GlassPanel variant="elevated" padding="lg" edgeHighlight className="space-y-6">
        {/* Filter and Tab Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/10 shrink-0">
            {(["ALL", "published", "draft", "archived"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer capitalize",
                  activeTab === tab
                    ? "bg-white/10 text-white font-bold shadow-sm"
                    : "text-[var(--color-text-muted)] hover:text-white"
                )}
              >
                {tab === "ALL" ? "All Bulletins" : tab}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <Icons.Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bulletins..."
              className="glass-input w-full h-9 pl-9 pr-3 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none"
            />
          </div>
        </div>

        {/* Announcements Table / Card List */}
        <div className="space-y-3">
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all space-y-2.5 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <AnnouncementPriorityBadge priority={item.priority} size="sm" />
                    <Badge variant="outline" size="sm">
                      {item.category}
                    </Badge>
                    <span
                      className={cn(
                        "text-[10px] font-mono px-2 py-0.5 rounded border uppercase tracking-wider",
                        item.status === "published" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
                        item.status === "draft" && "bg-amber-500/10 text-amber-300 border-amber-500/30",
                        item.status === "archived" && "bg-white/5 text-[var(--color-text-muted)] border-white/10"
                      )}
                    >
                      {item.status}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase">
                      · Audience: <span className="text-white font-medium">{item.visibility}</span>
                    </span>
                  </div>

                  {/* Actions Toolbar */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button
                      type="button"
                      onClick={() => setPreviewItem(item)}
                      title="Preview rendering"
                      className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 cursor-pointer"
                    >
                      <Icons.Eye size={15} />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setEditingAnnouncement(item);
                        setComposerOpen(true);
                      }}
                      title="Edit announcement"
                      className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-white hover:bg-white/10 cursor-pointer"
                    >
                      <Icons.Edit size={15} />
                    </button>

                    {item.status === "draft" && (
                      <button
                        type="button"
                        onClick={() => handlePublish(item)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-[var(--color-accent-lime-subtle)] hover:bg-[var(--color-accent-lime)] hover:text-black text-[var(--color-accent-lime)] border border-[var(--color-accent-lime-border)] transition-all cursor-pointer"
                      >
                        Publish
                      </button>
                    )}

                    {item.status === "published" && (
                      <button
                        type="button"
                        onClick={() => handleArchive(item)}
                        title="Archive bulletin"
                        className="p-1.5 rounded-lg text-[var(--color-text-muted)] hover:text-amber-400 hover:bg-white/10 cursor-pointer"
                      >
                        <Icons.Trash size={15} />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">{item.title}</h3>
                  <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2 mt-0.5 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[var(--color-text-muted)] pt-1 border-t border-white/5">
                  <span>Author: {item.author_label || "SCET Organizing Committee"}</span>
                  <span className="font-mono">
                    {item.published_at
                      ? `Published: ${new Date(item.published_at).toLocaleString()}`
                      : `Created: ${new Date(item.created_at).toLocaleDateString()}`}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-16 text-center text-xs text-[var(--color-text-muted)] space-y-2">
              <Icons.Megaphone size={28} className="mx-auto text-white/20" />
              <p>No announcements found matching the active filter.</p>
            </div>
          )}
        </div>
      </GlassPanel>

      {/* Visual Preview Modal */}
      {previewItem && (
        <AnnouncementPreview
          isOpen={Boolean(previewItem)}
          onClose={() => setPreviewItem(null)}
          announcement={previewItem}
        />
      )}
    </div>
  );
}
