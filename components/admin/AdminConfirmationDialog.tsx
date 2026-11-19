"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export interface AdminConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const AdminConfirmationDialog: React.FC<AdminConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm Reset",
  cancelLabel = "Keep Changes",
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onCancel();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-desc"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[var(--color-bg-elevated)] p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="space-y-2">
          <h3 id="dialog-title" className="text-base font-bold text-[var(--color-text-primary)]">
            {title}
          </h3>
          <p id="dialog-desc" className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="ghost" size="sm" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="outline" size="sm" onClick={onConfirm} className="border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500">
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

