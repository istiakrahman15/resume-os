import { NextResponse } from "next/server";

/**
 * Webhook route placeholder.
 *
 * Currently the project uses manual payment verification (bKash / Nagad).
 * When a payment gateway (Stripe, SSLCommerz, etc.) is integrated in the
 * future, this route will handle incoming webhook events.
 */
export async function POST() {
  return NextResponse.json(
    { message: "No payment gateway webhooks configured. Manual payment verification is active." },
    { status: 200 }
  );
}
