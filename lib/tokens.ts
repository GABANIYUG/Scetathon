/**
 * Centralized Design System Tokens for SCETATHON
 * All values map directly to CSS variables and theme configurations.
 */

export const colors = {
  background: {
    primary: "#080B12",
    secondary: "#0F1520",
    elevated: "#151D2A",
    elevatedHover: "#1B2536",
    glass: "rgba(15, 21, 32, 0.75)",
  },
  accent: {
    lime: {
      DEFAULT: "#B7FF5A",
      hover: "#C6FF78",
      active: "#A6F245",
      subtle: "rgba(183, 255, 90, 0.12)",
      border: "rgba(183, 255, 90, 0.28)",
      glow: "rgba(183, 255, 90, 0.18)",
      contrastText: "#080B12",
    },
    cyan: {
      DEFAULT: "#65D9F2",
      hover: "#83E2F5",
      active: "#48CCE9",
      subtle: "rgba(101, 217, 242, 0.12)",
      border: "rgba(101, 217, 242, 0.28)",
      glow: "rgba(101, 217, 242, 0.18)",
      contrastText: "#080B12",
    },
  },
  text: {
    primary: "#F4F7FA",
    secondary: "#A1ACBA",
    muted: "#687586",
    inverse: "#080B12",
  },
  border: {
    subtle: "rgba(255, 255, 255, 0.08)",
    medium: "rgba(255, 255, 255, 0.14)",
    strong: "rgba(255, 255, 255, 0.22)",
    accentLime: "rgba(183, 255, 90, 0.35)",
    accentCyan: "rgba(101, 217, 242, 0.35)",
  },
  state: {
    success: {
      DEFAULT: "#4ADE80",
      subtle: "rgba(74, 222, 128, 0.12)",
      border: "rgba(74, 222, 128, 0.28)",
    },
    warning: {
      DEFAULT: "#FBBF24",
      subtle: "rgba(251, 191, 36, 0.12)",
      border: "rgba(251, 191, 36, 0.28)",
    },
    error: {
      DEFAULT: "#F87171",
      subtle: "rgba(248, 113, 113, 0.12)",
      border: "rgba(248, 113, 113, 0.28)",
    },
    info: {
      DEFAULT: "#65D9F2",
      subtle: "rgba(101, 217, 242, 0.12)",
      border: "rgba(101, 217, 242, 0.28)",
    },
  },
} as const;

export const typography = {
  fontFamily: {
    heading: "var(--font-heading), 'Space Grotesk', -apple-system, sans-serif",
    sans: "var(--font-sans), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  sizes: {
    display: {
      fontSize: "clamp(2.75rem, 5vw + 1rem, 4.5rem)",
      lineHeight: "1.08",
      letterSpacing: "-0.03em",
      fontWeight: "700",
    },
    h1: {
      fontSize: "clamp(2.25rem, 4vw + 0.5rem, 3.25rem)",
      lineHeight: "1.12",
      letterSpacing: "-0.025em",
      fontWeight: "700",
    },
    h2: {
      fontSize: "clamp(1.75rem, 3vw + 0.25rem, 2.25rem)",
      lineHeight: "1.2",
      letterSpacing: "-0.02em",
      fontWeight: "600",
    },
    h3: {
      fontSize: "clamp(1.25rem, 2vw + 0.25rem, 1.5rem)",
      lineHeight: "1.3",
      letterSpacing: "-0.015em",
      fontWeight: "600",
    },
    h4: {
      fontSize: "1.125rem",
      lineHeight: "1.4",
      letterSpacing: "-0.01em",
      fontWeight: "600",
    },
    bodyLarge: {
      fontSize: "1.125rem",
      lineHeight: "1.65",
      fontWeight: "400",
    },
    bodyRegular: {
      fontSize: "1rem",
      lineHeight: "1.6",
      fontWeight: "400",
    },
    bodySmall: {
      fontSize: "0.875rem",
      lineHeight: "1.5",
      fontWeight: "400",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: "1.4",
      letterSpacing: "0.05em",
      fontWeight: "500",
    },
  },
} as const;

export const spacing = {
  container: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
  },
  padding: {
    mobile: "1rem",
    tablet: "1.5rem",
    desktop: "2rem",
    wide: "2.5rem",
  },
} as const;

export const radii = {
  none: "0px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
  full: "9999px",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgba(0, 0, 0, 0.4)",
  md: "0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)",
  lg: "0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.6)",
  elevated: "0 12px 28px -6px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.08)",
  glowLime: "0 0 24px -4px rgba(183, 255, 90, 0.25)",
  glowCyan: "0 0 24px -4px rgba(101, 217, 242, 0.25)",
} as const;

export const transitions = {
  fast: "150ms cubic-bezier(0.16, 1, 0.3, 1)",
  normal: "250ms cubic-bezier(0.16, 1, 0.3, 1)",
  slow: "400ms cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const zIndex = {
  base: 0,
  card: 1,
  dropdown: 40,
  header: 50,
  modalBackdrop: 60,
  modal: 70,
  toast: 80,
} as const;

