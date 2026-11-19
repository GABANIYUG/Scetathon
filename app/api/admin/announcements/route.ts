import { NextResponse } from "next/server";
import { isStudentLead, isFacultyAdmin } from "@/lib/auth/permissions";
import {
  getAdminAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  publishAnnouncement,
  archiveAnnouncement,
} from "@/lib/dal/announcements";

export async function GET() {
  const isLead = await isStudentLead();
  if (!isLead) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 403 });
  }

  try {
    const data = await getAdminAnnouncements();
    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isLead = await isStudentLead();
  if (!isLead) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, summary, content, category, visibility, priority, status, authorLabel } = body;

    if (!title?.trim() || !summary?.trim() || !content?.trim()) {
      return NextResponse.json(
        { success: false, error: "Title, summary, and content are required." },
        { status: 400 }
      );
    }

    // Publishing Internal Committee Only requires Faculty Admin
    if (visibility === "Internal Committee Only" && status === "published") {
      const isAdmin = await isFacultyAdmin();
      if (!isAdmin) {
        return NextResponse.json(
          { success: false, error: "Only Faculty Administrators can publish Internal Committee broadcasts." },
          { status: 403 }
        );
      }
    }

    const result = await createAnnouncement({
      title,
      summary,
      content,
      category: category || "General",
      visibility: visibility || "Public Website",
      priority: priority || "Normal",
      status: status || "draft",
      authorLabel,
    });

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const isLead = await isStudentLead();
  if (!isLead) {
    return NextResponse.json({ success: false, error: "Unauthorized." }, { status: 403 });
  }

  try {
    const { id, action, updates } = await request.json();

    if (!id) {
      return NextResponse.json({ success: false, error: "Announcement ID is required." }, { status: 400 });
    }

    if (action === "publish") {
      const result = await publishAnnouncement(id);
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, data: result.data });
    }

    if (action === "archive") {
      const result = await archiveAnnouncement(id);
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      return NextResponse.json({ success: true });
    }

    if (updates) {
      const result = await updateAnnouncement(id, updates);
      if (!result.success) {
        return NextResponse.json({ success: false, error: result.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, data: result.data });
    }

    return NextResponse.json({ success: false, error: "Invalid action." }, { status: 400 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

