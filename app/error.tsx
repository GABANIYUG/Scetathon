"use client";

import React, { useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitized error identifier in development/observability
    console.error("Runtime exception captured by ErrorBoundary:", error.message);
  }, [error]);

  return (
    <div className="py-20 sm:py-28 md:py-36 flex items-center justify-center relative">
      <Container size="md">
        <GlassPanel
          variant="elevated"
          padding="xl"
          edgeHighlight
          className="text-center space-y-6 max-w-xl mx-auto border-red-500/30"
        >
          {/* Status Badge */}
          <div className="flex justify-center">
            <Badge variant="warning" dot size="sm">
              EXCEPTION CAPTURED
            </Badge>
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto">
              <Icons.AlertTriangle size={24} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight uppercase">
              OPERATIONAL INTERRUPTION.
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
              An unexpected execution error occurred while rendering this interface. Core event data remains safe and preserved.
            </p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Button type="button" variant="primary" size="md" onClick={() => reset()}>
              <span className="flex items-center gap-1.5">
                <Icons.RefreshCw size={14} />
                <span>Retry Interaction</span>
              </span>
            </Button>
            <Button href="/" variant="outline" size="md">
              Return to Home
            </Button>
          </div>

          {/* Safe Diagnostic info */}
          <div className="pt-4 border-t border-white/[0.08] text-[10px] font-mono text-[var(--color-text-muted)]">
            <span>REFERENCE: {error.digest ? `DIGEST_${error.digest.slice(0, 8)}` : "INTERNAL_DISPATCH_RETRY"}</span>
          </div>
        </GlassPanel>
      </Container>
    </div>
  );
}

