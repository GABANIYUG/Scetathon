"use client";

import React, { useEffect, useRef } from "react";
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

  // Close on ESC key
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
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#0F1520]/90 backdrop-blur-2xl border-l border-white/10 p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out">
        {/* Top bar inside drawer */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <BrandLogo size="sm" />
            <IconButton
              aria-label="Close menu"
              variant="ghost"
              size="sm"
              onClick={onClose}
            >
              <Icons.Close size={20} />
            </IconButton>
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 flex flex-col space-y-2">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "px-3.5 py-3 rounded-xl text-base font-medium transition-all duration-200",
                  "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5",
                  "flex items-center justify-between group"
                )}
              >
                <span>{item.label}</span>
                <Icons.ArrowRight size={14} className="text-white/20 group-hover:text-[var(--color-accent-lime)] transition-colors" />
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom CTA & Notice */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <Button
            href={siteConfig.registration.href}
            fullWidth
            size="lg"
            variant="primary"
            onClick={onClose}
          >
            {siteConfig.registration.ctaText}
          </Button>

          <p className="text-[11px] text-[var(--color-text-muted)] text-center font-mono">
            {siteConfig.institution.shortName} · {siteConfig.institution.location}
          </p>
        </div>
      </div>
    </div>
  );
};
