"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";

export interface AdminSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
}

export const AdminSearchInput: React.FC<AdminSearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search entries…",
  className,
  id = "admin-search",
}) => {
  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)]">
        <Icons.Search size={15} />
      </div>

      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="glass-input w-full h-10 pl-9 pr-8 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] rounded-xl outline-none"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-text-muted)] hover:text-white transition-colors cursor-pointer"
          aria-label="Clear search query"
        >
          <Icons.Close size={13} />
        </button>
      )}
    </div>
  );
};

