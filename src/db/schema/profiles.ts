import { pgTable, text, timestamp, uuid, integer, boolean, jsonb, varchar, index, uniqueIndex } from "drizzle-orm/pg-core";

export const profiles = pgTable(
  "profiles",
  {
    id: uuid("id").primaryKey(), // mirrors auth.users.id
    username: varchar("username", { length: 39 }).unique().notNull(),
    displayName: text("display_name"),
    bio: text("bio"),
    headline: text("headline"),
    avatarUrl: text("avatar_url"),
    website: text("website"),
    socials: jsonb("socials").$type<Record<string, string>>().default({}),
    role: varchar("role", { length: 20 }).notNull().default("user"), // "user" | "admin"
    isPublic: boolean("is_public").notNull().default(false),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [uniqueIndex("profiles_username_idx").on(t.username)]
);
