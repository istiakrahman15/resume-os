"use client";

import { createClient } from "@/src/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { LoginInput, SignupInput } from "../schemas";

export function useAuth() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (data: LoginInput) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      toast.success("Successfully logged in.");
      router.push("/dashboard");
      router.refresh();
      return { success: true };
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
      return { success: false, error: err };
    }
  };

  const handleSignup = async (data: SignupInput) => {
    const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");

    try {
      const { data: signUpData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            username: data.username,
            role: "user",
          },
        },
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      // Only attempt DB profile creation in live mode (when Supabase + DB are configured)
      if (!isMock && signUpData?.user) {
        try {
          const { createProfileAfterSignup } = await import("../actions");
          await createProfileAfterSignup({
            id: signUpData.user.id,
            username: data.username,
            email: data.email,
          });
        } catch (profileErr) {
          // Profile creation is non-blocking — log but continue
          console.warn("[ResumeOS] Profile creation failed (will retry on next login):", profileErr);
        }
      }

      if (isMock) {
        toast.success("Successfully signed up and logged in.");
        router.push("/dashboard");
        router.refresh();
      } else {
        toast.success("Signup successful! Please check your email to verify your account.");
        router.push("/verify-email");
      }
      return { success: true };
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
      return { success: false, error: err };
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast.error(error.message);
        return { success: false, error };
      }

      return { success: true };
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
      return { success: false, error: err };
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        return { success: false };
      }

      toast.success("Logged out successfully.");
      router.push("/login");
      router.refresh();
      return { success: true };
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
      return { success: false };
    }
  };

  return {
    handleLogin,
    handleSignup,
    handleOAuth,
    handleLogout,
  };
}
