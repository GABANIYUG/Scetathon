import React from "react";
import { Metadata } from "next";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { OperationsOverview } from "@/components/operations/OperationsOverview";
import { getEventSettings } from "@/lib/dal/settings";
import {
  getOperationsReadiness,
  getAnnouncementMetrics,
} from "@/lib/dal/operations";
import { getAdminAnnouncements } from "@/lib/dal/announcements";

export const metadata: Metadata = {
  title: "Event Operations Center | Admin Control",
  description: "Control event status, coordinate important updates and keep participants informed throughout SCETATHON.",
};

export default async function AdminOperationsPage() {
  const [settings, health, metrics, announcements] = await Promise.all([
    getEventSettings(),
    getOperationsReadiness(),
    getAnnouncementMetrics(),
    getAdminAnnouncements(),
  ]);

  return (
    <div className="space-y-8">
      <AdminPageHeader
        badge="REALTIME COMMAND"
        badgeVariant="accent"
        eyebrow="EVENT DISPATCH & LIVE CONTROL"
        title="Event Operations Center"
        description="Control event status, coordinate important updates and keep participants informed throughout SCETATHON."
      />

      <OperationsOverview
        initialSettings={settings}
        health={health}
        metrics={metrics}
        recentAnnouncements={announcements}
      />
    </div>
  );
}

