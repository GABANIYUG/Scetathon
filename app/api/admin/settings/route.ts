import { NextResponse } from "next/server";
import { isFacultyAdmin } from "@/lib/auth/permissions";
import { updateEventSettings } from "@/lib/dal/settings";

export async function POST(request: Request) {
  const isAdmin = await isFacultyAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Faculty Administrator privileges required." },
      { status: 403 }
    );
  }

  try {
    const updates = await request.json();
    const result = await updateEventSettings(updates);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

