import { pgTable, text, timestamp, uuid, jsonb, index } from "drizzle-orm/pg-core";

export const coverLetters = pgTable(
  "cover_letters",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    title: text("title").notNull().default("Untitled Cover Letter"),
    bodyJson: jsonb("body_json").$type<{
      greeting?: string;
      opening?: string;
      body?: string[];
      closing?: string;
    }>().notNull().default({}),
    variablesJson: jsonb("variables_json").$type<{
      name?: string;
      role?: string;
      company?: string;
      hiringManager?: string;
    }>().default({}),
    linkedResumeId: uuid("linked_resume_id"),
    tone: text("tone").default("professional"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("cover_letters_user_id_idx").on(t.userId)]
);
