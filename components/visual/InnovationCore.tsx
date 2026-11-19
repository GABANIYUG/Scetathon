"use client";

import React, { useState, useRef } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";

export const InnovationCore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const transformStyle = isHovered
    ? {
        transform: `perspective(1000px) rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 12}deg)`,
        transition: "transform 0.15s ease-out",
      }
    : {
        transform: "perspective(1000px) rotateY(0deg) rotateX(0deg)",
        transition: "transform 0.5s ease-out",
      };

  return (
    <div
      ref={containerRef}
      onPointerEnter={() => setIsHovered(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-[480px] lg:max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none"
      style={transformStyle}
      aria-label="SCETATHON 3D Innovation Core Visual Representation"
    >
      {/* Background Multi-layer Radial Glow */}
      <div
        className="absolute inset-0 rounded-full blur-[90px] opacity-25 pointer-events-none"
        style={{
          background: "radial-gradient(circle, #B7FF5A 0%, rgba(101, 217, 242, 0.4) 45%, transparent 70%)",
        }}
      />

      {/* SVG 3D-inspired Technical Orbital Gyroscope */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="limeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B7FF5A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#65D9F2" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="cyanGrad" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#65D9F2" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#B7FF5A" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Outer Telemetry Ring - Rotates Clockwise */}
        <g className="animate-orbit-slow" style={{ transformOrigin: "250px 250px" }}>
          <circle
            cx="250"
            cy="250"
            r="215"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1.2"
            strokeDasharray="4 8"
          />
          <circle
            cx="250"
            cy="250"
            r="195"
            stroke="url(#limeGrad)"
            strokeWidth="1.5"
            strokeDasharray="40 120"
          />
          {/* Coordinate tick marks */}
          <line x1="250" y1="35" x2="250" y2="45" stroke="#B7FF5A" strokeWidth="2" />
          <line x1="250" y1="455" x2="250" y2="465" stroke="#B7FF5A" strokeWidth="2" />
          <line x1="35" y1="250" x2="45" y2="250" stroke="#65D9F2" strokeWidth="2" />
          <line x1="455" y1="250" x2="465" y2="250" stroke="#65D9F2" strokeWidth="2" />
        </g>

        {/* Secondary Elliptical Orbital Ring - Counter-rotates */}
        <g className="animate-orbit-reverse" style={{ transformOrigin: "250px 250px" }}>
          <ellipse
            cx="250"
            cy="250"
            rx="160"
            ry="110"
            stroke="rgba(101, 217, 242, 0.3)"
            strokeWidth="1.4"
            strokeDasharray="16 24"
            transform="rotate(-25 250 250)"
          />
          {/* Orbital satellite nodes */}
          <circle cx="100" cy="210" r="4" fill="#65D9F2" />
          <circle cx="400" cy="290" r="3.5" fill="#B7FF5A" />
        </g>

        {/* Tertiary Technical Ring with Degree Ticks */}
        <g className="animate-orbit-slow" style={{ transformOrigin: "250px 250px", animationDuration: "48s" }}>
          <circle
            cx="250"
            cy="250"
            r="130"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1"
            strokeDasharray="8 8"
          />
          <circle cx="250" cy="120" r="3" fill="#B7FF5A" />
        </g>

        {/* Central Crosshairs Reticle */}
        <line x1="220" y1="250" x2="280" y2="250" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
        <line x1="250" y1="220" x2="250" y2="280" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
      </svg>

      {/* The Central Illuminated Glass Core */}
      <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full flex items-center justify-center animate-core-pulse">
        {/* Core Glass Sphere Layer */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-[#151D2A]/80 to-[#080B12]/95 backdrop-blur-2xl border border-white/25 shadow-[0_0_50px_rgba(183,255,90,0.3),inset_0_1px_2px_rgba(255,255,255,0.4)]" />

        {/* Inner Technical Energy Ring */}
        <div className="absolute inset-4 rounded-full border border-[var(--color-accent-lime)]/40 bg-[radial-gradient(circle,rgba(183,255,90,0.25)_0%,transparent_70%)] animate-pulse-subtle" />

        {/* Central Badge / Insignia */}
        <div className="relative z-20 flex flex-col items-center justify-center text-center">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-bg-primary)]/80 border border-[var(--color-accent-lime)]/50 flex items-center justify-center text-[var(--color-accent-lime)] shadow-[0_0_12px_rgba(183,255,90,0.4)] mb-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wider glow-text-lime">
            24H
          </span>
          <span className="text-[9px] font-mono tracking-widest text-[var(--color-accent-cyan)] uppercase font-semibold">
            INNOVATION
          </span>
        </div>
      </div>

      {/* Floating Glass Telemetry Badges */}
      {/* Badge 1: Top-Left System Status */}
      <div className="absolute -top-2 left-2 sm:left-4 z-20 animate-float">
        <GlassPanel
          variant="highlight"
          padding="sm"
          className="shadow-xl py-2 px-3 border-white/20 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent-lime)] shadow-[0_0_8px_#B7FF5A] shrink-0" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-wider text-[var(--color-text-primary)] font-bold">
              SYS // READY
            </span>
            <span className="text-[9px] font-mono text-[var(--color-text-muted)]">
              24-HR CYCLE
            </span>
          </div>
        </GlassPanel>
      </div>

      {/* Badge 2: Bottom-Right Location & Host */}
      <div className="absolute -bottom-2 right-2 sm:right-4 z-20 animate-float-delayed">
        <GlassPanel
          variant="highlight"
          padding="sm"
          className="shadow-xl py-2 px-3.5 border-white/20 flex items-center gap-2.5"
        >
          <div className="w-6 h-6 rounded-md bg-[rgba(101,217,242,0.15)] border border-[rgba(101,217,242,0.3)] flex items-center justify-center text-[var(--color-accent-cyan)] shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polygon points="12 8 8 12 12 16 16 12 12 8" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-mono tracking-wider text-[var(--color-text-primary)] font-bold">
              SCET · SURAT
            </span>
            <span className="text-[9px] font-mono text-[var(--color-accent-cyan)]">
              EST. CAMPUS VENUE
            </span>
          </div>
        </GlassPanel>
      </div>

      {/* Badge 3: Top-Right Technical Metric */}
      <div className="absolute top-12 right-0 sm:-right-2 z-20 hidden sm:block animate-float">
        <GlassPanel
          variant="subtle"
          padding="sm"
          className="py-1.5 px-3 border-white/10 flex items-center gap-2 text-[10px] font-mono text-[var(--color-text-secondary)]"
        >
          <span className="text-[var(--color-accent-lime)]">●</span>
          <span>MULTI-DISCIPLINARY</span>
        </GlassPanel>
      </div>
    </div>
  );
};
