import { pgTable, text, timestamp, uuid, boolean, integer, varchar, index, uniqueIndex } from "drizzle-orm/pg-core";

export const featureFlags = pgTable(
  "feature_flags",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    key: varchar("key", { length: 100 }).notNull(),
    description: text("description"),
    enabled: boolean("enabled").notNull().default(false),
    rolloutPercent: integer("rollout_percent").notNull().default(100), // 0 to 100
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("feature_flags_key_idx").on(t.key)]
);

export const userFeatureFlags = pgTable(
  "user_feature_flags",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    flagId: uuid("flag_id").notNull(),
    enabledOverride: boolean("enabled_override").notNull(), // manual override per user
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    uniqueIndex("user_feature_flags_user_flag_idx").on(t.userId, t.flagId),
    index("user_feature_flags_user_idx").on(t.userId),
  ]
);
