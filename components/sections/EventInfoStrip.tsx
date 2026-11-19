import React from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Icons } from "@/components/ui/icons";

export const EventInfoStrip: React.FC = () => {
  const verifiedSpecs = [
    {
      label: "EVENT FORMAT",
      value: "24-Hour Hackathon",
      subtext: "Continuous Engineering Sprint",
      icon: <Icons.Terminal size={18} className="text-[var(--color-accent-lime)]" />,
    },
    {
      label: "HOST INSTITUTION",
      value: siteConfig.institution.shortName,
      subtext: siteConfig.institution.fullName,
      icon: <Icons.Sparkles size={18} className="text-[var(--color-accent-cyan)]" />,
    },
    {
      label: "CAMPUS VENUE",
      value: "Surat, Gujarat",
      subtext: siteConfig.institution.location,
      icon: <Icons.Check size={18} className="text-[#4ADE80]" />,
    },
    {
      label: "ELIGIBILITY",
      value: "Inter-College",
      subtext: "Undergraduate & Graduate Teams",
      icon: <Icons.ArrowRight size={18} className="text-[var(--color-accent-lime)]" />,
    },
  ];

  return (
    <section className="relative z-20 -mt-8 sm:-mt-12 mb-16">
      <Container size="lg">
        <GlassPanel
          variant="highlight"
          padding="none"
          className="border-white/15 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {verifiedSpecs.map((spec, i) => (
              <div key={i} className="p-5 sm:p-6 flex items-start gap-4 hover:bg-white/5 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  {spec.icon}
                </div>
                <div className="space-y-1 min-w-0">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[var(--color-text-muted)] uppercase block">
                    {spec.label}
                  </span>
                  <span className="font-heading font-bold text-base sm:text-lg text-[var(--color-text-primary)] block truncate">
                    {spec.value}
                  </span>
                  <span className="text-xs text-[var(--color-text-secondary)] block truncate">
                    {spec.subtext}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </Container>
    </section>
  );
};

