"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getAdminPaymentRequests,
  approveManualPayment,
  rejectManualPayment,
} from "@/src/features/billing/manual-actions";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  Sparkles,
  Loader2,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Banknote,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

type PaymentStatus = "all" | "pending" | "approved" | "rejected";

export default function AdminPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<PaymentStatus>("all");
  const [search, setSearch] = useState("");
  const [processing, setProcessing] = useState<string | null>(null);

  // Reject dialog
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [rejectTarget, setRejectTarget] = useState<string | null>(null);
  const [rejectNote, setRejectNote] = useState("");

  const loadPayments = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAdminPaymentRequests({
        status: statusFilter === "all" ? "all" : statusFilter,
        search: search.trim() || undefined,
      });
      setPayments(data);
    } catch {
      toast.error("Failed to load payment requests.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, search]);

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);

  const handleSearch = () => {
    loadPayments();
  };

  const handleApprove = async (paymentId: string) => {
    setProcessing(paymentId);
    try {
      await approveManualPayment(paymentId);
      toast.success("Payment approved. User upgraded to Pro!");
      loadPayments();
    } catch (err: any) {
      toast.error(err.message || "Failed to approve payment.");
    } finally {
      setProcessing(null);
    }
  };

  const openRejectDialog = (paymentId: string) => {
    setRejectTarget(paymentId);
    setRejectNote("");
    setRejectDialogOpen(true);
  };

  const handleReject = async () => {
    if (!rejectTarget) return;
    setProcessing(rejectTarget);
    try {
      await rejectManualPayment(rejectTarget, rejectNote || undefined);
      toast.success("Payment request rejected.");
      setRejectDialogOpen(false);
      loadPayments();
    } catch (err: any) {
      toast.error(err.message || "Failed to reject payment.");
    } finally {
      setProcessing(null);
    }
  };

  // Stats derived from loaded data
  const pendingCount = payments.filter((p) => p.status === "pending").length;
  const approvedCount = payments.filter((p) => p.status === "approved").length;
  const totalRevenue = payments
    .filter((p) => p.status === "approved")
    .reduce((sum: number, p: any) => sum + p.amount, 0);

  const stats = [
    { label: "Pending Reviews", value: String(pendingCount), icon: Clock, color: "text-amber-500" },
    { label: "Approved Payments", value: String(approvedCount), icon: CheckCircle, color: "text-emerald-500" },
    { label: "Total Revenue (৳)", value: `৳${totalRevenue.toLocaleString()}`, icon: Banknote, color: "text-brand" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Admin Control Center"
        description="Manage manual payment verifications, user plans, and platform metrics."
      />

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((st, idx) => {
          const Icon = st.icon;
          return (
            <Card key={idx} className="border border-border bg-card shadow-sm rounded-xl">
              <CardContent className="p-6 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xxs font-bold text-muted-foreground uppercase">{st.label}</span>
                  <h4 className="text-xl font-extrabold text-foreground">{st.value}</h4>
                </div>
                <div className={`h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0 ${st.color}`}>
                  <Icon className="h-4.5 w-4.5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Payment Requests Table */}
      <Card className="border border-border bg-card shadow-sm rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-brand" />
                Manual Payment Requests
              </CardTitle>
              <CardDescription className="text-xs">
                Review, approve, or reject user-submitted payment verifications.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search TxID or Number..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="text-xs h-8 pl-8 w-48"
                />
              </div>
              <Select value={statusFilter} onValueChange={(val) => setStatusFilter((val || "all") as PaymentStatus)}>
                <SelectTrigger className="text-xs h-8 w-32 rounded-lg border-border">
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All Status</SelectItem>
                  <SelectItem value="pending" className="text-xs">Pending</SelectItem>
                  <SelectItem value="approved" className="text-xs">Approved</SelectItem>
                  <SelectItem value="rejected" className="text-xs">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-6 w-6 animate-spin text-brand" />
            </div>
          ) : payments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Banknote className="h-10 w-10 text-muted-foreground/40 mb-3" />
              <p className="text-xs font-semibold text-muted-foreground">No payment requests found.</p>
              <p className="text-xxs text-muted-foreground">Adjust your filters or wait for new submissions.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Method</TableHead>
                  <TableHead className="text-xs">Transaction ID</TableHead>
                  <TableHead className="text-xs">Sender</TableHead>
                  <TableHead className="text-xs">Amount</TableHead>
                  <TableHead className="text-xs">Plan</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => (
                  <TableRow key={p.id} className="hover:bg-muted/10">
                    <TableCell className="text-xs font-semibold capitalize">
                      <span
                        className="inline-block h-2 w-2 rounded-full mr-1.5"
                        style={{
                          backgroundColor: p.paymentMethod === "bkash" ? "#E2136E" : "#F6921E",
                        }}
                      />
                      {p.paymentMethod}
                    </TableCell>
                    <TableCell className="text-xs font-mono font-bold text-foreground">
                      {p.transactionId}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{p.senderNumber}</TableCell>
                    <TableCell className="text-xs font-bold">৳{p.amount}</TableCell>
                    <TableCell className="text-xs capitalize">
                      <Badge variant="outline" className="rounded-full text-xxs font-semibold">
                        {p.targetPlan}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs">
                      <Badge
                        variant={
                          p.status === "approved"
                            ? "default"
                            : p.status === "rejected"
                              ? "destructive"
                              : "outline"
                        }
                        className="rounded-full text-xxs font-semibold capitalize"
                      >
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(p.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      {p.status === "pending" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            size="icon-xs"
                            variant="ghost"
                            onClick={() => handleApprove(p.id)}
                            disabled={processing === p.id}
                            className="h-7 w-7 text-emerald-500 hover:bg-emerald-500/10 hover:text-emerald-600"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon-xs"
                            variant="ghost"
                            onClick={() => openRejectDialog(p.id)}
                            disabled={processing === p.id}
                            className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <span className="text-xxs text-muted-foreground">
                          {p.reviewedAt
                            ? new Date(p.reviewedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })
                            : "—"}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Reject confirmation dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Reject Payment</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground">
              Optionally provide a reason for rejecting this payment request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Textarea
              rows={3}
              placeholder="e.g. Transaction ID not found, amount mismatch..."
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              className="text-xs"
            />
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setRejectDialogOpen(false)}
                className="flex-1 rounded-full text-xs h-9 font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={handleReject}
                disabled={processing !== null}
                variant="destructive"
                className="flex-1 rounded-full text-xs h-9 font-semibold gap-1.5"
              >
                <XCircle className="h-4 w-4" />
                {processing ? "Rejecting..." : "Reject Payment"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
