"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface AdminFormFieldProps {
  label: string;
  id: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export const AdminFormField: React.FC<AdminFormFieldProps> = ({
  label,
  id,
  required = false,
  hint,
  error,
  children,
  className,
}) => {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={id}
        className="block text-xs font-semibold tracking-wider text-[var(--color-text-secondary)] uppercase"
      >
        {label}
        {required && <span className="text-[var(--color-accent-lime)] ml-1">*</span>}
      </label>

      {children}

      {error ? (
        <p role="alert" className="text-xs text-red-400 flex items-center gap-1">
          <span>⚠</span> {error}
        </p>
      ) : hint ? (
        <p className="text-[11px] text-[var(--color-text-muted)]">{hint}</p>
      ) : null}
    </div>
  );
};

