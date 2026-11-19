import { createBrowserClient } from "@supabase/ssr";
import { isSupabaseConfigured, getSupabaseUrl, getSupabaseAnonKey } from "./config";

export { isSupabaseConfigured };

/**
 * Creates a browser-side Supabase client using @supabase/ssr.
 * Only uses public publishable key.
 */
export function createClient() {
  const url = getSupabaseUrl();
  const key = getSupabaseAnonKey();

  return createBrowserClient(url, key);
}
