/**
 * Template registry metadata.
 * Each template must also export a React component implementing ResumeTemplate.
 * Thumbnails are served from /public/templates/.
 */

export type TemplateTier = "free" | "pro";
export type TemplateCategory =
  | "modern"
  | "minimal"
  | "classic"
  | "professional"
  | "developer"
  | "creative";

export interface TemplateRegistryEntry {
  id: string;
  name: string;
  category: TemplateCategory;
  tier: TemplateTier;
  accentColor: string;
  fontStack: string[];
  thumbnails: { png: string; webp: string };
  pdfLayout: "single" | "two-column";
  description: string;
  enabled: boolean;
}

export const templateRegistry: TemplateRegistryEntry[] = [
  {
    id: "modern",
    name: "Modern",
    category: "modern",
    tier: "free",
    accentColor: "oklch(0.55 0.22 263)",
    fontStack: ["Inter", "sans-serif"],
    thumbnails: {
      png: "/templates/modern.png",
      webp: "/templates/modern.webp",
    },
    pdfLayout: "two-column",
    description: "Sidebar accent, two-column layout. Clean and contemporary.",
    enabled: true,
  },
  {
    id: "minimal",
    name: "Minimal",
    category: "minimal",
    tier: "free",
    accentColor: "oklch(0.20 0 0)",
    fontStack: ["Geist", "sans-serif"],
    thumbnails: {
      png: "/templates/minimal.png",
      webp: "/templates/minimal.webp",
    },
    pdfLayout: "single",
    description: "Single column with generous whitespace. Let your work speak.",
    enabled: true,
  },
  {
    id: "classic",
    name: "Classic",
    category: "classic",
    tier: "free",
    accentColor: "oklch(0.25 0.05 240)",
    fontStack: ["Source Serif 4", "serif"],
    thumbnails: {
      png: "/templates/classic.png",
      webp: "/templates/classic.webp",
    },
    pdfLayout: "single",
    description: "Serif typeface, traditional hierarchy. Timeless and formal.",
    enabled: true,
  },
  {
    id: "professional",
    name: "Professional",
    category: "professional",
    tier: "pro",
    accentColor: "oklch(0.45 0.15 220)",
    fontStack: ["Inter", "sans-serif"],
    thumbnails: {
      png: "/templates/professional.png",
      webp: "/templates/professional.webp",
    },
    pdfLayout: "two-column",
    description: "Header band with two-column body. Executive presence.",
    enabled: true,
  },
  {
    id: "developer",
    name: "Developer",
    category: "developer",
    tier: "pro",
    accentColor: "oklch(0.65 0.18 145)",
    fontStack: ["Geist Mono", "monospace"],
    thumbnails: {
      png: "/templates/developer.png",
      webp: "/templates/developer.webp",
    },
    pdfLayout: "single",
    description: "Monospace accents, GitHub-style links. Built for engineers.",
    enabled: true,
  },
  {
    id: "creative",
    name: "Creative",
    category: "creative",
    tier: "pro",
    accentColor: "oklch(0.60 0.25 320)",
    fontStack: ["Inter", "sans-serif"],
    thumbnails: {
      png: "/templates/creative.png",
      webp: "/templates/creative.webp",
    },
    pdfLayout: "two-column",
    description: "Color-forward, geometric layout. For designers and creatives.",
    enabled: true,
  },
];

export function getFreeTemplates() {
  return templateRegistry.filter((t) => t.tier === "free" && t.enabled);
}

export function getProTemplates() {
  return templateRegistry.filter((t) => t.tier === "pro" && t.enabled);
}

export function getTemplateById(id: string) {
  return templateRegistry.find((t) => t.id === id);
}
