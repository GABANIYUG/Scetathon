"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { TeamDetails, ValidationError } from "@/lib/registration-validation";

interface TeamDetailsFormProps {
  data: TeamDetails;
  errors: ValidationError[];
  onChange: (updated: TeamDetails) => void;
}

interface FieldConfig {
  key: keyof TeamDetails;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  hint?: string;
}

const FIELDS: FieldConfig[] = [
  {
    key: "teamName",
    label: "Team Name",
    placeholder: "e.g. Circuit Breakers",
    autoComplete: "off",
    hint: "3–60 characters. This will appear on your team profile.",
  },
  {
    key: "collegeName",
    label: "College / Institution",
    placeholder: "e.g. Nirma University",
    autoComplete: "organization",
  },
  {
    key: "city",
    label: "City",
    placeholder: "e.g. Ahmedabad",
    autoComplete: "address-level2",
  },
  {
    key: "leaderName",
    label: "Team Leader Name",
    placeholder: "Full name",
    autoComplete: "name",
  },
  {
    key: "leaderEmail",
    label: "Leader Email",
    placeholder: "leader@college.edu",
    type: "email",
    autoComplete: "email",
    hint: "Must be unique across all team members.",
  },
  {
    key: "leaderPhone",
    label: "Leader Mobile",
    placeholder: "10-digit Indian number",
    type: "tel",
    autoComplete: "tel",
    hint: "Indian mobile number (6-9XXXXXXXXX).",
  },
];

export const TeamDetailsForm: React.FC<TeamDetailsFormProps> = ({
  data,
  errors,
  onChange,
}) => {
  const getError = (field: string) =>
    errors.find((e) => e.field === field)?.message;

  const handleChange = (key: keyof TeamDetails, value: string) => {
    onChange({ ...data, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h3 font-bold text-[var(--color-text-primary)] mb-1">
          Team Details
        </h2>
        <p className="text-sm text-[var(--color-text-muted)]">
          Enter your team identity and leader contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {FIELDS.map((field) => {
          const error = getError(field.key);
          return (
            <div
              key={field.key}
              className={cn(
                "space-y-1.5",
                (field.key === "teamName" || field.key === "collegeName") &&
                  "md:col-span-2"
              )}
            >
              <label
                htmlFor={`field-${field.key}`}
                className="block text-xs font-semibold tracking-widest text-[var(--color-text-secondary)] uppercase"
              >
                {field.label}
                <span className="text-[var(--color-accent-lime)] ml-0.5">*</span>
              </label>

              <input
                id={`field-${field.key}`}
                type={field.type ?? "text"}
                autoComplete={field.autoComplete}
                value={data[field.key]}
                placeholder={field.placeholder}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className={cn(
                  "glass-input w-full h-12 px-4 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none transition-all duration-200",
                  error
                    ? "border-red-500/60 focus:border-red-500 focus:ring-1 focus:ring-red-500/40"
                    : "focus:border-[var(--color-accent-lime)] focus:ring-1 focus:ring-[var(--color-accent-lime-border)]"
                )}
                aria-describedby={
                  error
                    ? `error-${field.key}`
                    : field.hint
                    ? `hint-${field.key}`
                    : undefined
                }
                aria-invalid={error ? "true" : undefined}
              />

              {/* Error message */}
              {error && (
                <p
                  id={`error-${field.key}`}
                  role="alert"
                  className="text-xs text-red-400 flex items-center gap-1.5 mt-1"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </p>
              )}

              {/* Hint text */}
              {!error && field.hint && (
                <p
                  id={`hint-${field.key}`}
                  className="text-xs text-[var(--color-text-muted)]"
                >
                  {field.hint}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

