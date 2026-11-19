import React from "react";
import { Container } from "@/components/ui/Container";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

export interface PageHeroProps {
  eyebrow?: string;
  badge?: string;
  badgeVariant?: "default" | "accent" | "success" | "warning";
  title: string | React.ReactNode;
  highlightedTitle?: string;
  description: string;
  metaNotice?: string;
  className?: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  badge,
  badgeVariant = "accent",
  title,
  highlightedTitle,
  description,
  metaNotice,
  className,
  children,
}) => {
  return (
    <section className={cn("pt-10 pb-12 sm:pt-16 sm:pb-16 relative overflow-hidden", className)}>
      <Container size="lg">
        <div className="max-w-3xl space-y-5 text-left">
          {/* Eyebrow / Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            {badge && (
              <Badge variant={badgeVariant} dot size="md">
                {badge}
              </Badge>
            )}
            {eyebrow && (
              <span className="text-xs font-mono font-bold tracking-widest text-[var(--color-accent-lime)] uppercase">
                {eyebrow}
              </span>
            )}
          </div>

          {/* Heading */}
          <h1 className="text-display font-extrabold text-[var(--color-text-primary)] tracking-tight uppercase leading-[1.02]">
            {title}{" "}
            {highlightedTitle && (
              <span className="text-[var(--color-accent-lime)] glow-text-lime block sm:inline">
                {highlightedTitle}
              </span>
            )}
          </h1>

          {/* Description */}
          <p className="text-body-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {description}
          </p>

          {/* Optional Meta Notice */}
          {metaNotice && (
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-text-muted)] bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-cyan)] shrink-0" />
                {metaNotice}
              </span>
            </div>
          )}

          {children}
        </div>
      </Container>
    </section>
  );
};

