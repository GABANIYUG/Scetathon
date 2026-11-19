import { NextResponse } from "next/server";
import { isFacultyAdmin } from "@/lib/auth/permissions";
import { updateEventStatus } from "@/lib/dal/operations";
import { EventOperationalStatus } from "@/lib/types/database";

export async function POST(request: Request) {
  const isAdmin = await isFacultyAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized: Faculty Administrator privileges required to change event status." },
      { status: 403 }
    );
  }

  try {
    const { status, message } = await request.json();

    if (!status || !["preparing", "live", "paused", "completed"].includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid operational status provided." },
        { status: 400 }
      );
    }

    const result = await updateEventStatus(status as EventOperationalStatus, message);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

