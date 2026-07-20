/**
 * Site-wide configuration — single source of truth.
 * The developer credit here propagates to: footer, About page, README, docs.
 * Never hard-code any of these values in UI components.
 */

export const siteConfig = {
  name: "ResumeOS",
  tagline: "Build. Optimize. Get Hired.",
  description:
    "AI-powered platform to create beautiful resumes, ATS-friendly CVs, cover letters, portfolio websites, and career documents — from one dashboard.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://resumeos.app",
  locale: "en",
  ogImage: "/og/default.png",

  developer: {
    name: "Istiak Rahman",
    github: "https://github.com/istiakrahman15",
    portfolio: "https://devistiak.eu.cc",
    support: "https://www.supportkori.com/istiakrahman15",
  },

  license: "MIT",
  repository: "https://github.com/istiakrahman15/resume-os",

  social: {
    twitter: "https://twitter.com/resumeos_app",
    github: "https://github.com/istiakrahman15/resume-os",
  },

  keywords: [
    "resume builder",
    "CV maker",
    "ATS resume",
    "AI cover letter",
    "portfolio website",
    "job tracker",
    "career tools",
    "open source",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
