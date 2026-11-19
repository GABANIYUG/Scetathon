import { NextResponse } from "next/server";
import { getPublicAnnouncements } from "@/lib/dal/announcements";

export async function GET() {
  try {
    const data = await getPublicAnnouncements();
    return NextResponse.json({ success: true, data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

