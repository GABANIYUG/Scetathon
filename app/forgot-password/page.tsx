"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const isConfigured = isSupabaseConfigured();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!isConfigured) {
      setErrorMsg(
        "Supabase is not configured. Password recovery requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
      );
      return;
    }

    if (!email.trim()) {
      setErrorMsg("Please enter your registered email address.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/auth/callback?returnUrl=/dashboard`,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      setSuccessMsg(
        "If an account is associated with this email, a password recovery link has been dispatched to your inbox."
      );
      setLoading(false);
    } catch {
      setErrorMsg("Failed to initiate password reset. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Badge variant="accent" dot size="sm">
              PASSWORD RECOVERY
            </Badge>
          </div>
          <h1 className="text-h2 font-extrabold text-[var(--color-text-primary)]">
            Reset Password
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Enter your collegiate email to receive secure recovery instructions.
          </p>
        </div>

        <GlassPanel variant="elevated" padding="lg" edgeHighlight glow="lime">
          {successMsg ? (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-[var(--color-accent-lime-subtle)] border border-[var(--color-accent-lime-border)] flex items-center justify-center text-[var(--color-accent-lime)]">
                <Icons.Check size={24} />
              </div>
              <h2 className="text-base font-bold text-white">Recovery Email Dispatched</h2>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {successMsg}
              </p>
              <div className="pt-2">
                <Button href="/login" variant="primary" size="md">
                  Return to Sign In
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
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
                  htmlFor="reset-email"
                  className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase"
                >
                  Registered Email Address <span className="text-[var(--color-accent-lime)]">*</span>
                </label>
                <input
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="leader@scet.ac.in"
                  className="glass-input w-full h-11 px-4 text-xs text-[var(--color-text-primary)] rounded-xl outline-none"
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
                {loading ? "Sending Link…" : "Send Recovery Link"}
              </Button>
            </form>
          )}

          <div className="pt-4 mt-5 border-t border-white/[0.08] text-center text-xs text-[var(--color-text-secondary)]">
            Remember your credentials?{" "}
            <Link
              href="/login"
              className="text-[var(--color-accent-lime)] font-semibold hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

