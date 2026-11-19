import { NextResponse } from "next/server";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

/**
 * Health check endpoint for monitoring, load balancers, and DevOps telemetry.
 * Strictly avoids leaking any credentials, keys, database connection strings, or user PII.
 */
export async function GET() {
  const isConfigured = isSupabaseConfigured();
  let dbStatus: "connected" | "offline_fallback" | "error" = "offline_fallback";

  if (isConfigured) {
    try {
      // Safe ping against event_settings singleton
      const supabase = createClient();
      const { error } = await supabase.from("event_settings").select("id").limit(1);
      dbStatus = error ? "error" : "connected";
    } catch {
      dbStatus = "error";
    }
  }

  const payload = {
    status: dbStatus === "error" ? "degraded" : "healthy",
    application: "SCETATHON 24-Hour Hackathon Platform",
    version: "0.1.0",
    uptime_seconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    services: {
      web_server: "online",
      database: dbStatus,
      realtime_engine: isConfigured ? "ready" : "offline_fallback",
      auth_subsystem: isConfigured ? "live" : "preview_mode",
    },
    environment: process.env.NODE_ENV || "development",
  };

  return NextResponse.json(payload, {
    status: 200,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

