"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [consent, setConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const isConfigured = isSupabaseConfigured();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!isConfigured) {
      setErrorMsg(
        "Supabase is not configured. Real account creation requires NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY."
      );
      return;
    }

    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMsg("Please complete all required fields.");
      return;
    }

    if (password.length < 8) {
      setErrorMsg("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (!consent) {
      setErrorMsg("You must accept the participant privacy notice to create an account.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
            phone: phone.trim() || null,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?returnUrl=/dashboard`,
        },
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      if (data.session) {
        // Direct session created (if confirm email disabled)
        setSuccessMsg("Account created successfully! Redirecting to dashboard…");
        router.push("/dashboard");
        router.refresh();
      } else {
        // Email confirmation sent
        setSuccessMsg(
          "Registration verification email sent! Please check your inbox to confirm your address before logging in."
        );
        setLoading(false);
      }
    } catch {
      setErrorMsg("An unexpected error occurred during signup. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <Badge variant="accent" dot size="sm">
              NEW BUILDER ACCOUNT
            </Badge>
          </div>
          <h1 className="text-h2 font-extrabold text-[var(--color-text-primary)]">
            Create Participant Account
          </h1>
          <p className="text-xs text-[var(--color-text-secondary)]">
            Register as a team leader to create and submit a collegiate hackathon squad.
          </p>
        </div>

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
              Real account creation requires valid Supabase environment variables in <code>.env.local</code>.
            </p>
          </div>
        )}

        <GlassPanel variant="elevated" padding="lg" edgeHighlight glow="lime">
          {successMsg ? (
            <div className="py-6 text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-[var(--color-accent-lime-subtle)] border border-[var(--color-accent-lime-border)] flex items-center justify-center text-[var(--color-accent-lime)]">
                <Icons.Check size={24} />
              </div>
              <h2 className="text-base font-bold text-white">Check Your Inbox</h2>
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
            <form onSubmit={handleSignup} className="space-y-4">
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
                  htmlFor="signup-name"
                  className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase"
                >
                  Full Name <span className="text-[var(--color-accent-lime)]">*</span>
                </label>
                <input
                  id="signup-name"
                  type="text"
                  autoComplete="name"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Aarav Patel"
                  className="glass-input w-full h-10 px-3.5 text-xs text-[var(--color-text-primary)] rounded-xl outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="signup-email"
                  className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase"
                >
                  Collegiate Email <span className="text-[var(--color-accent-lime)]">*</span>
                </label>
                <input
                  id="signup-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="aarav@college.edu"
                  className="glass-input w-full h-10 px-3.5 text-xs text-[var(--color-text-primary)] rounded-xl outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="signup-phone"
                  className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase"
                >
                  Mobile Number (Optional)
                </label>
                <input
                  id="signup-phone"
                  type="tel"
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="glass-input w-full h-10 px-3.5 text-xs text-[var(--color-text-primary)] rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label
                    htmlFor="signup-pass"
                    className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase"
                  >
                    Password <span className="text-[var(--color-accent-lime)]">*</span>
                  </label>
                  <input
                    id="signup-pass"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 chars"
                    className="glass-input w-full h-10 px-3.5 text-xs text-[var(--color-text-primary)] rounded-xl outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="signup-confirm"
                    className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase"
                  >
                    Confirm <span className="text-[var(--color-accent-lime)]">*</span>
                  </label>
                  <input
                    id="signup-confirm"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="glass-input w-full h-10 px-3.5 text-xs text-[var(--color-text-primary)] rounded-xl outline-none"
                  />
                </div>
              </div>

              {/* Privacy Consent */}
              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-white/20 bg-white/5 text-[var(--color-accent-lime)] focus:ring-[var(--color-accent-lime)]"
                />
                <span className="text-[11px] text-[var(--color-text-secondary)] leading-relaxed">
                  I agree to the SCETATHON data privacy and hackathon event conduct guidelines.
                </span>
              </label>

              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                disabled={loading}
                className="mt-2"
              >
                {loading ? "Creating Account…" : "Create Account"}
              </Button>
            </form>
          )}

          <div className="pt-4 mt-5 border-t border-white/[0.08] text-center text-xs text-[var(--color-text-secondary)]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[var(--color-accent-lime)] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

