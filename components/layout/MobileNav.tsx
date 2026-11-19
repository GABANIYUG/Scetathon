"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Icons } from "@/components/ui/icons";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { cn } from "@/lib/utils";

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const isNavActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Close on ESC key and trap body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      ref={dialogRef}
      className="fixed inset-0 z-50 md:hidden animate-fade-in"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#080B12]/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Glass Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#0F1520]/95 backdrop-blur-2xl border-l border-white/10 p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out z-10">
        {/* Top bar inside drawer */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link href="/" onClick={onClose}>
              <BrandLogo size="sm" />
            </Link>
            <IconButton
              aria-label="Close menu"
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <Icons.Close size={20} />
            </IconButton>
          </div>

          {/* Navigation Links using App Router Link */}
          <nav className="mt-8 flex flex-col space-y-2">
            {siteConfig.navigation.map((item) => {
              const active = isNavActive(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "px-3.5 py-3 rounded-xl text-base font-medium transition-all duration-200 select-none",
                    active
                      ? "text-[var(--color-accent-lime)] bg-white/10 font-semibold border border-[var(--color-accent-lime)]/30"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5",
                    "flex items-center justify-between group"
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-lime)] shadow-[0_0_8px_#B7FF5A]" />
                    )}
                    <span>{item.label}</span>
                  </span>
                  <Icons.ArrowRight
                    size={14}
                    className={cn(
                      "transition-colors",
                      active ? "text-[var(--color-accent-lime)]" : "text-white/20 group-hover:text-white"
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom CTA & Notice */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/login"
              onClick={onClose}
              className="py-2.5 px-3 rounded-lg border border-white/15 bg-white/5 text-center text-xs font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/dashboard"
              onClick={onClose}
              className="py-2.5 px-3 rounded-lg border border-[var(--color-accent-lime-border)] bg-[var(--color-accent-lime-subtle)] text-center text-xs font-semibold text-[var(--color-accent-lime)] hover:bg-[var(--color-accent-lime)] hover:text-[var(--color-bg-primary)] transition-colors"
            >
              Dashboard
            </Link>
          </div>

          <Button
            href={siteConfig.registration.href}
            fullWidth
            size="lg"
            variant="primary"
            onClick={onClose}
          >
            {siteConfig.registration.ctaText}
          </Button>

          <div className="text-[11px] text-[var(--color-text-muted)] text-center font-mono space-y-1">
            <p className="text-white/80 font-medium">
              {siteConfig.institution.shortName} · {siteConfig.institution.city}
            </p>
            <p>{siteConfig.tagline}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
