"use server";

import { revalidatePath } from "next/cache";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/src/db/client";
import { coverLetters } from "@/src/db/schema/cover-letters";
import { requireUser } from "@/src/features/resumes/actions";

export async function getCoverLettersList() {
  const user = await requireUser();

  try {
    const list = await db
      .select()
      .from(coverLetters)
      .where(eq(coverLetters.userId, user.id))
      .orderBy(desc(coverLetters.updatedAt));

    return list;
  } catch (error) {
    console.error("Failed to fetch cover letters list:", error);
    throw new Error("Could not load cover letters.");
  }
}

export async function getCoverLetterDetails(id: string) {
  const user = await requireUser();

  try {
    const [letter] = await db
      .select()
      .from(coverLetters)
      .where(and(eq(coverLetters.id, id), eq(coverLetters.userId, user.id)));

    if (!letter) {
      throw new Error("Cover letter not found.");
    }

    return letter;
  } catch (error) {
    console.error(`Failed to fetch cover letter details for id ${id}:`, error);
    throw new Error("Could not load cover letter.");
  }
}

export async function createCoverLetter(title: string, linkedResumeId?: string) {
  const user = await requireUser();

  try {
    const [newLtr] = await db
      .insert(coverLetters)
      .values({
        userId: user.id,
        title,
        bodyJson: { greeting: "Dear Hiring Team,", body: [""] },
        variablesJson: {},
        linkedResumeId: linkedResumeId || null,
      })
      .returning();

    revalidatePath("/cover-letters");
    return newLtr;
  } catch (error) {
    console.error("Failed to create cover letter:", error);
    throw new Error("Could not create cover letter.");
  }
}

export async function updateCoverLetter(
  id: string,
  updates: {
    title?: string;
    bodyJson?: any;
    variablesJson?: any;
    linkedResumeId?: string | null;
    tone?: string;
  }
) {
  const user = await requireUser();

  try {
    const [updatedLtr] = await db
      .update(coverLetters)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(and(eq(coverLetters.id, id), eq(coverLetters.userId, user.id)))
      .returning();

    if (!updatedLtr) {
      throw new Error("Cover letter not found or update denied.");
    }

    revalidatePath(`/cover-letters/${id}`);
    revalidatePath("/cover-letters");
    return updatedLtr;
  } catch (error) {
    console.error(`Failed to update cover letter id ${id}:`, error);
    throw new Error("Could not save cover letter changes.");
  }
}

export async function deleteCoverLetter(id: string) {
  const user = await requireUser();

  try {
    const [deleted] = await db
      .delete(coverLetters)
      .where(and(eq(coverLetters.id, id), eq(coverLetters.userId, user.id)))
      .returning();

    if (!deleted) {
      throw new Error("Cover letter not found or delete denied.");
    }

    revalidatePath("/cover-letters");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete cover letter:", error);
    throw new Error("Could not delete cover letter.");
  }
}
