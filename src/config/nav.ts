import { LayoutDashboard, FileText, Globe, Mail, Target, Briefcase, BarChart3, CreditCard, Settings, User, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  pro?: boolean;
}

export interface NavSection {
  label?: string;
  items: NavItem[];
}

/** Primary sidebar navigation (authenticated app) */
export const appNav: NavSection[] = [
  {
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "Career Documents",
    items: [
      { label: "Resumes", href: "/resumes", icon: FileText },
      { label: "Cover Letters", href: "/cover-letters", icon: Mail },
      { label: "Portfolio", href: "/portfolios", icon: Globe, pro: true },
    ],
  },
  {
    label: "AI Tools",
    items: [
      { label: "ATS Score", href: "/ats", icon: Target },
      { label: "Job Tracker", href: "/jobs", icon: Briefcase },
      { label: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Billing", href: "/billing", icon: CreditCard },
      { label: "Profile", href: "/profile", icon: User },
      { label: "Settings", href: "/settings", icon: Settings },
    ],
  },
];

/** Admin sidebar navigation */
export const adminNav: NavSection[] = [
  {
    items: [
      { label: "Overview", href: "/admin", icon: LayoutDashboard },
      { label: "Users", href: "/admin/users", icon: User },
      { label: "Subscriptions", href: "/admin/subscriptions", icon: CreditCard },
      { label: "Templates", href: "/admin/templates", icon: FileText },
      { label: "AI Usage", href: "/admin/ai-usage", icon: BarChart3 },
      { label: "System", href: "/admin/system", icon: Settings },
      { label: "Audit Log", href: "/admin/audit", icon: ShieldCheck },
    ],
  },
];

/** Public marketing navigation */
export const marketingNav = [
  { label: "Features", href: "/#features" },
  { label: "Templates", href: "/templates" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
] as const;

/** Footer link columns */
export const footerNav = [
  {
    label: "Product",
    links: [
      { label: "Features", href: "/#features" },
      { label: "Templates", href: "/templates" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "API Reference", href: "/docs/api" },
      { label: "Self-Hosting", href: "/docs/self-hosting" },
      { label: "GitHub", href: "https://github.com/istiakrahman15/resume-os" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Privacy", href: "/legal/privacy" },
    ],
  },
] as const;
