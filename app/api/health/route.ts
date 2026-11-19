import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

/**
 * Health check endpoint for monitoring, load balancers, and DevOps telemetry.
 * Next.js 16 Cache Components compatible: no legacy segment configs (e.g. export const dynamic).
 * Dynamic execution is ensured via request context and Cache-Control: no-store response headers.
 * Strictly avoids leaking any credentials, keys, database connection strings, or user PII.
 */
export async function GET(request: Request) {
  // Access request URL to ensure dynamic execution under Cache Components
  const _reqUrl = request.url;
  void _reqUrl;

  const isConfigured = isSupabaseConfigured();
  let dbStatus: "connected" | "offline_fallback" | "error" = "offline_fallback";

  if (isConfigured) {
    try {
      // Safe ping against event_settings singleton using server client
      const supabase = await createClient();
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
