"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/src/db/client";
import { resumes } from "@/src/db/schema/resumes";
import { createClient } from "@/src/lib/supabase/server";

export async function requireUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("Unauthorized. Please sign in to proceed.");
  }

  return user;
}

export async function getResumesList() {
  const user = await requireUser();

  try {
    const list = await db
      .select()
      .from(resumes)
      .where(and(eq(resumes.userId, user.id), eq(resumes.isArchived, false)))
      .orderBy(desc(resumes.updatedAt));

    return list;
  } catch (error) {
    console.error("Failed to fetch resumes list:", error);
    throw new Error("Could not load resumes.");
  }
}

export async function getResumeDetails(id: string) {
  const user = await requireUser();

  try {
    const [resume] = await db
      .select()
      .from(resumes)
      .where(and(eq(resumes.id, id), eq(resumes.userId, user.id)));

    if (!resume) {
      throw new Error("Resume not found or access denied.");
    }

    return resume;
  } catch (error) {
    console.error(`Failed to fetch resume details for id ${id}:`, error);
    throw new Error("Could not load resume.");
  }
}

export async function createResume(title: string, templateId: string = "minimal") {
  const user = await requireUser();

  try {
    const [newResume] = await db
      .insert(resumes)
      .values({
        userId: user.id,
        title,
        templateId,
        dataJson: {},
        themeJson: { density: "comfortable" },
      })
      .returning();

    revalidatePath("/resumes");
    return newResume;
  } catch (error) {
    console.error("Failed to create resume:", error);
    throw new Error("Could not create resume.");
  }
}

export async function updateResume(
  id: string,
  updates: {
    title?: string;
    templateId?: string;
    dataJson?: any;
    themeJson?: any;
  }
) {
  const user = await requireUser();

  try {
    const [updatedResume] = await db
      .update(resumes)
      .set({
        ...updates,
        updatedAt: new Date(),
      })
      .where(and(eq(resumes.id, id), eq(resumes.userId, user.id)))
      .returning();

    if (!updatedResume) {
      throw new Error("Resume not found or update denied.");
    }

    revalidatePath(`/resumes/${id}`);
    revalidatePath("/resumes");
    return updatedResume;
  } catch (error) {
    console.error(`Failed to update resume id ${id}:`, error);
    throw new Error("Could not save resume changes.");
  }
}

export async function duplicateResume(id: string) {
  const user = await requireUser();

  try {
    const [original] = await db
      .select()
      .from(resumes)
      .where(and(eq(resumes.id, id), eq(resumes.userId, user.id)));

    if (!original) {
      throw new Error("Original resume not found.");
    }

    const [copy] = await db
      .insert(resumes)
      .values({
        userId: user.id,
        title: `${original.title} (Copy)`,
        templateId: original.templateId,
        dataJson: original.dataJson,
        themeJson: original.themeJson,
      })
      .returning();

    revalidatePath("/resumes");
    return copy;
  } catch (error) {
    console.error("Failed to duplicate resume:", error);
    throw new Error("Could not duplicate resume.");
  }
}

export async function deleteResume(id: string) {
  const user = await requireUser();

  try {
    const [deleted] = await db
      .update(resumes)
      .set({
        isArchived: true,
        updatedAt: new Date(),
      })
      .where(and(eq(resumes.id, id), eq(resumes.userId, user.id)))
      .returning();

    if (!deleted) {
      throw new Error("Resume not found or delete denied.");
    }

    revalidatePath("/resumes");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete resume:", error);
    throw new Error("Could not delete resume.");
  }
}
