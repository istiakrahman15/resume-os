import { pgTable, text, timestamp, uuid, boolean, jsonb, varchar, index } from "drizzle-orm/pg-core";

export const resumes = pgTable(
  "resumes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    title: text("title").notNull().default("Untitled Resume"),
    templateId: varchar("template_id", { length: 50 }).notNull().default("minimal"),
    themeJson: jsonb("theme_json").$type<{
      accentColor?: string;
      fontStack?: string[];
      density?: "compact" | "comfortable" | "spacious";
    }>().default({}),
    dataJson: jsonb("data_json").$type<Record<string, unknown>>().notNull().default({}),
    status: varchar("status", { length: 20 }).notNull().default("draft"), // "draft" | "published"
    isArchived: boolean("is_archived").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("resumes_user_id_idx").on(t.userId),
    index("resumes_updated_at_idx").on(t.updatedAt),
  ]
);

export const resumeVersions = pgTable(
  "resume_versions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    resumeId: uuid("resume_id").notNull(),
    userId: uuid("user_id").notNull(),
    diffJson: jsonb("diff_json").notNull().default({}),
    snapshotJson: jsonb("snapshot_json").notNull().default({}),
    label: text("label"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("resume_versions_resume_id_idx").on(t.resumeId)]
);
