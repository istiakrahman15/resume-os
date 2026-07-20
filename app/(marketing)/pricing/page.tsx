"use client";

import Link from "next/link";
import { Sparkles, Check, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { billingConfig, getPlan } from "@/src/config/billing";
import { PageHeader } from "@/components/shared/page-header";

export default function PricingPage() {
  const plans = billingConfig.plans;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          No credit card required. Pay via bKash or Nagad. Upgrade or downgrade at any time.
        </p>
      </div>

      {/* Plan Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-20">
        {plans.map((plan) => {
          const isPro = plan.id === "pro";
          const isTeams = plan.id === "teams";

          return (
            <div
              key={plan.id}
              className={`flex flex-col justify-between border rounded-2xl p-6 bg-card relative ${
                plan.highlighted
                  ? "border-brand ring-2 ring-brand/20 shadow-lg scale-105 z-10"
                  : "border-border shadow-sm"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand text-brand-foreground px-3 py-0.5 text-xxs font-bold uppercase tracking-wider">
                  Popular
                </span>
              )}

              <div>
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 min-h-[32px]">{plan.tagline}</p>
                </div>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-foreground">
                    {plan.priceMonthly === 0 ? "Free" : `৳${plan.priceMonthly}`}
                  </span>
                  {plan.priceMonthly > 0 && <span className="text-xs text-muted-foreground">/month</span>}
                </div>

                <ul className="space-y-3.5 mb-8 text-xs text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    <span>
                      {plan.limits.resumes === -1 ? "Unlimited" : `${plan.limits.resumes} Active`}{" "}
                      {plan.limits.resumes === 1 ? "Resume" : "Resumes"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    <span>
                      {plan.limits.portfolios === -1 ? "Unlimited" : `${plan.limits.portfolios} Hosted`}{" "}
                      {plan.limits.portfolios === 1 ? "Portfolio" : "Portfolios"}
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    <span>
                      {plan.limits.aiGenerationsPerMonth === -1
                        ? "Unlimited"
                        : `${plan.limits.aiGenerationsPerMonth} AI Generations / mo`}
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    <span>
                      {plan.limits.atsScansPerMonth === -1
                        ? "Unlimited"
                        : `${plan.limits.atsScansPerMonth} ATS Scans / mo`}
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    <span>{plan.limits.customDomain ? "Custom domain support" : "Subdomain only"}</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 shrink-0 text-brand" />
                    <span>
                      {plan.limits.pdfWatermark ? "Watermarked PDF Exports" : "Clean PDF Exports"}
                    </span>
                  </li>
                </ul>
              </div>

              <Link href={plan.id === "free" ? "/signup" : "/billing"} className="mt-auto block">
                <Button
                  className={`w-full rounded-full font-semibold ${
                    plan.highlighted
                      ? "bg-brand text-brand-foreground hover:bg-brand/90"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  {plan.id === "free" ? "Start building free" : `Get ${plan.name}`}
                </Button>
              </Link>
            </div>
          );
        })}
      </div>

      {/* Pricing FAQ comparison highlights */}
      <div className="border-t border-border pt-16 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs sm:text-sm">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">Can I cancel my plan?</h4>
            <p className="text-muted-foreground leading-relaxed">
              Yes. You can cancel your subscription inside the billing dashboard at any time. You will continue to have access to your paid features until the billing period ends.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">What happens to my data if I downgrade?</h4>
            <p className="text-muted-foreground leading-relaxed">
              We never delete your resumes. If you downgrade to a plan with lower limits, your existing resumes are preserved, but you won't be able to edit or create new documents until you fit inside the plan limits.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
