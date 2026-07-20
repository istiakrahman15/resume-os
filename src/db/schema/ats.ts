import { pgTable, text, timestamp, uuid, integer, jsonb, index } from "drizzle-orm/pg-core";

export const atsScans = pgTable(
  "ats_scans",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id").notNull(),
    resumeId: uuid("resume_id").notNull(),
    jdText: text("jd_text").notNull(),
    jdHash: text("jd_hash").notNull(),
    score: integer("score").notNull(),
    rubricJson: jsonb("rubric_json").$type<{
      categories: {
        keywordMatch: { score: number; suggestions: string[] };
        quantification: { score: number; suggestions: string[] };
        actionVerbs: { score: number; suggestions: string[] };
        length: { score: number; suggestions: string[] };
        contactCompleteness: { score: number; suggestions: string[] };
        formatting: { score: number; suggestions: string[] };
        sectionCoverage: { score: number; suggestions: string[] };
        jdTailoring: { score: number; suggestions: string[] };
      };
      actionableFixes: Array<{
        id: string;
        severity: "critical" | "warning" | "suggestion";
        title: string;
        fix: string;
        autoFixable: boolean;
        appliesTo: { section: string; index?: number; field?: string };
      }>;
    }>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [
    index("ats_scans_user_id_idx").on(t.userId),
    index("ats_scans_resume_id_idx").on(t.resumeId),
  ]
);
