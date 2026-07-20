"use server";

import { eq, desc, and, or, ilike } from "drizzle-orm";
import { db } from "@/src/db/client";
import { subscriptions, manualPayments } from "@/src/db/schema/billing";
import { requireUser } from "@/src/features/resumes/actions";
import type { PaymentMethodId } from "@/src/config/billing";

// ─── User-facing Actions ──────────────────────────────────────────

/**
 * Get the current user's subscription record.
 */
export async function getUserSubscription() {
  const user = await requireUser();

  try {
    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, user.id));

    return sub || null;
  } catch (error) {
    console.error("Failed to fetch user subscription:", error);
    return null;
  }
}

/**
 * Submit a manual payment request (bKash / Nagad).
 * Creates a "pending" record for admin review.
 */
export async function submitManualPayment(input: {
  paymentMethod: PaymentMethodId;
  senderNumber: string;
  transactionId: string;
  amount: number;
  targetPlan: "pro" | "teams";
}) {
  const user = await requireUser();

  // Validate inputs
  if (!input.senderNumber || input.senderNumber.length < 11) {
    throw new Error("Please enter a valid sender phone number.");
  }
  if (!input.transactionId || input.transactionId.length < 4) {
    throw new Error("Please enter a valid Transaction ID.");
  }
  if (!input.amount || input.amount <= 0) {
    throw new Error("Please enter a valid payment amount.");
  }

  // Check for existing pending request
  const [existing] = await db
    .select()
    .from(manualPayments)
    .where(
      and(
        eq(manualPayments.userId, user.id),
        eq(manualPayments.status, "pending")
      )
    );

  if (existing) {
    throw new Error("You already have a pending payment request. Please wait for admin verification.");
  }

  // Insert payment request
  const [payment] = await db
    .insert(manualPayments)
    .values({
      userId: user.id,
      paymentMethod: input.paymentMethod,
      senderNumber: input.senderNumber,
      transactionId: input.transactionId,
      amount: input.amount,
      targetPlan: input.targetPlan,
      status: "pending",
    })
    .returning();

  return payment;
}

/**
 * Get the current user's payment request history.
 */
export async function getUserPaymentHistory() {
  const user = await requireUser();

  try {
    return await db
      .select()
      .from(manualPayments)
      .where(eq(manualPayments.userId, user.id))
      .orderBy(desc(manualPayments.createdAt));
  } catch (error) {
    console.error("Failed to fetch payment history:", error);
    return [];
  }
}

/**
 * Get the current user's latest pending payment request, if any.
 */
export async function getUserPendingPayment() {
  const user = await requireUser();

  try {
    const [pending] = await db
      .select()
      .from(manualPayments)
      .where(
        and(
          eq(manualPayments.userId, user.id),
          eq(manualPayments.status, "pending")
        )
      );

    return pending || null;
  } catch (error) {
    console.error("Failed to fetch pending payment:", error);
    return null;
  }
}

// ─── Admin-facing Actions ─────────────────────────────────────────

/**
 * Fetch all manual payment requests for admin review.
 * Supports optional status filter and search query.
 */
export async function getAdminPaymentRequests(opts?: {
  status?: "pending" | "approved" | "rejected" | "all";
  search?: string;
}) {
  const conditions = [];

  if (opts?.status && opts.status !== "all") {
    conditions.push(eq(manualPayments.status, opts.status));
  }

  if (opts?.search) {
    conditions.push(
      or(
        ilike(manualPayments.transactionId, `%${opts.search}%`),
        ilike(manualPayments.senderNumber, `%${opts.search}%`)
      )!
    );
  }

  const where = conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select()
    .from(manualPayments)
    .where(where)
    .orderBy(desc(manualPayments.createdAt));
}

/**
 * Approve a manual payment and upgrade the user's subscription.
 */
export async function approveManualPayment(paymentId: string) {
  // 1. Get the payment record
  const [payment] = await db
    .select()
    .from(manualPayments)
    .where(eq(manualPayments.id, paymentId));

  if (!payment) throw new Error("Payment request not found.");
  if (payment.status !== "pending") throw new Error("This payment has already been processed.");

  // 2. Mark payment as approved
  await db
    .update(manualPayments)
    .set({
      status: "approved",
      reviewedAt: new Date(),
    })
    .where(eq(manualPayments.id, paymentId));

  // 3. Upsert the user's subscription to Pro
  const [existingSub] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.userId, payment.userId));

  if (existingSub) {
    await db
      .update(subscriptions)
      .set({
        plan: payment.targetPlan,
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // +30 days
        updatedAt: new Date(),
      })
      .where(eq(subscriptions.userId, payment.userId));
  } else {
    await db
      .insert(subscriptions)
      .values({
        userId: payment.userId,
        plan: payment.targetPlan,
        status: "active",
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
  }

  return { success: true };
}

/**
 * Reject a manual payment request with an optional admin note.
 */
export async function rejectManualPayment(paymentId: string, adminNote?: string) {
  const [payment] = await db
    .select()
    .from(manualPayments)
    .where(eq(manualPayments.id, paymentId));

  if (!payment) throw new Error("Payment request not found.");
  if (payment.status !== "pending") throw new Error("This payment has already been processed.");

  await db
    .update(manualPayments)
    .set({
      status: "rejected",
      adminNote: adminNote || null,
      reviewedAt: new Date(),
    })
    .where(eq(manualPayments.id, paymentId));

  return { success: true };
}
