"use server";

import { revalidatePath } from "next/cache";
import { eq, and, asc } from "drizzle-orm";
import { db } from "@/src/db/client";
import { jobs, jobColumns, jobEvents } from "@/src/db/schema/jobs";
import { requireUser } from "@/src/features/resumes/actions";

const DEFAULT_COLUMNS = [
  { label: "Saved", color: "#94a3b8", order: 0 },
  { label: "Applied", color: "#3b82f6", order: 1 },
  { label: "Phone Screen", color: "#f59e0b", order: 2 },
  { label: "Interview", color: "#6366f1", order: 3 },
  { label: "Offer", color: "#10b981", order: 4 },
  { label: "Rejected", color: "#ef4444", order: 5, isTerminal: true },
];

/**
 * Initializes default Kanban columns for a user if none exist.
 */
export async function initializeUserColumns(userId: string) {
  const existing = await db
    .select()
    .from(jobColumns)
    .where(eq(jobColumns.userId, userId));

  if (existing.length === 0) {
    const values = DEFAULT_COLUMNS.map((col) => ({
      userId,
      label: col.label,
      color: col.color,
      order: col.order,
      isTerminal: col.isTerminal || false,
    }));

    await db.insert(jobColumns).values(values);
  }
}

export async function getJobColumns() {
  const user = await requireUser();
  await initializeUserColumns(user.id);

  try {
    const cols = await db
      .select()
      .from(jobColumns)
      .where(eq(jobColumns.userId, user.id))
      .orderBy(asc(jobColumns.order));

    return cols;
  } catch (error) {
    console.error("Failed to fetch job columns:", error);
    throw new Error("Could not load tracking columns.");
  }
}

export async function getJobsList() {
  const user = await requireUser();

  try {
    const list = await db
      .select()
      .from(jobs)
      .where(eq(jobs.userId, user.id));

    return list;
  } catch (error) {
    console.error("Failed to fetch jobs list:", error);
    throw new Error("Could not load job list.");
  }
}

export async function createJob(company: string, role: string, columnId: string) {
  const user = await requireUser();

  try {
    const [newJob] = await db
      .insert(jobs)
      .values({
        userId: user.id,
        company,
        role,
        columnId,
        priority: "medium",
      })
      .returning();

    revalidatePath("/jobs");
    return newJob;
  } catch (error) {
    console.error("Failed to create job:", error);
    throw new Error("Could not create job.");
  }
}

export async function moveJob(jobId: string, fromColumnId: string, toColumnId: string) {
  const user = await requireUser();

  try {
    const [updatedJob] = await db
      .update(jobs)
      .set({
        columnId: toColumnId,
        updatedAt: new Date(),
      })
      .where(and(eq(jobs.id, jobId), eq(jobs.userId, user.id)))
      .returning();

    if (!updatedJob) {
      throw new Error("Job not found.");
    }

    // Log the event history
    await db.insert(jobEvents).values({
      jobId,
      userId: user.id,
      fromColumnId,
      toColumnId,
    });

    revalidatePath("/jobs");
    return updatedJob;
  } catch (error) {
    console.error("Failed to move job:", error);
    throw new Error("Could not move job.");
  }
}

export async function deleteJob(jobId: string) {
  const user = await requireUser();

  try {
    const [deleted] = await db
      .delete(jobs)
      .where(and(eq(jobs.id, jobId), eq(jobs.userId, user.id)))
      .returning();

    if (!deleted) {
      throw new Error("Job not found.");
    }

    revalidatePath("/jobs");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete job:", error);
    throw new Error("Could not delete job.");
  }
}
