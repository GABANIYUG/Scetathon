import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/permissions";
import { markAnnouncementAsRead, markAllAnnouncementsAsRead } from "@/lib/dal/announcements";

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ success: false, error: "Authentication required." }, { status: 401 });
  }

  try {
    const { announcementId, all, announcementIds } = await request.json();

    if (all && Array.isArray(announcementIds)) {
      const result = await markAllAnnouncementsAsRead(user.id, announcementIds);
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    if (!announcementId) {
      return NextResponse.json({ success: false, error: "Announcement ID required." }, { status: 400 });
    }

    const result = await markAnnouncementAsRead(announcementId, user.id);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

