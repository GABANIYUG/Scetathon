/**
 * Pure environment configuration utilities for Supabase.
 * Safe to import in both Server Components, Client Components, Route Handlers, and Proxy.
 * Does NOT import next/headers or @supabase/ssr.
 */

/**
 * Checks whether valid, non-placeholder Supabase environment variables are present.
 * Returns false if missing, empty, or using default placeholder strings.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) return false;
  if (url.includes("your-project-ref") || key.includes("your-anon-publishable-key")) {
    return false;
  }
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns the public Supabase URL or a safe fallback placeholder.
 */
export function getSupabaseUrl(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
}

/**
 * Returns the public Supabase Anon / Publishable key or a safe fallback placeholder.
 */
export function getSupabaseAnonKey(): string {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "placeholder-anon-key";
}

