"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldAlert, KeyRound, Mail, User } from "lucide-react";
import { GithubIcon, ChromeIcon } from "@/components/shared/brand-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/src/features/auth/hooks/use-auth";
import { signupSchema, type SignupInput } from "@/src/features/auth/schemas";
import { useState } from "react";

export default function SignupPage() {
  const { handleSignup, handleOAuth } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupInput) => {
    setLoading(true);
    await handleSignup(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5 text-center">
        <h2 className="text-xl font-bold tracking-tight text-foreground">Create your account</h2>
        <p className="text-xs text-muted-foreground">
          Enter details below to create your developer profile.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" className="w-full text-xs font-semibold h-9 rounded-lg" onClick={() => handleOAuth("google")}>
          <ChromeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          Google
        </Button>
        <Button variant="outline" className="w-full text-xs font-semibold h-9 rounded-lg" onClick={() => handleOAuth("github")}>
          <GithubIcon className="mr-2 h-4 w-4 text-muted-foreground" />
          GitHub
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xxs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or sign up with email</span>
        </div>
      </div>

      {/* Form Input fields */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="username" className="text-xs font-semibold text-muted-foreground">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/75" />
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              className="pl-9 text-xs"
              {...register("username")}
            />
          </div>
          {errors.username && (
            <p className="text-xxs font-medium text-destructive flex items-center gap-1 mt-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              {errors.username.message}
            </p>
          )}
        </div>

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

        <div className="space-y-1">
          <Label htmlFor="password" className="text-xs font-semibold text-muted-foreground">Password</Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/75" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-9 text-xs"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-xxs font-medium text-destructive flex items-center gap-1 mt-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="confirmPassword" className="text-xs font-semibold text-muted-foreground">Confirm Password</Label>
          <div className="relative">
            <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/75" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="pl-9 text-xs"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-xxs font-medium text-destructive flex items-center gap-1 mt-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={loading} className="w-full rounded-lg bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs h-9 mt-2">
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground pt-2">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-brand hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
