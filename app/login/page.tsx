"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const isConfigured = isSupabaseConfigured();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!isConfigured) {
      setErrorMsg(
        "Supabase is not configured. Please supply NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local to enable real authentication."
      );
      return;
    }

    if (!email.trim() || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      // Safe redirect
      const safePath = returnUrl.startsWith("/") && !returnUrl.startsWith("//") ? returnUrl : "/dashboard";
      router.push(safePath);
      router.refresh();
    } catch {
      setErrorMsg("An unexpected authentication error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Badge variant="accent" dot size="sm">
              PORTAL AUTHENTICATION
            </Badge>
          </div>
          <h1 className="text-h2 font-extrabold text-[var(--color-text-primary)]">
            Sign In to SCETATHON
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Access your team roster, application status, or management console.
          </p>
        </div>

        {/* Supabase Not Configured Warning */}
        {!isConfigured && (
          <div
            role="alert"
            className="p-3.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-xs text-amber-200/90 space-y-1"
          >
            <div className="flex items-center gap-2 font-semibold text-amber-300">
              <Icons.AlertTriangle size={15} />
              <span>Database Connection Pending</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Supabase project credentials are not configured in your environment. Real sign-in requires credentials configured in <code>.env.local</code>.
            </p>
          </div>
        )}

        {/* Login Glass Form Card */}
        <GlassPanel variant="elevated" padding="lg" edgeHighlight glow="lime">
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMsg && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-start gap-2"
              >
                <Icons.AlertTriangle size={15} className="shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="login-email"
                className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase"
              >
                Collegiate / Personal Email <span className="text-[var(--color-accent-lime)]">*</span>
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="leader@scet.ac.in"
                className="glass-input w-full h-11 px-4 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="login-password"
                  className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase"
                >
                  Password <span className="text-[var(--color-accent-lime)]">*</span>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-[11px] text-[var(--color-accent-lime)] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="glass-input w-full h-11 px-4 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none"
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              disabled={loading}
              className="mt-2"
            >
              {loading ? "Authenticating…" : "Sign In"}
            </Button>
          </form>

          <div className="pt-4 mt-5 border-t border-white/[0.08] text-center text-xs text-[var(--color-text-secondary)]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[var(--color-accent-lime)] font-semibold hover:underline"
            >
              Create Account
            </Link>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-xs text-[var(--color-text-muted)]">
          Loading authentication portal…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

