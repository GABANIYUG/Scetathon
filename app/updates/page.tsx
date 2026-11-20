import React, { Suspense } from "react";
import { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { AnnouncementFeed } from "@/components/announcements/AnnouncementFeed";
import { EventLiveBanner } from "@/components/operations/EventLiveBanner";
import { getPublicAnnouncements } from "@/lib/dal/announcements";
import { getEventSettings } from "@/lib/dal/settings";

export const metadata: Metadata = {
  title: "Live Bulletins & Event Updates",
  description: "Important news, event announcements, schedule advisories, and operational updates from the SCETATHON organizing team.",
};

export default async function UpdatesPage() {
  const [announcements, settings] = await Promise.all([
    getPublicAnnouncements(),
    getEventSettings(),
  ]);

  return (
    <>
      {/* Live Event Operations Banner */}
      <Suspense fallback={null}>
        <EventLiveBanner
          initialStatus={settings.event_status}
          initialMessage={settings.public_status_message}
        />
      </Suspense>

      <div className="py-12 sm:py-16 md:py-20 space-y-12">
        <Container size="lg">
          {/* Page Hero */}
          <PageHero
            badge="LIVE DISPATCH"
            eyebrow="COMMUNICATIONS & BULLETINS"
            title="STAY IN"
            highlightedTitle="THE LOOP."
            description="Important news, challenge ratifications, checkpoint advisories, and real-time operational updates from the SCETATHON organizing committee."
          />

          {/* Public Announcements Feed */}
          <div className="mt-10">
            <AnnouncementFeed
              announcements={announcements}
              title="Official Event Bulletins"
              description="Authenticated public broadcast stream for all visitors, attendees, and academic partners."
            />
          </div>
        </Container>
      </div>
    </>
  );
}

