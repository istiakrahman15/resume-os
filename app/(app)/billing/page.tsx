"use client";

import { useEffect, useState } from "react";
import {
  getUserSubscription,
  getUserPendingPayment,
  submitManualPayment,
} from "@/src/features/billing/manual-actions";
import { manualPaymentMethods, getPlan } from "@/src/config/billing";
import type { PaymentMethodId } from "@/src/config/billing";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  ShieldCheck,
  Sparkles,
  CreditCard,
  Loader2,
  Clock,
  CheckCircle,
  Copy,
  Phone,
  Hash,
  Banknote,
} from "lucide-react";
import { toast } from "sonner";

export default function BillingPage() {
  const [sub, setSub] = useState<any>(null);
  const [pendingPayment, setPendingPayment] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodId | null>(null);
  const [step, setStep] = useState<"choose" | "form">("choose");

  // Form state
  const [txnId, setTxnId] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const proPlan = getPlan("pro");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [activeSub, pending] = await Promise.all([
          getUserSubscription(),
          getUserPendingPayment(),
        ]);
        setSub(activeSub);
        setPendingPayment(pending);
      } catch {
        toast.error("Failed to load billing details.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSelectMethod = (methodId: PaymentMethodId) => {
    setSelectedMethod(methodId);
    setStep("form");
  };

  const handleSubmitPayment = async () => {
    if (!selectedMethod) return;
    setSubmitting(true);
    try {
      await submitManualPayment({
        paymentMethod: selectedMethod,
        senderNumber: senderNumber.trim(),
        transactionId: txnId.trim(),
        amount: parseInt(amount),
        targetPlan: "pro",
      });
      toast.success("Payment submitted! Awaiting admin verification.");
      setDialogOpen(false);
      // Reload pending state
      const pending = await getUserPendingPayment();
      setPendingPayment(pending);
      // Reset form
      setTxnId("");
      setSenderNumber("");
      setAmount("");
      setStep("choose");
      setSelectedMethod(null);
    } catch (err: any) {
      toast.error(err.message || "Failed to submit payment.");
    } finally {
      setSubmitting(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <p className="text-xs text-muted-foreground">Loading billing portal...</p>
        </div>
      </div>
    );
  }

  const planName = sub?.plan || "free";
  const planStatus = sub?.status || "inactive";
  const activeMethod = selectedMethod
    ? manualPaymentMethods.find((m) => m.id === selectedMethod)
    : null;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Subscription & Billing"
        description="Manage your plan, submit payments, and track verification status."
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Active plan status card */}
        <div className="md:col-span-7 space-y-4">
          <Card className="border-border bg-card shadow-sm rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-brand" />
                Active Subscription Plan
              </CardTitle>
              <CardDescription className="text-xs">
                Your current plan tier and subscription status.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-4 border border-border bg-muted/10 rounded-xl">
                <div className="space-y-1">
                  <span className="text-xxs font-bold text-muted-foreground uppercase">Current Tier</span>
                  <h4 className="text-lg font-extrabold capitalize text-brand">{planName} Tier</h4>
                </div>
                <span
                  className={`text-xxs font-bold px-2.5 py-1 rounded-full uppercase border ${
                    planStatus === "active"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                      : "bg-muted border-border text-muted-foreground"
                  }`}
                >
                  {planStatus === "active" ? "Active" : "Inactive"}
                </span>
              </div>

              {/* Pending payment banner */}
              {pendingPayment && planName === "free" && (
                <div className="flex items-center gap-3 p-4 border border-amber-500/20 bg-amber-500/5 rounded-xl">
                  <Clock className="h-5 w-5 text-amber-500 shrink-0" />
                  <div className="space-y-0.5">
                    <p className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      Payment Under Review
                    </p>
                    <p className="text-xxs text-muted-foreground">
                      TxID: <span className="font-mono font-bold">{pendingPayment.transactionId}</span> via{" "}
                      <span className="capitalize font-semibold">{pendingPayment.paymentMethod}</span> — ৳
                      {pendingPayment.amount}
                    </p>
                  </div>
                </div>
              )}

              {/* Upgrade CTA */}
              {planName === "free" && !pendingPayment && (
                <div className="space-y-4 pt-2">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Unlock unlimited resumes, custom portfolio domains, unwatermarked PDF exports,
                    and 200 monthly AI credits by upgrading to Pro.
                  </p>
                  <Button
                    onClick={() => setDialogOpen(true)}
                    className="w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs h-9 gap-1.5 shadow-sm"
                  >
                    <Sparkles className="h-4 w-4" />
                    Upgrade to Pro — ৳{proPlan.priceMonthly}/mo
                  </Button>
                </div>
              )}

              {/* Active pro confirmation */}
              {planName === "pro" && planStatus === "active" && (
                <p className="text-xs text-emerald-500 flex items-center gap-2 pt-2 font-semibold">
                  <ShieldCheck className="h-4.5 w-4.5" />
                  You have access to all Pro features. Thank you for your support!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Feature limits card */}
        <div className="md:col-span-5">
          <Card className="border-border bg-card shadow-sm rounded-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Plan Limits</CardTitle>
              <CardDescription className="text-xs">Current usage against plan constraints.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-muted-foreground">Resume Count</span>
                  <span>{planName === "free" ? "1 / 1" : "Unlimited"}</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full"
                    style={{ width: planName === "free" ? "100%" : "20%" }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <span className="text-muted-foreground">AI Credits</span>
                  <span>{planName === "free" ? "3 / month" : "200 / month"}</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full"
                    style={{ width: planName === "free" ? "0%" : "18%" }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ─── Manual Payment Dialog ─────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">
              {step === "choose" ? "Choose Payment Method" : `Pay via ${activeMethod?.name}`}
            </DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              {step === "choose"
                ? "Select how you would like to pay for the Pro plan."
                : "Follow the instructions below, then submit your payment details."}
            </DialogDescription>
          </DialogHeader>

          {step === "choose" && (
            <div className="grid grid-cols-1 gap-3 pt-2">
              {manualPaymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => handleSelectMethod(method.id)}
                  className="flex items-center gap-4 p-4 border border-border rounded-xl hover:border-brand/40 hover:bg-brand/5 transition-all text-left group"
                >
                  <div
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-extrabold text-sm shrink-0"
                    style={{ backgroundColor: method.color }}
                  >
                    {method.name.charAt(0)}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-bold text-foreground group-hover:text-brand transition-colors">
                      {method.name}
                    </h4>
                    <p className="text-xxs text-muted-foreground">
                      {method.accountType} Account — {method.accountNumber}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === "form" && activeMethod && (
            <div className="space-y-5 pt-2">
              {/* Payment number display */}
              <div className="p-4 border border-border rounded-xl bg-muted/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-xxs font-bold text-muted-foreground uppercase">
                      Send Money To
                    </span>
                    <p className="text-lg font-extrabold font-mono tracking-wider text-foreground">
                      {activeMethod.accountNumber}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon-xs"
                    onClick={() => copyToClipboard(activeMethod.accountNumber)}
                    className="h-8 w-8"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="flex items-center gap-3 text-xxs text-muted-foreground">
                  <span
                    className="font-bold px-2 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: activeMethod.color }}
                  >
                    {activeMethod.name}
                  </span>
                  <span>{activeMethod.accountType} Account</span>
                  <span className="ml-auto font-bold text-foreground">
                    ৳{proPlan.priceMonthly}
                  </span>
                </div>
              </div>

              {/* Instructions */}
              <div className="space-y-2">
                <span className="text-xxs font-bold text-muted-foreground uppercase">
                  Payment Steps
                </span>
                <ol className="space-y-1.5 text-xs text-muted-foreground">
                  {activeMethod.instructions.map((step, idx) => (
                    <li key={idx} className="flex gap-2">
                      <span className="text-brand font-bold shrink-0">{idx + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Verification form */}
              <div className="space-y-3 pt-1 border-t border-border">
                <div className="space-y-1">
                  <Label className="text-xxs font-semibold flex items-center gap-1.5">
                    <Hash className="h-3.5 w-3.5 text-muted-foreground" />
                    Transaction ID
                  </Label>
                  <Input
                    placeholder="e.g. BKX1234ABCD"
                    value={txnId}
                    onChange={(e) => setTxnId(e.target.value)}
                    className="text-xs h-9 font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xxs font-semibold flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    Sender Number
                  </Label>
                  <Input
                    placeholder="e.g. 01711223344"
                    value={senderNumber}
                    onChange={(e) => setSenderNumber(e.target.value)}
                    className="text-xs h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xxs font-semibold flex items-center gap-1.5">
                    <Banknote className="h-3.5 w-3.5 text-muted-foreground" />
                    Amount Sent (৳)
                  </Label>
                  <Input
                    type="number"
                    placeholder={`${proPlan.priceMonthly}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-xs h-9"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 rounded-full text-xs h-9 font-semibold"
                  onClick={() => {
                    setStep("choose");
                    setSelectedMethod(null);
                  }}
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmitPayment}
                  disabled={submitting || !txnId || !senderNumber || !amount}
                  className="flex-1 rounded-full bg-brand text-brand-foreground hover:bg-brand/90 text-xs h-9 font-semibold gap-1.5 shadow-sm"
                >
                  <CheckCircle className="h-4 w-4" />
                  {submitting ? "Submitting..." : "Submit for Verification"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
