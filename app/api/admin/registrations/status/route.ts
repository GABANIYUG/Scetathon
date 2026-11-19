import { NextResponse } from "next/server";
import { isFacultyAdmin } from "@/lib/auth/permissions";
import { updateRegistrationStatus } from "@/lib/dal/registrations";
import { RegistrationStatus } from "@/lib/types/database";

export async function POST(request: Request) {
  const isAdmin = await isFacultyAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Only Faculty Admins can review registrations." },
      { status: 403 }
    );
  }

  try {
    const { registrationId, status, reviewNote } = await request.json();

    if (!registrationId || !status) {
      return NextResponse.json(
        { success: false, error: "Missing registration ID or status" },
        { status: 400 }
      );
    }

    const result = await updateRegistrationStatus(
      registrationId,
      status as RegistrationStatus,
      reviewNote
    );

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

