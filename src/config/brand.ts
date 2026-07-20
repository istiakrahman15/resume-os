/**
 * Brand configuration — accent color, logo variant.
 * All color overrides flow from here into globals.css via CSS variables.
 */

export const brandConfig = {
  /**
   * Primary accent — oklch hue (0–360).
   * Default: 263 = a refined indigo-violet.
   * This feeds into --brand-* CSS variables set in globals.css.
   */
  accentHue: 263,

  /** oklch chroma for the accent — controls saturation */
  accentChroma: 0.22,

  logo: {
    /** Wordmark text (also used as alt) */
    wordmark: "ResumeOS",
    /** Icon variant for tight spaces (sidebar collapsed, favicon) */
    icon: "R",
  },

  /** Default OG image dimensions */
  og: {
    width: 1200,
    height: 630,
  },
} as const;

export type BrandConfig = typeof brandConfig;
