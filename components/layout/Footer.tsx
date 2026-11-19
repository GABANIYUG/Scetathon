import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { IconButton } from "@/components/ui/IconButton";
import { Icons } from "@/components/ui/icons";

export const Footer: React.FC = () => {
  const currentYear = 2026;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "GitHub":
        return <Icons.GitHub size={17} />;
      case "LinkedIn":
        return <Icons.LinkedIn size={17} />;
      case "Twitter / X":
        return <Icons.TwitterX size={15} />;
      case "Discord":
        return <Icons.Discord size={17} />;
      default:
        return <Icons.ExternalLink size={16} />;
    }
  };

  return (
    <footer className="w-full border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-secondary)] mt-auto relative z-10">
      <Container size="lg" className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Mission Column */}
          <div className="md:col-span-5 space-y-4">
            <BrandLogo size="md" showTagline />
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed max-w-sm">
              The premier 24-hour inter-college hackathon hosted at{" "}
              <span className="text-[var(--color-text-primary)] font-medium">
                {siteConfig.institution.fullName}
              </span>
              , bringing together emerging developers, designers, and innovators.
            </p>
            <div className="flex items-center space-x-2 pt-2">
              {siteConfig.socials.map((social) => (
                <IconButton
                  key={social.platform}
                  href={social.href}
                  isExternal
                  aria-label={social.ariaLabel}
                  variant="outline"
                  size="sm"
                >
                  {getSocialIcon(social.platform)}
                </IconButton>
              ))}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
              Event Navigation
            </h4>
            <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
              {siteConfig.navigation.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-[var(--color-accent-lime)] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/updates"
                  className="hover:text-[var(--color-accent-lime)] transition-colors flex items-center gap-1.5"
                >
                  <span>Live Bulletins</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-lime)] animate-pulse" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Institutional Info & Verification Notice */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-text-primary)]">
              Venue & Host
            </h4>
            <div className="space-y-1.5 text-sm text-[var(--color-text-secondary)]">
              <p className="font-medium text-[var(--color-text-primary)]">
                {siteConfig.institution.fullName} ({siteConfig.institution.shortName})
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {siteConfig.institution.location}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-muted)] leading-relaxed">
              {siteConfig.eventDetailsNotice}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--color-border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <p>
            © {currentYear} {siteConfig.name}. All rights reserved. Organized at{" "}
            {siteConfig.institution.shortName}, Surat.
          </p>
          <div className="flex items-center space-x-6 font-mono text-[11px]">
            <a href="/design-system" className="hover:text-[var(--color-accent-lime)] transition-colors underline-offset-4 hover:underline">
              DESIGN SYSTEM SPEC
            </a>
            <span className="text-[var(--color-accent-lime)]">PHASE 2: HOMEPAGE LIVE</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
