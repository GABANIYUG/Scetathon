"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Icons } from "@/components/ui/icons";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { MobileNav } from "@/components/layout/MobileNav";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;
  const pathname = usePathname();

  useEffect(() => {
    if (!isSupabaseConfigured()) return;
    try {
      const supabase = createClient();
      supabase.auth.getSession().then(({ data }) => {
        setHasSession(Boolean(data.session));
      });

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setHasSession(Boolean(session));
      });

      return () => {
        subscription.unsubscribe();
      };
    } catch {
      // Ignore if offline
    }
  }, []);

  // Route-aware active item determination
  const isNavActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-[#080B12]/80 backdrop-blur-2xl border-b border-white/10 py-3 shadow-[0_12px_36px_-8px_rgba(0,0,0,0.8)]"
            : "bg-[#080B12]/40 backdrop-blur-md border-b border-white/5 py-4 sm:py-5"
        )}
      >
        <Container size="lg">
          <div className="flex items-center justify-between">
            {/* Brand Logo with App Router Link */}
            <Link
              href="/"
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-lime)] rounded-md transition-opacity hover:opacity-90"
              aria-label="SCETATHON Home"
            >
              <BrandLogo size="md" />
            </Link>

            {/* Desktop Navigation using Next.js Link & usePathname Active State */}
            <nav
              className="hidden md:flex items-center space-x-1 lg:space-x-1.5 p-1 rounded-full bg-[rgba(21,29,42,0.6)] border border-white/10 backdrop-blur-xl shadow-inner"
              aria-label="Main Navigation"
            >
              {siteConfig.navigation.map((item) => {
                const active = isNavActive(item.href);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-1.5 text-xs lg:text-sm font-medium tracking-wide rounded-full transition-all duration-200 select-none",
                      active
                        ? "text-[var(--color-accent-lime)] bg-white/10 font-semibold shadow-[0_0_16px_rgba(183,255,90,0.2)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5"
                    )}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-0.5 rounded-full bg-[var(--color-accent-lime)] shadow-[0_0_8px_var(--color-accent-lime)]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              {hasSession ? (
                <Link
                  href="/dashboard"
                  className={cn(
                    "text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 flex items-center gap-1.5",
                    pathname.startsWith("/dashboard")
                      ? "bg-[var(--color-accent-lime-subtle)] text-[var(--color-accent-lime)] border-[var(--color-accent-lime-border)]"
                      : "text-[var(--color-text-secondary)] hover:text-white border-white/10 hover:border-white/20"
                  )}
                >
                  <Icons.Users size={14} />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="text-xs font-semibold text-[var(--color-text-secondary)] hover:text-white px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
                >
                  Sign In
                </Link>
              )}

              {siteConfig.registration.isOpen ? (
                <Button
                  href={siteConfig.registration.href}
                  size="sm"
                  variant="primary"
                  rightIcon={<Icons.ArrowRight size={14} />}
                  className="shadow-[0_0_20px_-4px_rgba(183,255,90,0.35)]"
                >
                  {siteConfig.registration.ctaText}
                </Button>
              ) : (
                <div className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-[var(--color-text-muted)]">
                  Registration Soon
                </div>
              )}
            </div>

            {/* Mobile Navigation Trigger */}
            <div className="flex md:hidden items-center space-x-2">
              <IconButton
                aria-label={mobileMenuOpen ? "Close navigation" : "Open navigation"}
                variant="outline"
                size="md"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <Icons.Close size={20} /> : <Icons.Menu size={20} />}
              </IconButton>
            </div>
          </div>
        </Container>
      </header>

      {/* Accessible Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};
