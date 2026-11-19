import React from "react";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";

export const metadata = {
  title: "404 — Signal Lost | SCETATHON",
  description: "The requested route does not exist in the SCETATHON directory.",
};

export default function NotFound() {
  return (
    <div className="py-20 sm:py-28 md:py-36 flex items-center justify-center relative">
      <Container size="md">
        <GlassPanel
          variant="elevated"
          padding="xl"
          edgeHighlight
          glow="lime"
          className="text-center space-y-6 max-w-xl mx-auto relative overflow-hidden"
        >
          {/* Status Chip */}
          <div className="flex justify-center">
            <Badge variant="accent" dot size="sm">
              404 // SIGNAL TERMINATED
            </Badge>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight uppercase">
              COORDINATES NOT FOUND.
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
              The operational sector you requested is not mapped or has been relocated within the SCETATHON grid.
            </p>
          </div>

          {/* Suggested Links */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button href="/" variant="primary" size="md">
              <span className="flex items-center gap-1.5">
                <Icons.ArrowRight size={14} className="rotate-180" />
                <span>Return to Home</span>
              </span>
            </Button>
            <Button href="/challenges" variant="outline" size="md">
              Browse Challenges
            </Button>
            <Button href="/updates" variant="ghost" size="md">
              Live Bulletins
            </Button>
          </div>

          {/* Technical Diagnostics */}
          <div className="pt-4 border-t border-white/[0.08] text-[10px] font-mono text-[var(--color-text-muted)] flex items-center justify-center gap-4">
            <span>ERROR: HTTP_404_ROUTE_UNRESOLVED</span>
            <span>SYSTEM: SCETATHON_EDGE</span>
          </div>
        </GlassPanel>
      </Container>
    </div>
  );
}
