"use server";

import { revalidatePath } from "next/cache";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/src/db/client";
import { portfolios } from "@/src/db/schema/portfolios";
import { requireUser } from "@/src/features/resumes/actions";

export async function getPortfoliosList() {
  const user = await requireUser();

  try {
    const list = await db
      .select()
      .from(portfolios)
      .where(eq(portfolios.userId, user.id))
      .orderBy(desc(portfolios.updatedAt));

    return list;
  } catch (error) {
    console.error("Failed to fetch portfolios list:", error);
    throw new Error("Could not load portfolios list.");
  }
}

export async function getPortfolioDetails(id: string) {
  const user = await requireUser();

  try {
    const [portfolio] = await db
      .select()
      .from(portfolios)
      .where(and(eq(portfolios.id, id), eq(portfolios.userId, user.id)));

    if (!portfolio) {
      throw new Error("Portfolio not found.");
    }

    return portfolio;
  } catch (error) {
    console.error(`Failed to fetch portfolio details for id ${id}:`, error);
    throw new Error("Could not load portfolio.");
  }
}

export async function getPublicPortfolio(slug: string) {
  try {
    const [portfolio] = await db
      .select()
      .from(portfolios)
      .where(and(eq(portfolios.slug, slug), eq(portfolios.status, "published")));

    return portfolio;
  } catch (error) {
    console.error(`Failed to fetch public portfolio for slug ${slug}:`, error);
    return null;
  }
}

export async function createPortfolio(slug: string) {
  const user = await requireUser();

  try {
    const [newPtf] = await db
      .insert(portfolios)
      .values({
        userId: user.id,
        slug,
        theme: "aura",
        blocksJson: [
          { id: "hero", type: "hero", data: { heading: "Hi, I'm a Developer", subheading: "Building modern apps" }, visible: true },
          { id: "about", type: "about", data: { text: "Tell visitors about yourself here." }, visible: true },
        ],
        status: "draft",
      })
      .returning();

    revalidatePath("/portfolios");
    return newPtf;
  } catch (error) {
    console.error("Failed to create portfolio:", error);
    throw new Error("Could not create portfolio. Slug might be taken.");
  }
}

export async function updatePortfolio(
  id: string,
  updates: {
    slug?: string;
    theme?: string;
    blocksJson?: any;
    customDomain?: string | null;
    status?: string;
  }
) {
  const user = await requireUser();

  try {
    const [updatedPtf] = await db
      .update(portfolios)
      .set({
        ...updates,
        updatedAt: new Date(),
        publishedAt: updates.status === "published" ? new Date() : undefined,
      })
      .where(and(eq(portfolios.id, id), eq(portfolios.userId, user.id)))
      .returning();

    if (!updatedPtf) {
      throw new Error("Portfolio not found or update denied.");
    }

    revalidatePath(`/portfolios/${id}`);
    revalidatePath(`/${updatedPtf.slug}`);
    revalidatePath("/portfolios");
    return updatedPtf;
  } catch (error) {
    console.error(`Failed to update portfolio id ${id}:`, error);
    throw new Error("Could not save portfolio changes.");
  }
}

export async function deletePortfolio(id: string) {
  const user = await requireUser();

  try {
    const [deleted] = await db
      .delete(portfolios)
      .where(and(eq(portfolios.id, id), eq(portfolios.userId, user.id)))
      .returning();

    if (!deleted) {
      throw new Error("Portfolio not found or delete denied.");
    }

    revalidatePath("/portfolios");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete portfolio:", error);
    throw new Error("Could not delete portfolio.");
  }
}
