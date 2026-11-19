import React from "react";
import { cn } from "@/lib/utils";

export interface BackgroundGridProps {
  className?: string;
  variant?: "grid" | "dots" | "crosshairs";
  glowLime?: boolean;
  glowCyan?: boolean;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({
  className,
  variant = "grid",
  glowLime = true,
  glowCyan = true,
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none overflow-hidden select-none z-0",
        className
      )}
      aria-hidden="true"
    >
      {/* Pattern Overlay */}
      {variant === "grid" && (
        <div className="absolute inset-0 bg-tech-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)]" />
      )}
      {variant === "dots" && (
        <div className="absolute inset-0 bg-tech-dots opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_85%)]" />
      )}

      {/* Controlled Radial Glows */}
      {glowLime && (
        <div
          className="absolute -top-[160px] left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #B7FF5A 0%, rgba(183, 255, 90, 0) 70%)",
          }}
        />
      )}

      {glowCyan && (
        <div
          className="absolute top-[320px] -right-[120px] w-[500px] h-[400px] rounded-full blur-[140px] opacity-15 pointer-events-none"
          style={{
            background: "radial-gradient(circle, #65D9F2 0%, rgba(101, 217, 242, 0) 70%)",
          }}
        />
      )}
    </div>
  );
};

