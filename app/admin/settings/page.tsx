"use client";

import React, { useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminFormField } from "@/components/admin/AdminFormField";
import { AdminConfirmationDialog } from "@/components/admin/AdminConfirmationDialog";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { registrationConfig } from "@/config/registration";

export interface SettingsState {
  eventName: string;
  tagline: string;
  edition: string;
  institutionName: string;
  location: string;
  eventFormat: string;
  registrationMode: "preview" | "open" | "closed" | "coming_soon";
  minTeamSize: number;
  maxTeamSize: number;
  allowSolo: boolean;
  tracksRatified: boolean;
  scheduleRatified: boolean;
}

const INITIAL_SETTINGS: SettingsState = {
  eventName: siteConfig.name,
  tagline: siteConfig.tagline,
  edition: siteConfig.edition,
  institutionName: siteConfig.institution.fullName,
  location: siteConfig.institution.location,
  eventFormat: "24-Hour Continuous Collaborative Hackathon",
  registrationMode: registrationConfig.mode,
  minTeamSize: registrationConfig.teamSize.min,
  maxTeamSize: registrationConfig.teamSize.max,
  allowSolo: registrationConfig.allowSolo,
  tracksRatified: false,
  scheduleRatified: false,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SettingsState>(INITIAL_SETTINGS);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const handleSavePreview = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleReset = () => {
    setSettings(INITIAL_SETTINGS);
    setIsResetConfirmOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <AdminPageHeader
        badge="CONFIGURATION"
        badgeVariant="accent"
        eyebrow="GLOBAL PARAMETERS"
        title="Event Settings"
        description="Review global event constants, registration parameters, and publication statuses. Changes exist in client memory."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsResetConfirmOpen(true)}
              leftIcon={<Icons.RotateCcw size={14} />}
            >
              Reset Preview Changes
            </Button>
          </div>
        }
      />

      {/* Safety Notice Banner */}
      <div className="p-3.5 rounded-xl border border-white/10 bg-white/[0.02] text-xs text-[var(--color-text-secondary)] flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icons.Info size={15} className="text-[var(--color-accent-lime)] shrink-0" />
          <span>
            <strong>Volatile Component State</strong> — Settings edited in this form apply only to the current browser view. Production updates require authorized file-system commits in repository config files.
          </span>
        </div>
      </div>

      {saveToast && (
        <div className="p-3 rounded-xl bg-[var(--color-accent-lime-subtle)] border border-[var(--color-accent-lime-border)] text-xs text-[var(--color-accent-lime)] flex items-center gap-2 animate-in fade-in duration-200">
          <Icons.Check size={14} />
          <span>Client preview settings updated in memory. (No persistent file write occurred).</span>
        </div>
      )}

      <form onSubmit={handleSavePreview} className="space-y-6">
        {/* Section 1: General Settings */}
        <GlassPanel variant="elevated" padding="lg" className="space-y-5">
          <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[var(--color-text-primary)]">
                General Event Parameters
              </h2>
              <p className="text-xs text-[var(--color-text-muted)]">
                Core identity and institutional branding values.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase">
              Source: config/site.ts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AdminFormField label="Event Name" id="set-name">
              <input
                id="set-name"
                type="text"
                value={settings.eventName}
                onChange={(e) => setSettings({ ...settings, eventName: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <AdminFormField label="Edition Tag" id="set-edition">
              <input
                id="set-edition"
                type="text"
                value={settings.edition}
                onChange={(e) => setSettings({ ...settings, edition: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <AdminFormField label="Tagline" id="set-tagline" className="md:col-span-2">
              <input
                id="set-tagline"
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <AdminFormField label="Host Institution" id="set-inst" className="md:col-span-2">
              <input
                id="set-inst"
                type="text"
                value={settings.institutionName}
                onChange={(e) => setSettings({ ...settings, institutionName: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <AdminFormField label="Campus Location" id="set-loc" className="md:col-span-2">
              <input
                id="set-loc"
                type="text"
                value={settings.location}
                onChange={(e) => setSettings({ ...settings, location: e.target.value })}
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>
          </div>
        </GlassPanel>

        {/* Section 2: Registration Settings */}
        <GlassPanel variant="elevated" padding="lg" className="space-y-5">
          <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[var(--color-text-primary)]">
                Registration Configuration
              </h2>
              <p className="text-xs text-[var(--color-text-muted)]">
                Rules governing applicant team sizes and access modes.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase">
              Source: config/registration.ts
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <AdminFormField label="Registration Mode" id="set-regmode">
              <select
                id="set-regmode"
                value={settings.registrationMode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    registrationMode: e.target.value as SettingsState["registrationMode"],
                  })
                }
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              >
                <option value="preview">Preview (Default)</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="coming_soon">Coming Soon</option>
              </select>
            </AdminFormField>

            <AdminFormField label="Min Team Size" id="set-minteam">
              <input
                id="set-minteam"
                type="number"
                min={1}
                max={6}
                value={settings.minTeamSize}
                onChange={(e) =>
                  setSettings({ ...settings, minTeamSize: Number(e.target.value) })
                }
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>

            <AdminFormField label="Max Team Size" id="set-maxteam">
              <input
                id="set-maxteam"
                type="number"
                min={settings.minTeamSize}
                max={8}
                value={settings.maxTeamSize}
                onChange={(e) =>
                  setSettings({ ...settings, maxTeamSize: Number(e.target.value) })
                }
                className="glass-input w-full h-10 px-3 text-xs rounded-xl"
              />
            </AdminFormField>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                Allow Solo Registrations
              </p>
              <p className="text-[11px] text-[var(--color-text-muted)]">
                Whether participants can register without forming a team squad.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[var(--color-text-muted)] bg-white/5 px-2 py-1 rounded">
              {settings.allowSolo ? "Enabled" : "Disabled (Team required)"}
            </span>
          </div>
        </GlassPanel>

        {/* Section 3: Publication & Ratification Status */}
        <GlassPanel variant="elevated" padding="lg" className="space-y-5">
          <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[var(--color-text-primary)]">
                Content Ratification Status
              </h2>
              <p className="text-xs text-[var(--color-text-muted)]">
                Formal approval milestones for public-facing statements.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase">
              Academic Governance
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  Challenge Tracks Ratified
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  Technical Committee sign-off on 6 tracks
                </p>
              </div>
              <Badge variant={settings.tracksRatified ? "success" : "warning"} size="sm" dot>
                {settings.tracksRatified ? "Ratified" : "Provisional"}
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-primary)]">
                  Schedule Ratified
                </p>
                <p className="text-[11px] text-[var(--color-text-muted)]">
                  Academic Cell sign-off on 24H itinerary
                </p>
              </div>
              <Badge variant={settings.scheduleRatified ? "success" : "warning"} size="sm" dot>
                {settings.scheduleRatified ? "Ratified" : "Illustrative"}
              </Badge>
            </div>
          </div>
        </GlassPanel>

        {/* Section 4: Operational & Infrastructure Status */}
        <GlassPanel variant="subtle" padding="lg" className="space-y-4">
          <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-[var(--color-text-primary)]">
                Operational & Infrastructure Connections
              </h2>
              <p className="text-xs text-[var(--color-text-muted)]">
                Backend services status for the administrative interface.
              </p>
            </div>
            <span className="text-[10px] font-mono text-amber-400 uppercase">
              Phase 5 Architecture
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">
                Database Engine
              </span>
              <p className="font-bold text-[var(--color-text-primary)]">Not Connected</p>
              <p className="text-[11px] text-[var(--color-text-muted)]">Phase 6 Integration</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">
                Admin Authentication
              </span>
              <p className="font-bold text-[var(--color-text-primary)]">Preview Environment</p>
              <p className="text-[11px] text-[var(--color-text-muted)]">No credentials stored</p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-[var(--color-text-muted)]">
                API Gateway
              </span>
              <p className="font-bold text-[var(--color-text-primary)]">Offline (Static Build)</p>
              <p className="text-[11px] text-[var(--color-text-muted)]">Client-side rendering</p>
            </div>
          </div>
        </GlassPanel>

        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="md"
            onClick={() => setIsResetConfirmOpen(true)}
          >
            Discard Edits
          </Button>
          <Button type="submit" variant="primary" size="md">
            Save Client Preview
          </Button>
        </div>
      </form>

      {/* Reset Confirmation Dialog */}
      <AdminConfirmationDialog
        isOpen={isResetConfirmOpen}
        title="Reset Settings to Defaults?"
        message="This will discard all client preview modifications and reload values from the official configuration files."
        confirmLabel="Reset Settings"
        onConfirm={handleReset}
        onCancel={() => setIsResetConfirmOpen(false)}
      />
    </div>
  );
}

