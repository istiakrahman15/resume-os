import { pgTable, text, timestamp, uuid, boolean, jsonb, varchar, index, uniqueIndex } from "drizzle-orm/pg-core";

export const portfolios = pgTable(
  "portfolios",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    slug: varchar("slug", { length: 50 }).notNull(),
    theme: varchar("theme", { length: 30 }).notNull().default("aura"), // "aura" | "mono" | "editorial" | "dev"
    blocksJson: jsonb("blocks_json").$type<Array<{
      id: string;
      type: "hero" | "about" | "experience" | "projects" | "skills" | "testimonials" | "contact";
      data: Record<string, any>;
      visible: boolean;
    }>>().notNull().default([]),
    customDomain: varchar("custom_domain", { length: 253 }),
    status: varchar("status", { length: 20 }).notNull().default("draft"), // "draft" | "published"
    publishedAt: timestamp("published_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("portfolios_slug_idx").on(t.slug),
    index("portfolios_user_id_idx").on(t.userId),
    index("portfolios_custom_domain_idx").on(t.customDomain),
  ]
);
