"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { IconButton } from "@/components/ui/IconButton";
import { Badge } from "@/components/ui/Badge";

export interface AdminDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: "md" | "lg" | "xl";
}

export const AdminDetailDrawer: React.FC<AdminDetailDrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  badge,
  children,
  footer,
  width = "lg",
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const widthStyles = {
    md: "max-w-md",
    lg: "max-w-xl",
    xl: "max-w-2xl",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div
        className={cn(
          "relative w-full h-full bg-[var(--color-bg-secondary)] border-l border-white/10 shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out",
          widthStyles[width]
        )}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/[0.08] flex items-start justify-between gap-4 bg-[var(--color-bg-elevated)]/40">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {badge && (
                <Badge variant="accent" dot size="sm">
                  {badge}
                </Badge>
              )}
              <span className="text-[10px] font-mono tracking-widest text-[var(--color-text-muted)] uppercase">
                DETAILS PANEL
              </span>
            </div>
            <h2 id="drawer-title" className="text-lg font-bold text-[var(--color-text-primary)]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs text-[var(--color-text-secondary)]">
                {subtitle}
              </p>
            )}
          </div>

          <IconButton
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close details panel"
          >
            <Icons.Close size={18} />
          </IconButton>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {children}
        </div>

        {/* Footer actions */}
        {footer && (
          <div className="p-4 sm:p-5 border-t border-white/[0.08] bg-[var(--color-bg-elevated)]/40 flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

