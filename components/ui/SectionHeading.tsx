import React from "react";
import { cn } from "@/lib/utils";

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  eyebrow?: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  align?: "left" | "center";
  size?: "default" | "large";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  size = "default",
  className,
  ...props
}) => {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        isCenter ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-lime)] shadow-[0_0_8px_rgba(183,255,90,0.6)] shrink-0" />
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-lime)] font-semibold">
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={cn(
          "font-heading font-bold text-[var(--color-text-primary)] tracking-tight",
          size === "large" ? "text-h1" : "text-h2",
          "max-w-3xl"
        )}
      >
        {title}
      </h2>

      {description && (
        <p
          className={cn(
            "mt-3 text-body-lg text-[var(--color-text-secondary)]",
            "max-w-2xl",
            isCenter && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
