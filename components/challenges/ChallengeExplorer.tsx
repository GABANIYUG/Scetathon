"use client";

import React, { useState, useMemo } from "react";
import { challengeTracks, trackCategories, ChallengeTrack } from "@/config/tracks";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Icons } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

export const ChallengeExplorer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Domains");
  const [activeTrackModal, setActiveTrackModal] = useState<ChallengeTrack | null>(null);

  // Filtered tracks based on search query & category selection
  const filteredTracks = useMemo(() => {
    return challengeTracks.filter((track) => {
      const matchesCategory =
        selectedCategory === "All Domains" || track.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        track.title.toLowerCase().includes(q) ||
        track.shortDescription.toLowerCase().includes(q) ||
        track.keyThemes.some((t) => t.toLowerCase().includes(q)) ||
        track.technicalCompetencies.some((c) => c.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Domains");
  };

  return (
    <div className="space-y-8">
      {/* Search Input & Category Filter Chips */}
      <GlassPanel variant="highlight" padding="lg" className="border-white/15 space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] pointer-events-none">
              <Icons.Terminal size={16} />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, tech stack, or theme..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[rgba(8,11,18,0.7)] border border-white/10 text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent-lime)] focus:ring-1 focus:ring-[var(--color-accent-lime)] transition-colors"
              aria-label="Search engineering challenge tracks"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                aria-label="Clear search query"
              >
                <Icons.Close size={14} />
              </button>
            )}
          </div>

          {/* Result Counter & Provisional Status Notice */}
          <div className="flex items-center gap-3 text-xs font-mono text-[var(--color-text-muted)]">
            <span>
              SHOWING <strong className="text-[var(--color-accent-lime)]">{filteredTracks.length}</strong> OF {challengeTracks.length} DOMAINS
            </span>
            {(searchQuery || selectedCategory !== "All Domains") && (
              <button
                onClick={handleResetFilters}
                className="text-[var(--color-accent-cyan)] hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--color-text-muted)] uppercase block">
            Filter by Domain Category
          </span>
          <div className="flex flex-wrap gap-2">
            {trackCategories.map((category) => {
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    "px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 cursor-pointer select-none border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-lime)]",
                    isSelected
                      ? "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)] border-[var(--color-accent-lime)] font-bold shadow-[0_0_12px_rgba(183,255,90,0.3)]"
                      : "bg-white/5 text-[var(--color-text-secondary)] border-white/10 hover:border-white/20 hover:text-white"
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </GlassPanel>

      {/* Provisional Ratification Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[rgba(21,29,42,0.5)] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-cyan)] animate-ping shrink-0 mt-1 sm:mt-0" />
          <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
            <strong className="text-white font-semibold">Provisional Explorer:</strong> Challenge themes represent approved exploration domains. Individual problem statements will be released on campus during the opening hours.
          </p>
        </div>
        <Badge variant="accent" size="sm" className="shrink-0 self-start sm:self-auto">
          PROVISIONAL DIRECTORY
        </Badge>
      </div>

      {/* Empty State when no results match */}
      {filteredTracks.length === 0 ? (
        <GlassPanel variant="subtle" padding="xl" className="text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 mx-auto flex items-center justify-center text-[var(--color-accent-lime)]">
            <Icons.AlertTriangle size={24} />
          </div>
          <h3 className="font-heading font-bold text-xl text-white">
            No Challenge Domains Found
          </h3>
          <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
            No engineering tracks match &quot;{searchQuery}&quot; under the &quot;{selectedCategory}&quot; category filter.
          </p>
          <Button variant="outline" size="sm" onClick={handleResetFilters}>
            Clear Search & Reset Filters
          </Button>
        </GlassPanel>
      ) : (
        /* Track Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTracks.map((track) => (
            <GlassPanel
              key={track.id}
              variant="interactive"
              padding="lg"
              className="flex flex-col justify-between space-y-6 group cursor-pointer"
              onClick={() => setActiveTrackModal(track)}
            >
              <div className="space-y-4">
                {/* Header: Track Number & Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent-lime)]">
                    {track.number}
                  </span>
                  <Badge variant="default" size="sm">
                    {track.category}
                  </Badge>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-xl text-white group-hover:text-[var(--color-accent-lime)] transition-colors">
                  {track.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-3">
                  {track.shortDescription}
                </p>

                {/* Themes Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {track.keyThemes.slice(0, 3).map((theme) => (
                    <span
                      key={theme}
                      className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-white/5 text-[var(--color-text-muted)] border border-white/5"
                    >
                      {theme}
                    </span>
                  ))}
                  {track.keyThemes.length > 3 && (
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] self-center">
                      +{track.keyThemes.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[var(--color-text-muted)] group-hover:text-white transition-colors">
                <span>VIEW DOMAIN SPECIFICATION</span>
                <span className="text-[var(--color-accent-lime)] group-hover:translate-x-1 transition-transform">
                  <Icons.ArrowRight size={14} />
                </span>
              </div>
            </GlassPanel>
          ))}
        </div>
      )}

      {/* Track Detail Modal / Drawer */}
      {activeTrackModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="track-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#080B12]/80 backdrop-blur-md transition-opacity duration-200"
            onClick={() => setActiveTrackModal(null)}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <GlassPanel
            variant="highlight"
            padding="none"
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto border-white/20 shadow-2xl animate-fade-up"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-start justify-between gap-4 sticky top-0 bg-[#0F1520]/95 backdrop-blur-xl z-10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent-lime)]">
                    {activeTrackModal.number}
                  </span>
                  <Badge variant="default" size="sm">
                    {activeTrackModal.category}
                  </Badge>
                </div>
                <h3 id="track-modal-title" className="font-heading font-bold text-2xl text-white">
                  {activeTrackModal.title}
                </h3>
              </div>
              <IconButton
                aria-label="Close track details"
                variant="ghost"
                size="sm"
                onClick={() => setActiveTrackModal(null)}
              >
                <Icons.Close size={20} />
              </IconButton>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Detailed Overview */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--color-accent-cyan)] uppercase block">
                  Domain Technical Overview
                </span>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {activeTrackModal.detailedOverview}
                </p>
              </div>

              {/* Opportunity Areas */}
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase block">
                  Sample Opportunity Areas
                </span>
                <ul className="space-y-2">
                  {activeTrackModal.opportunityAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[var(--color-text-secondary)]">
                      <span className="w-4 h-4 rounded-full bg-[rgba(183,255,90,0.15)] flex items-center justify-center text-[var(--color-accent-lime)] shrink-0 mt-0.5">
                        <Icons.Check size={10} />
                      </span>
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Relevant Tech Competencies */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase block">
                  Expected Technical Competencies
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeTrackModal.technicalCompetencies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-[var(--color-text-primary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status Notice Card */}
              <div className="p-4 rounded-xl bg-[rgba(8,11,18,0.7)] border border-white/10 space-y-1">
                <span className="text-[10px] font-mono font-bold text-[var(--color-accent-lime)] uppercase block">
                  {activeTrackModal.statusLabel}
                </span>
                <p className="text-xs text-[var(--color-text-muted)]">
                  Final specific problem briefs and evaluation criteria will be released to verified teams during team check-in at SCET campus.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 border-t border-white/10 flex items-center justify-between bg-white/5">
              <span className="text-xs font-mono text-[var(--color-text-muted)]">
                SCETATHON 2026 // CHALLENGE DIRECTORY
              </span>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setActiveTrackModal(null)}
              >
                Close Specification
              </Button>
            </div>
          </GlassPanel>
        </div>
      )}
    </div>
  );
};

