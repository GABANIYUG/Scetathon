import React from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/icons";

interface ChallengeTrack {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  techFocus: string[];
  status: "UPCOMING_RATIFICATION" | "PLANNED";
}

const plannedTracks: ChallengeTrack[] = [
  {
    id: "ai-systems",
    number: "TRACK 01",
    title: "AI & Intelligent Systems",
    category: "ARTIFICIAL INTELLIGENCE",
    description:
      "Autonomous agents, edge inference pipelines, computer vision for regional industries, and accessible LLM tooling designed for real-world impact.",
    techFocus: ["Neural Nets", "Edge AI", "Computer Vision", "Agentic Systems"],
    status: "PLANNED",
  },
  {
    id: "web3-protocols",
    number: "TRACK 02",
    title: "Decentralized Protocols & Security",
    category: "SYSTEMS & INFRASTRUCTURE",
    description:
      "Decentralized trust, verifiable cryptographic computation, identity protocols, and tamper-proof verification for public record systems.",
    techFocus: ["Zero Knowledge", "Smart Contracts", "Cryptography", "Distributed State"],
    status: "PLANNED",
  },
  {
    id: "smart-campus",
    number: "TRACK 03",
    title: "Smart Cities & Sustainable IoT",
    category: "CONNECTED SYSTEMS",
    description:
      "Hardware-software convergence, intelligent sensor networks, urban resource optimization, energy monitoring, and campus mobility.",
    techFocus: ["Microcontrollers", "MQTT", "Time-Series Telemetry", "CleanTech"],
    status: "PLANNED",
  },
  {
    id: "healthtech-diagnostics",
    number: "TRACK 04",
    title: "HealthTech & Assistive Engineering",
    category: "BIO & MEDICAL INFORMATICS",
    description:
      "Assistive technologies, low-latency vital signal processing, regional telemedicine pipelines, and predictive health monitoring for rural accessibility.",
    techFocus: ["Bioinformatics", "Audio Diagnostics", "Wearable IoT", "Data Security"],
    status: "PLANNED",
  },
  {
    id: "open-innovation",
    number: "TRACK 05",
    title: "Open Innovation & Moonshots",
    category: "EMERGING DOMAINS",
    description:
      "Radical, cross-disciplinary problem solving that breaks domain silos. Build high-conviction prototypes addressing tangible social or industrial challenges.",
    techFocus: ["Full-Stack", "Multi-Modal", "DevTools", "Automation"],
    status: "PLANNED",
  },
  {
    id: "fintech-inclusion",
    number: "TRACK 06",
    title: "FinTech & Open Digital Commerce",
    category: "ECONOMIC INFRASTRUCTURE",
    description:
      "Next-generation payment architectures, micro-credit transparency, fraud detection systems, and frictionless financial accessibility for small enterprises.",
    techFocus: ["Transaction Graphs", "API Gateways", "Fraud Heuristics", "Auditability"],
    status: "PLANNED",
  },
];

export const ChallengePreview: React.FC = () => {
  return (
    <section id="challenges" className="py-20 lg:py-28 relative scroll-mt-20">
      <Container size="lg">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="Problem Solving Domains"
            title="Curated Engineering Tracks"
            description="Explore the multidisciplinary problem tracks planned for SCETATHON. Finalized problem statements will be revealed at the event kick-off."
          />

          <div className="shrink-0">
            <Button
              href="#schedule"
              variant="outline"
              rightIcon={<Icons.ArrowRight size={15} />}
            >
              View Event Timeline
            </Button>
          </div>
        </div>

        {/* Official Status Notice Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[rgba(21,29,42,0.6)] border border-white/10 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-accent-lime)] animate-ping shrink-0 mt-1 sm:mt-0" />
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)]">
              <strong className="text-white font-semibold">Official Track Notice:</strong> Specific problem statement briefs are being finalized by the SCET Technical Committee and industry partners.
            </p>
          </div>
          <Badge variant="accent" size="sm" className="self-start sm:self-auto shrink-0">
            RATIFICATION IN PROGRESS
          </Badge>
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plannedTracks.map((track) => (
            <GlassPanel
              key={track.id}
              variant="interactive"
              padding="lg"
              className="flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                {/* Track Number & Category */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent-lime)]">
                    {track.number}
                  </span>
                  <Badge variant="default" size="sm">
                    {track.category}
                  </Badge>
                </div>

                {/* Track Title */}
                <h4 className="font-heading font-bold text-xl text-white group-hover:text-[var(--color-accent-lime)] transition-colors">
                  {track.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {track.description}
                </p>
              </div>

              {/* Technologies List */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono tracking-wider text-[var(--color-text-muted)] uppercase block">
                  Expected Competencies
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {track.techFocus.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-[var(--color-text-secondary)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </GlassPanel>
          ))}
        </div>
      </Container>
    </section>
  );
};

