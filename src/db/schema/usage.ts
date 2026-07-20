import { pgTable, text, timestamp, uuid, integer, varchar, index } from "drizzle-orm/pg-core";

export const usageEvents = pgTable(
  "usage_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    type: varchar("type", { length: 30 }).notNull(), // "ai_generation" | "ats_scan" | "pdf_export"
    tokensIn: integer("tokens_in"),
    tokensOut: integer("tokens_out"),
    cost: integer("cost"), // cost in microcents
    model: varchar("model", { length: 50 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("usage_events_user_id_idx").on(t.userId),
    index("usage_events_type_created_idx").on(t.type, t.createdAt),
  ]
);
