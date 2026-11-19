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
      className="fixed inset-0 z-50 md:hidden"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#080B12]/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[var(--color-bg-secondary)] border-l border-[var(--color-border-subtle)] p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-out">
        {/* Top bar inside drawer */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[var(--color-border-subtle)]">
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
                  "px-3 py-2.5 rounded-lg text-base font-medium transition-colors",
                  "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-bg-elevated)]"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom CTA & Notice */}
        <div className="pt-6 border-t border-[var(--color-border-subtle)] space-y-4">
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

