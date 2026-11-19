import { EventOperationalStatus, AnnouncementPriority, AnnouncementCategory, AnnouncementVisibility } from "@/lib/types/database";

export interface StatusConfig {
  key: EventOperationalStatus;
  label: string;
  badgeLabel: string;
  description: string;
  badgeVariant: "default" | "accent" | "success" | "warning" | "outline";
  accentColor: string;
  isLive: boolean;
}

export const EVENT_STATUSES: Record<EventOperationalStatus, StatusConfig> = {
  preparing: {
    key: "preparing",
    label: "Preparing",
    badgeLabel: "PREPARING FOR LAUNCH",
    description: "Pre-hackathon setup, squad registration review, and infrastructure provisioning in progress.",
    badgeVariant: "accent",
    accentColor: "var(--color-accent-lime)",
    isLive: false,
  },
  live: {
    key: "live",
    label: "Live Now",
    badgeLabel: "24-HOUR HACKATHON LIVE",
    description: "SCETATHON is currently underway! Mentorship rotations, checkpoints, and hack sprints active.",
    badgeVariant: "success",
    accentColor: "#22c55e",
    isLive: true,
  },
  paused: {
    key: "paused",
    label: "Temporarily Paused",
    badgeLabel: "OPERATIONS PAUSED",
    description: "Brief operational pause for ceremony, system synchronization, or keynote address.",
    badgeVariant: "warning",
    accentColor: "#f59e0b",
    isLive: false,
  },
  completed: {
    key: "completed",
    label: "Completed",
    badgeLabel: "EVENT CONCLUDED",
    description: "SCETATHON 24-hour sprint has concluded. Project judging and closing ceremony complete.",
    badgeVariant: "default",
    accentColor: "var(--color-text-muted)",
    isLive: false,
  },
};

export const ANNOUNCEMENT_PRIORITIES: Record<
  AnnouncementPriority,
  {
    label: string;
    description: string;
    badgeVariant: "default" | "accent" | "warning";
    borderClass: string;
    glowClass: string;
  }
> = {
  Normal: {
    label: "Normal",
    description: "Standard informative event update or schedule advisory.",
    badgeVariant: "default",
    borderClass: "border-white/10",
    glowClass: "",
  },
  Important: {
    label: "Important",
    description: "High-priority alert regarding milestones, submissions, or checkpoints.",
    badgeVariant: "accent",
    borderClass: "border-[var(--color-accent-lime)]/40",
    glowClass: "shadow-[0_0_24px_-6px_rgba(183,255,90,0.15)]",
  },
  Urgent: {
    label: "Urgent",
    description: "Immediate operational announcement requiring participant attention.",
    badgeVariant: "warning",
    borderClass: "border-amber-500/50",
    glowClass: "shadow-[0_0_24px_-6px_rgba(245,158,11,0.25)]",
  },
};

export const ANNOUNCEMENT_CATEGORIES: AnnouncementCategory[] = [
  "General",
  "Registration",
  "Challenges",
  "Schedule",
  "Important Notice",
  "Event Operations",
];

export const ANNOUNCEMENT_AUDIENCES: Record<
  AnnouncementVisibility,
  {
    label: string;
    audienceDescription: string;
    targetScope: "public" | "teams" | "committee";
    badgeText: string;
  }
> = {
  "Public Website": {
    label: "Public Website",
    audienceDescription: "Visible to all website visitors on the homepage and /updates feed.",
    targetScope: "public",
    badgeText: "PUBLIC BROADCAST",
  },
  "Registered Teams Only": {
    label: "Registered Teams Only",
    audienceDescription: "Restricted to verified squad leaders and registered participants.",
    targetScope: "teams",
    badgeText: "REGISTERED SQUADS",
  },
  "Internal Committee Only": {
    label: "Internal Committee Only",
    audienceDescription: "Restricted strictly to Organizing Committee and Technical Leads.",
    targetScope: "committee",
    badgeText: "COMMITTEE CONFIDENTIAL",
  },
};

