import { createBrowserClient } from "@supabase/ssr";

/**
 * Checks whether valid Supabase environment variables are present.
 * Returns false if missing or placeholder strings.
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
 * Creates a browser-side Supabase client using @supabase/ssr.
 * Only uses public publishable key.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "placeholder-anon-key";

  return createBrowserClient(url, key);
}

