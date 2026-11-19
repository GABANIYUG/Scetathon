import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";

export const FinalCtaSection: React.FC = () => {
  return (
    <section id="register" className="py-20 lg:py-28 relative scroll-mt-20">
      <Container size="lg">
        <GlassPanel
          variant="highlight"
          padding="xl"
          glow="lime"
          className="relative overflow-hidden border-white/20 text-center"
        >
          {/* Subtle Ambient Radial Lighting Behind Headline */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full blur-[110px] opacity-25 pointer-events-none"
            style={{
              background: "radial-gradient(circle, #B7FF5A 0%, rgba(101, 217, 242, 0.4) 50%, transparent 75%)",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="accent" dot>
                SCETATHON 2026 // CALL FOR BUILDERS
              </Badge>
            </div>

            <h2 className="text-display font-black text-white tracking-tight text-4xl sm:text-5xl lg:text-6xl uppercase">
              YOUR NEXT BIG IDEA{" "}
              <span className="text-[var(--color-accent-lime)] glow-text-lime block sm:inline">
                STARTS HERE.
              </span>
            </h2>

            <p className="text-body-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Assemble your squad, choose an engineering track, and step onto the campus of{" "}
              <span className="text-white font-medium">
                Sarvajanik College of Engineering & Technology, Surat
              </span>{" "}
              for 24 hours of non-stop innovation.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button
                href="#challenges"
                size="lg"
                variant="primary"
                rightIcon={<Icons.ArrowRight size={18} />}
                className="shadow-[0_0_28px_-4px_rgba(183,255,90,0.4)]"
              >
                Explore Challenges
              </Button>

              <Button
                href="#experience"
                size="lg"
                variant="outline"
                leftIcon={<Icons.Terminal size={18} />}
              >
                Explore The Experience
              </Button>
            </div>

            {/* Verified Registration Notice */}
            <div className="pt-6 border-t border-white/10 max-w-md mx-auto">
              <p className="text-xs font-mono text-[var(--color-text-muted)]">
                {siteConfig.registration.statusNotice}
              </p>
            </div>
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
};

