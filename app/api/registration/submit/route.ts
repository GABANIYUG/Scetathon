import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { submitAtomicRegistration } from "@/lib/dal/registrations";
import { getEventSettings } from "@/lib/dal/settings";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      {
        success: false,
        error: "Supabase database connection is not configured in environment.",
      },
      { status: 503 }
    );
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser();

    if (authErr || !user) {
      return NextResponse.json(
        {
          success: false,
          error: "You must be signed in as a team leader to submit this registration.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { teamName, institutionName, institutionCity, members, consentGiven } = body;

    if (!teamName || !institutionName || !institutionCity || !Array.isArray(members)) {
      return NextResponse.json(
        { success: false, error: "Missing required team registration fields." },
        { status: 400 }
      );
    }

    if (!consentGiven) {
      return NextResponse.json(
        { success: false, error: "Participant privacy and event conduct consent is required." },
        { status: 400 }
      );
    }

    // Check event settings
    const settings = await getEventSettings();
    if (settings.registration_mode !== "open") {
      return NextResponse.json(
        {
          success: false,
          error: `Registration is currently in "${settings.registration_mode}" mode. Live submissions are not accepted.`,
        },
        { status: 403 }
      );
    }

    // Call atomic transaction
    const result = await submitAtomicRegistration({
      teamName,
      institutionName,
      institutionCity,
      members,
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || "Registration transaction failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

