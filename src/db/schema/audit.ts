import { pgTable, text, timestamp, uuid, jsonb, varchar, index } from "drizzle-orm/pg-core";

export const adminAuditLog = pgTable(
  "admin_audit_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    actorId: uuid("actor_id").notNull(), // admin user id
    action: varchar("action", { length: 100 }).notNull(), // e.g. "suspend_user", "update_subscription"
    targetType: varchar("target_type", { length: 50 }).notNull(), // e.g. "user", "subscription"
    targetId: varchar("target_id", { length: 255 }),
    payloadJson: jsonb("payload_json").default({}),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("admin_audit_log_actor_idx").on(t.actorId),
    index("admin_audit_log_action_idx").on(t.action),
  ]
);
