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
import { cn } from "@/lib/utils";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 20;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200 border-b",
          isScrolled
            ? "bg-[rgba(8,11,18,0.85)] backdrop-blur-md border-[var(--color-border-subtle)] py-3 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.6)]"
            : "bg-transparent border-transparent py-5"
        )}
      >
        <Container size="lg">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <a
              href="#home"
              className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-lime)] rounded-md"
            >
              <BrandLogo size="md" />
            </a>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-1 lg:space-x-2"
              aria-label="Main Navigation"
            >
              {siteConfig.navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="px-3.5 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-md hover:bg-white/5"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                href={siteConfig.registration.href}
                size="md"
                variant="primary"
                rightIcon={<Icons.ArrowRight size={15} />}
              >
                {siteConfig.registration.ctaText}
              </Button>
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

