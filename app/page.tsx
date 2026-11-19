import React from "react";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconButton } from "@/components/ui/IconButton";
import { Icons } from "@/components/ui/icons";
import { BackgroundGrid } from "@/components/visual/BackgroundGrid";
import { SectionDivider } from "@/components/visual/SectionDivider";

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-[var(--color-bg-primary)] overflow-x-hidden">
      {/* Background visual foundation with subtle grid & controlled glow */}
      <BackgroundGrid variant="grid" glowLime glowCyan />

      {/* Global Application Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        {/* Foundation Hero Section */}
        <section id="home" className="pt-16 pb-20 md:pt-24 md:pb-28">
          <Container size="lg">
            <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-6">
              {/* Event Status Badge */}
              <div className="inline-flex items-center gap-2">
                <Badge variant="accent" dot size="md">
                  Phase 1 · Foundation & Design System
                </Badge>
                <Badge variant="default" size="md">
                  {siteConfig.institution.shortName} · Surat
                </Badge>
              </div>

              {/* Main Headline */}
              <h1 className="text-display text-[var(--color-text-primary)] font-bold tracking-tight">
                Architecting the Future of{" "}
                <span className="text-[var(--color-accent-lime)] glow-text-lime">
                  Collegiate Innovation
                </span>
              </h1>

              {/* Verified Event Positioning Statement */}
              <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl">
                The official design system and platform foundation for{" "}
                <span className="text-[var(--color-text-primary)] font-semibold">
                  {siteConfig.name}
                </span>{" "}
                — a 24-hour inter-college hackathon hosted at{" "}
                <span className="text-[var(--color-text-primary)] font-medium">
                  {siteConfig.institution.fullName}
                </span>
                .
              </p>

              {/* Interactive Action Foundation */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Button
                  href="#components"
                  size="lg"
                  variant="primary"
                  rightIcon={<Icons.ArrowRight size={18} />}
                >
                  Explore Component Foundation
                </Button>
                <Button
                  href="#tokens"
                  size="lg"
                  variant="outline"
                  leftIcon={<Icons.Terminal size={18} />}
                >
                  View Design Tokens
                </Button>
              </div>

              {/* Verified Metadata Strip */}
              <div className="w-full pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-[var(--color-border-subtle)] text-left">
                <div className="p-3">
                  <span className="text-caption block text-[var(--color-text-muted)]">Event Format</span>
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">24-Hour Hackathon</span>
                </div>
                <div className="p-3">
                  <span className="text-caption block text-[var(--color-text-muted)]">Host Campus</span>
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">SCET, Surat</span>
                </div>
                <div className="p-3">
                  <span className="text-caption block text-[var(--color-text-muted)]">Tech Stack</span>
                  <span className="text-sm font-semibold text-[var(--color-text-primary)]">Next.js 16 + Tailwind v4</span>
                </div>
                <div className="p-3">
                  <span className="text-caption block text-[var(--color-text-muted)]">System Status</span>
                  <span className="text-sm font-semibold text-[var(--color-accent-lime)]">Phase 1 Complete</span>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* Section: Design Tokens & Color Palette */}
        <section id="tokens" className="py-16 md:py-20">
          <Container size="lg">
            <SectionHeading
              eyebrow="Color Architecture"
              title="Restrained & Intentional Palette"
              description="Built with CSS variables and centralized design tokens. Electric lime and cyan accents focus user attention without visual noise."
              align="center"
              className="mb-12"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Primary Background */}
              <Card variant="subtle" className="space-y-4">
                <div className="h-20 rounded-lg bg-[#080B12] border border-white/10 flex items-center justify-between px-4">
                  <span className="text-xs font-mono text-[#F4F7FA]">#080B12</span>
                  <span className="text-[11px] font-mono text-[var(--color-text-muted)]">PRIMARY BG</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Deep Obsidian Void</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Primary background for high contrast readability and modern dark-mode aesthetic.
                  </p>
                </div>
              </Card>

              {/* Secondary Background */}
              <Card variant="subtle" className="space-y-4">
                <div className="h-20 rounded-lg bg-[#0F1520] border border-white/10 flex items-center justify-between px-4">
                  <span className="text-xs font-mono text-[#F4F7FA]">#0F1520</span>
                  <span className="text-[11px] font-mono text-[var(--color-text-muted)]">SECONDARY BG</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Dark Charcoal Navy</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Secondary depth layer used for footers, drawer menus, and section delineation.
                  </p>
                </div>
              </Card>

              {/* Elevated Surface */}
              <Card variant="subtle" className="space-y-4">
                <div className="h-20 rounded-lg bg-[#151D2A] border border-white/10 flex items-center justify-between px-4">
                  <span className="text-xs font-mono text-[#F4F7FA]">#151D2A</span>
                  <span className="text-[11px] font-mono text-[var(--color-text-muted)]">ELEVATED SURFACE</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Elevated Slate Card</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Tactile surface for cards, dialogs, and modular interactive containers.
                  </p>
                </div>
              </Card>

              {/* Electric Lime Accent */}
              <Card variant="subtle" className="space-y-4">
                <div className="h-20 rounded-lg bg-[#B7FF5A] flex items-center justify-between px-4 shadow-[0_0_24px_-4px_rgba(183,255,90,0.35)]">
                  <span className="text-xs font-mono font-bold text-[#080B12]">#B7FF5A</span>
                  <span className="text-[11px] font-mono font-bold text-[#080B12]">PRIMARY ACCENT</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-accent-lime)]">Electric Lime</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Primary action color. Used for high-priority CTA buttons, active states, and key highlights.
                  </p>
                </div>
              </Card>

              {/* Electric Cyan Accent */}
              <Card variant="subtle" className="space-y-4">
                <div className="h-20 rounded-lg bg-[#65D9F2] flex items-center justify-between px-4 shadow-[0_0_24px_-4px_rgba(101,217,242,0.35)]">
                  <span className="text-xs font-mono font-bold text-[#080B12]">#65D9F2</span>
                  <span className="text-[11px] font-mono font-bold text-[#080B12]">SECONDARY ACCENT</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-accent-cyan)]">Electric Cyan</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Secondary accent for technical signals, informational badges, and secondary lighting.
                  </p>
                </div>
              </Card>

              {/* Text Hierarchy */}
              <Card variant="subtle" className="space-y-4">
                <div className="h-20 rounded-lg bg-[#151D2A] border border-white/10 flex flex-col justify-center px-4 space-y-1">
                  <span className="text-xs font-semibold text-[#F4F7FA]">Primary: #F4F7FA</span>
                  <span className="text-xs text-[#A1ACBA]">Secondary: #A1ACBA</span>
                  <span className="text-xs text-[#687586]">Muted: #687586</span>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Calculated Contrast</h4>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                    Complies with WCAG AAA accessibility standards against dark backgrounds.
                  </p>
                </div>
              </Card>
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* Section: Typography System */}
        <section id="typography" className="py-16 md:py-20">
          <Container size="lg">
            <SectionHeading
              eyebrow="Typography Hierarchy"
              title="Space Grotesk & Inter"
              description="A confident heading typeface paired with an ultra-legible body font, loaded through next/font for zero layout shift."
              className="mb-12"
            />

            <div className="space-y-8">
              <Card variant="default" className="space-y-6">
                <div className="border-b border-[var(--color-border-subtle)] pb-4 flex items-baseline justify-between">
                  <span className="text-xs font-mono text-[var(--color-accent-lime)]">Display Heading</span>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">Space Grotesk · 700</span>
                </div>
                <div className="text-display text-[var(--color-text-primary)]">
                  SCETATHON 2026
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="default" className="space-y-4">
                  <div className="border-b border-[var(--color-border-subtle)] pb-3 flex items-baseline justify-between">
                    <span className="text-xs font-mono text-[var(--color-accent-lime)]">Heading 1</span>
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">36px–48px</span>
                  </div>
                  <div className="text-h1 text-[var(--color-text-primary)]">
                    24 Hours of Continuous Code
                  </div>
                </Card>

                <Card variant="default" className="space-y-4">
                  <div className="border-b border-[var(--color-border-subtle)] pb-3 flex items-baseline justify-between">
                    <span className="text-xs font-mono text-[var(--color-accent-lime)]">Heading 2</span>
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">28px–36px</span>
                  </div>
                  <div className="text-h2 text-[var(--color-text-primary)]">
                    Inter-College Engineering League
                  </div>
                </Card>

                <Card variant="default" className="space-y-4">
                  <div className="border-b border-[var(--color-border-subtle)] pb-3 flex items-baseline justify-between">
                    <span className="text-xs font-mono text-[var(--color-accent-lime)]">Heading 3</span>
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">20px–24px</span>
                  </div>
                  <div className="text-h3 text-[var(--color-text-primary)]">
                    Problem Statements & Tracks
                  </div>
                </Card>

                <Card variant="default" className="space-y-4">
                  <div className="border-b border-[var(--color-border-subtle)] pb-3 flex items-baseline justify-between">
                    <span className="text-xs font-mono text-[var(--color-accent-lime)]">Heading 4</span>
                    <span className="text-xs font-mono text-[var(--color-text-muted)]">18px</span>
                  </div>
                  <div className="text-h4 text-[var(--color-text-primary)]">
                    Technical Specifications & Guidelines
                  </div>
                </Card>
              </div>

              {/* Body & Caption Demonstration */}
              <Card variant="default" className="space-y-4">
                <div className="border-b border-[var(--color-border-subtle)] pb-3 flex items-baseline justify-between">
                  <span className="text-xs font-mono text-[var(--color-accent-lime)]">Body Text & Captions</span>
                  <span className="text-xs font-mono text-[var(--color-text-muted)]">Inter · 400 & 500</span>
                </div>
                <div className="space-y-3">
                  <p className="text-body-lg">
                    <strong className="text-[var(--color-text-primary)]">Body Large (18px):</strong> SCETATHON brings forward the brightest engineering minds to prototype real-world solutions across 24 intense hours of collaborative problem-solving.
                  </p>
                  <p className="text-body">
                    <strong className="text-[var(--color-text-primary)]">Body Regular (16px):</strong> Every element of this interface is intentionally styled for readability, speed, and responsive fluidity across mobile, tablet, and desktop viewports.
                  </p>
                  <p className="text-caption">
                    Caption Style: 12px uppercase mono tracking-wide label metadata
                  </p>
                </div>
              </Card>
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* Section: Reusable Component Foundation */}
        <section id="components" className="py-16 md:py-20">
          <Container size="lg">
            <SectionHeading
              eyebrow="Component Foundation"
              title="Polished, Accessible UI Components"
              description="A small, robust foundation of modular components engineered with keyboard navigation, visible focus indicators, and state variations."
              className="mb-12"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Button System */}
              <Card variant="default" className="space-y-6">
                <CardHeader>
                  <CardTitle>Button System</CardTitle>
                  <CardDescription>
                    Supports Primary, Secondary, Outline, and Ghost variants across Small, Medium, and Large sizes.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Variants */}
                  <div>
                    <span className="text-caption block mb-3">Variants</span>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="ghost">Ghost</Button>
                    </div>
                  </div>

                  {/* Sizes */}
                  <div>
                    <span className="text-caption block mb-3">Sizes</span>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button size="sm" variant="secondary">Small</Button>
                      <Button size="md" variant="secondary">Medium</Button>
                      <Button size="lg" variant="secondary">Large</Button>
                    </div>
                  </div>

                  {/* With Icons & Disabled */}
                  <div>
                    <span className="text-caption block mb-3">States & Icons</span>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button variant="primary" rightIcon={<Icons.ArrowRight size={16} />}>
                        Next Step
                      </Button>
                      <Button variant="outline" leftIcon={<Icons.Terminal size={16} />}>
                        Terminal
                      </Button>
                      <Button variant="primary" disabled>
                        Disabled
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Badges & Icon Buttons */}
              <Card variant="default" className="space-y-6">
                <CardHeader>
                  <CardTitle>Badges & Icon Buttons</CardTitle>
                  <CardDescription>
                    Contextual status indicators and accessible icon-only controls.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Badges */}
                  <div>
                    <span className="text-caption block mb-3">Badge Variants</span>
                    <div className="flex flex-wrap gap-3">
                      <Badge variant="default">Default</Badge>
                      <Badge variant="accent" dot>Electric Lime</Badge>
                      <Badge variant="success" dot>Live System</Badge>
                      <Badge variant="warning" dot>Pending Review</Badge>
                    </div>
                  </div>

                  {/* Icon Buttons */}
                  <div>
                    <span className="text-caption block mb-3">Icon Buttons</span>
                    <div className="flex flex-wrap items-center gap-3">
                      <IconButton aria-label="Terminal prompt" variant="outline">
                        <Icons.Terminal size={18} />
                      </IconButton>
                      <IconButton aria-label="GitHub Repository" variant="outline">
                        <Icons.GitHub size={18} />
                      </IconButton>
                      <IconButton aria-label="Social Link" variant="outline">
                        <Icons.LinkedIn size={18} />
                      </IconButton>
                      <IconButton aria-label="Sparkles Action" variant="accent">
                        <Icons.Sparkles size={18} />
                      </IconButton>
                      <IconButton aria-label="Disabled Action" variant="outline" disabled>
                        <Icons.Close size={18} />
                      </IconButton>
                    </div>
                  </div>

                  {/* Surface Cards */}
                  <div>
                    <span className="text-caption block mb-3">Card Variants</span>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border-subtle)] text-xs text-[var(--color-text-secondary)]">
                        Subtle Card Surface
                      </div>
                      <div className="p-3 rounded-lg bg-[var(--color-bg-elevated)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-medium)] transition-colors text-xs text-[var(--color-text-secondary)]">
                        Interactive Hover Surface
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>

        <SectionDivider />

        {/* Section: Architectural & Verification Status */}
        <section id="about" className="py-16 md:py-20 bg-[var(--color-bg-secondary)]">
          <Container size="lg">
            <SectionHeading
              eyebrow="Architecture & Standards"
              title="Built for High Concurrency & Speed"
              description="Constructed with modern Next.js 16 App Router standards, zero layout shifts, and clean separation of concerns."
              align="center"
              className="mb-12"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="default">
                <CardHeader>
                  <div className="w-9 h-9 rounded-md bg-[var(--color-accent-lime-subtle)] border border-[var(--color-accent-lime-border)] flex items-center justify-center text-[var(--color-accent-lime)] mb-3">
                    <Icons.Check size={20} />
                  </div>
                  <CardTitle>Zero Unverified Claims</CardTitle>
                  <CardDescription>
                    All dates, sponsor tiers, and track announcements are maintained in isolated configuration files to prevent misleading information.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <span className="text-[11px] font-mono text-[var(--color-accent-lime)]">
                    VERIFIED SPECIFICATION
                  </span>
                </CardFooter>
              </Card>

              <Card variant="default">
                <CardHeader>
                  <div className="w-9 h-9 rounded-md bg-[var(--color-accent-cyan-subtle)] border border-[var(--color-accent-cyan-border)] flex items-center justify-center text-[var(--color-accent-cyan)] mb-3">
                    <Icons.Terminal size={20} />
                  </div>
                  <CardTitle>Accessibility First</CardTitle>
                  <CardDescription>
                    Semantic HTML, WCAG AAA color contrasts, full keyboard navigation, and strict support for prefers-reduced-motion.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card variant="default">
                <CardHeader>
                  <div className="w-9 h-9 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-white mb-3">
                    <Icons.Sparkles size={20} />
                  </div>
                  <CardTitle>Scalable Codebase</CardTitle>
                  <CardDescription>
                    Clean separation into app, components, lib, config, hooks, and styles with typed tokens for effortless theme customization.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </Container>
        </section>
      </main>

      {/* Global Application Footer */}
      <Footer />
    </div>
  );
}
