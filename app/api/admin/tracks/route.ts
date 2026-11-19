import { NextResponse } from "next/server";
import { isStudentLead, isFacultyAdmin } from "@/lib/auth/permissions";
import { saveTrack } from "@/lib/dal/event-content";

export async function POST(request: Request) {
  const isLead = await isStudentLead();
  if (!isLead) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Organizer access required." },
      { status: 403 }
    );
  }

  try {
    const track = await request.json();

    // Publishing requires Faculty Admin
    if (track.approval_status === "published") {
      const isAdmin = await isFacultyAdmin();
      if (!isAdmin) {
        return NextResponse.json(
          { success: false, error: "Only Faculty Administrators can publish tracks to live visitors." },
          { status: 403 }
        );
      }
    }

    const result = await saveTrack(track);
    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

