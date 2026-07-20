"use client";

import { useEffect } from "react";
import { siteConfig } from "@/src/config/site";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ResumeOS] Uncaught error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
          <div className="space-y-4 max-w-sm">
            <span className="text-7xl font-black tracking-tighter text-destructive/20 select-none">500</span>
            <h1 className="text-xl font-extrabold text-foreground -mt-2">Something Went Wrong</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An unexpected error occurred. Our team has been notified. Please try again.
            </p>
            <button
              onClick={reset}
              className="inline-flex items-center justify-center h-9 px-6 rounded-full bg-brand text-brand-foreground text-xs font-semibold hover:bg-brand/90 transition-colors shadow-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
