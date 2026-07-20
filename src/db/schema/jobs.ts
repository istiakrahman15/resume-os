import { pgTable, text, timestamp, uuid, integer, boolean, varchar, index } from "drizzle-orm/pg-core";

export const jobColumns = pgTable(
  "job_columns",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    label: text("label").notNull(), // e.g. "Saved", "Applied"
    color: varchar("color", { length: 7 }).notNull().default("#6366f1"),
    order: integer("order").notNull().default(0),
    isTerminal: boolean("is_terminal").notNull().default(false), // e.g. Offers/Rejections are terminal
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("job_columns_user_id_idx").on(t.userId)]
);

export const jobs = pgTable(
  "jobs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    company: text("company").notNull(),
    role: text("role").notNull(),
    location: text("location"),
    salaryMin: integer("salary_min"),
    salaryMax: integer("salary_max"),
    url: text("url"),
    jdText: text("jd_text"),
    columnId: uuid("column_id").notNull(),
    priority: varchar("priority", { length: 10 }).notNull().default("medium"), // "low" | "medium" | "high"
    appliedDate: timestamp("applied_date", { withTimezone: true }),
    nextStepDate: timestamp("next_step_date", { withTimezone: true }),
    notes: text("notes"),
    contacts: text("contacts"), // serialized JSON array
    linkedResumeId: uuid("linked_resume_id"),
    linkedCoverLetterId: uuid("linked_cover_letter_id"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("jobs_user_id_idx").on(t.userId),
    index("jobs_column_id_idx").on(t.columnId),
  ]
);

export const jobEvents = pgTable(
  "job_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    jobId: uuid("job_id").notNull(),
    userId: uuid("user_id").notNull(),
    fromColumnId: uuid("from_column_id"),
    toColumnId: uuid("to_column_id").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("job_events_job_id_idx").on(t.jobId),
    index("job_events_user_id_idx").on(t.userId),
  ]
);
