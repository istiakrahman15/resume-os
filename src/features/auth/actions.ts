"use server";

import { db } from "@/src/db/client";
import { profiles } from "@/src/db/schema/profiles";
import { subscriptions } from "@/src/db/schema/billing";
import { eq } from "drizzle-orm";

export async function createProfileAfterSignup(input: {
  id: string;
  username: string;
  email: string;
}) {
  try {
    const username = input.username.toLowerCase().trim();
    const isAdmin = input.email === "admin@resumeos.app" || input.email?.endsWith("@admin.com");

    // Check if profile already exists
    const [existing] = await db
      .select()
      .from(profiles)
      .where(eq(profiles.id, input.id));

    if (existing) {
      return { success: true };
    }

    // 1. Insert into profiles table
    await db.insert(profiles).values({
      id: input.id,
      username,
      displayName: input.username,
      role: isAdmin ? "admin" : "user",
      isPublic: false,
    });

    // 2. Initialize default subscription (free plan)
    const [existingSub] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, input.id));

    if (!existingSub) {
      await db.insert(subscriptions).values({
        userId: input.id,
        plan: "free",
        status: "inactive",
      });
    }

    return { success: true };
  } catch (error: any) {
    console.error("Failed to create profile or subscription:", error);
    return { success: false, error: error.message };
  }
}
