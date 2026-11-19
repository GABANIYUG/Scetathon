import { colors, typography, spacing, radii, shadows, transitions, zIndex } from "@/lib/tokens";

export const theme = {
  colors,
  typography,
  spacing,
  radii,
  shadows,
  transitions,
  zIndex,
} as const;

export type Theme = typeof theme;

