/**
 * Billing configuration — plans, prices, limits, and manual payment methods.
 * Every plan feature gate reads from here. No prices hard-coded in UI.
 *
 * Payment gateway is abstracted — currently uses manual verification (bKash/Nagad).
 * To add Stripe or other gateways later, extend `paymentGateway` without
 * changing existing manual payment logic.
 */

export type PlanId = "free" | "pro" | "teams";

export interface PlanLimits {
  resumes: number; // -1 = unlimited
  portfolios: number;
  aiGenerationsPerMonth: number;
  atsScansPerMonth: number; // -1 = unlimited
  pdfWatermark: boolean;
  customDomain: boolean;
  versionHistoryDays: number;
  teamSeats: number;
}

export interface BillingPlan {
  id: PlanId;
  name: string;
  tagline: string;
  priceMonthly: number; // BDT (taka)
  priceAnnual: number; // BDT per month when billed annually
  limits: PlanLimits;
  highlighted?: boolean;
}

// ─── Manual Payment Configuration ─────────────────────────────────

export type PaymentMethodId = "bkash" | "nagad";

export interface ManualPaymentMethod {
  id: PaymentMethodId;
  name: string;
  accountNumber: string;
  accountType: "Personal";
  instructions: string[];
  color: string; // brand color for UI
}

export const manualPaymentMethods: ManualPaymentMethod[] = [
  {
    id: "bkash",
    name: "bKash",
    accountNumber: "01712345678",
    accountType: "Personal",
    instructions: [
      "Open your bKash app or dial *247#",
      'Select "Send Money"',
      "Enter the bKash Personal number shown above",
      "Enter the exact amount for your plan",
      "Enter your bKash PIN to confirm",
      "Note down the Transaction ID from the confirmation SMS",
    ],
    color: "#E2136E",
  },
  {
    id: "nagad",
    name: "Nagad",
    accountNumber: "01912345678",
    accountType: "Personal",
    instructions: [
      "Open your Nagad app or dial *167#",
      'Select "Send Money"',
      "Enter the Nagad Personal number shown above",
      "Enter the exact amount for your plan",
      "Enter your Nagad PIN to confirm",
      "Note down the Transaction ID from the confirmation SMS",
    ],
    color: "#F6921E",
  },
];

// ─── Plan Definitions ─────────────────────────────────────────────

export const billingConfig = {
  currency: "BDT",
  trialDays: 0,

  plans: [
    {
      id: "free",
      name: "Free",
      tagline: "Perfect for getting started",
      priceMonthly: 0,
      priceAnnual: 0,
      limits: {
        resumes: 1,
        portfolios: 1,
        aiGenerationsPerMonth: 3,
        atsScansPerMonth: 5,
        pdfWatermark: true,
        customDomain: false,
        versionHistoryDays: 30,
        teamSeats: 1,
      },
    },
    {
      id: "pro",
      name: "Pro",
      tagline: "For active job seekers",
      priceMonthly: 299, // ৳299
      priceAnnual: 199, // ৳199/mo billed annually
      highlighted: true,
      limits: {
        resumes: -1,
        portfolios: 3,
        aiGenerationsPerMonth: 200,
        atsScansPerMonth: -1,
        pdfWatermark: false,
        customDomain: true,
        versionHistoryDays: 365,
        teamSeats: 1,
      },
    },
    {
      id: "teams",
      name: "Teams",
      tagline: "For coaches and small teams",
      priceMonthly: 799, // ৳799/seat
      priceAnnual: 599, // ৳599/seat/mo annually
      limits: {
        resumes: -1,
        portfolios: -1,
        aiGenerationsPerMonth: -1,
        atsScansPerMonth: -1,
        pdfWatermark: false,
        customDomain: true,
        versionHistoryDays: 365,
        teamSeats: 10,
      },
    },
  ] satisfies BillingPlan[],

  /** Grace period in days before downgrade on failed payment */
  gracePeriodDays: 7,

  /**
   * Active payment gateway.
   * Extend this to "stripe" | "manual" | "sslcommerz" etc.
   */
  paymentGateway: "manual" as const,
} as const;

export function getPlan(id: PlanId): BillingPlan {
  const plan = billingConfig.plans.find((p) => p.id === id);
  if (!plan) throw new Error(`Unknown plan: ${id}`);
  return plan;
}

export function getLimits(id: PlanId): PlanLimits {
  return getPlan(id).limits;
}
