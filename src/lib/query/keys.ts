/**
 * Centralized TanStack Query key factory to prevent key naming collisions
 * and manage caching/invalidation taxonomy cleanly.
 */
export const queryKeys = {
  profile: {
    self: () => ["profile", "me"] as const,
    byUsername: (username: string) => ["profile", "username", username] as const,
  },
  resumes: {
    all: () => ["resumes"] as const,
    list: () => ["resumes", "list"] as const,
    detail: (id: string) => ["resumes", "detail", id] as const,
    versions: (id: string) => ["resumes", "detail", id, "versions"] as const,
  },
  coverLetters: {
    all: () => ["cover-letters"] as const,
    list: () => ["cover-letters", "list"] as const,
    detail: (id: string) => ["cover-letters", "detail", id] as const,
  },
  portfolios: {
    all: () => ["portfolios"] as const,
    list: () => ["portfolios", "list"] as const,
    detail: (id: string) => ["portfolios", "detail", id] as const,
  },
  atsScans: {
    all: () => ["ats-scans"] as const,
    byResume: (resumeId: string) => ["ats-scans", "resume", resumeId] as const,
    latest: (resumeId: string) => ["ats-scans", "resume", resumeId, "latest"] as const,
  },
  jobs: {
    all: () => ["jobs"] as const,
    list: () => ["jobs", "list"] as const,
    detail: (id: string) => ["jobs", "detail", id] as const,
    columns: () => ["jobs", "columns"] as const,
    analytics: () => ["jobs", "analytics"] as const,
  },
  billing: {
    subscription: () => ["billing", "subscription"] as const,
    invoices: () => ["billing", "invoices"] as const,
    usage: () => ["billing", "usage"] as const,
  },
  admin: {
    stats: () => ["admin", "stats"] as const,
    users: (filters: Record<string, any>) => ["admin", "users", filters] as const,
    subscriptions: (filters: Record<string, any>) => ["admin", "subscriptions", filters] as const,
    aiUsage: (filters: Record<string, any>) => ["admin", "ai-usage", filters] as const,
    auditLogs: (filters: Record<string, any>) => ["admin", "audit-logs", filters] as const,
  },
} as const;
