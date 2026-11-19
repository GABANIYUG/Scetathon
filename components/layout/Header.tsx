"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { Icons } from "@/components/ui/icons";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { MobileNav } from "@/components/layout/MobileNav";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;

  const sectionIds = ["home", "about", "challenges", "experience", "schedule"];
  const activeSection = useActiveSection(sectionIds, 160);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "bg-[#080B12]/75 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.7)]"
            : "bg-transparent border-b border-transparent py-5"
        )}
      >
        <Container size="lg">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#home"
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-lime)] rounded-md transition-opacity hover:opacity-90"
              aria-label="SCETATHON Home"
            >
              <BrandLogo size="md" />
            </a>

            {/* Desktop Navigation with Active Indicators */}
            <nav
              className="hidden md:flex items-center space-x-1 lg:space-x-1.5 p-1 rounded-full bg-[rgba(21,29,42,0.45)] border border-white/5 backdrop-blur-md"
              aria-label="Main Navigation"
            >
              {siteConfig.navigation.map((item) => {
                const targetId = item.href.replace("#", "");
                const isActive = activeSection === targetId;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-1.5 text-xs lg:text-sm font-medium tracking-wide rounded-full transition-all duration-200 select-none",
                      isActive
                        ? "text-[var(--color-accent-lime)] bg-white/5 font-semibold shadow-[0_0_12px_rgba(183,255,90,0.15)]"
                        : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5"
                    )}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full bg-[var(--color-accent-lime)] shadow-[0_0_8px_var(--color-accent-lime)]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
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
                <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-[var(--color-text-muted)]">
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
