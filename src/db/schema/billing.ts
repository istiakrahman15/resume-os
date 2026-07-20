import { pgTable, text, timestamp, uuid, integer, varchar, index } from "drizzle-orm/pg-core";

// ─── Subscriptions (gateway-agnostic) ─────────────────────────────
export const subscriptions = pgTable(
  "subscriptions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull().unique(),
    plan: varchar("plan", { length: 20 }).notNull().default("free"), // "free" | "pro" | "teams"
    status: varchar("status", { length: 50 }).notNull().default("inactive"), // active, inactive, pending
    currentPeriodEnd: timestamp("current_period_end", { withTimezone: true }),
    // Optional gateway-specific fields (nullable for manual payment flow)
    stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("subscriptions_user_id_idx").on(t.userId)]
);

// ─── Manual Payment Requests (bKash / Nagad) ─────────────────────
export const manualPayments = pgTable(
  "manual_payments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    paymentMethod: varchar("payment_method", { length: 20 }).notNull(), // "bkash" | "nagad"
    senderNumber: varchar("sender_number", { length: 20 }).notNull(),
    transactionId: varchar("transaction_id", { length: 100 }).notNull(),
    amount: integer("amount").notNull(), // BDT
    targetPlan: varchar("target_plan", { length: 20 }).notNull().default("pro"),
    status: varchar("status", { length: 20 }).notNull().default("pending"), // pending | approved | rejected
    adminNote: text("admin_note"),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("manual_payments_user_id_idx").on(t.userId),
    index("manual_payments_status_idx").on(t.status),
    index("manual_payments_txn_id_idx").on(t.transactionId),
  ]
);
