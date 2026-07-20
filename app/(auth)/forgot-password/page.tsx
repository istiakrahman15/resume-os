"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Mail, ShieldAlert, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/src/lib/supabase/client";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/src/features/auth/schemas";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordInput) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setSuccess(true);
      toast.success("Password reset email sent.");
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-6 text-center py-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mx-auto mb-2">
          <CheckCircle2 className="h-6 w-6 stroke-[1.5]" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-foreground">Check your email</h3>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
            We have sent a password reset link to your email address. Please follow the instructions to reset your password.
          </p>
        </div>
        <div className="pt-2">
          <Link href="/login">
            <Button variant="outline" className="w-full h-9 text-xs">
              Back to sign in
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-xl font-bold tracking-tight text-foreground font-heading">Reset your password</h2>
        <p className="text-xs text-muted-foreground">
          Enter your email address and we'll send you a recovery link.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/75" />
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-9 text-xs"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xxs font-medium text-destructive flex items-center gap-1 mt-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              {errors.email.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full rounded-lg bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs h-9 mt-2">
          {loading ? "Sending link..." : "Send reset link"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground pt-2">
        Remember your password?{" "}
        <Link href="/login" className="font-semibold text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
