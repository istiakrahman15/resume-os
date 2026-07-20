import Link from "next/link";
import { siteConfig } from "@/src/config/site";

export const metadata = {
  title: `Page Not Found — ${siteConfig.name}`,
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="space-y-4 max-w-sm">
        <span className="text-7xl font-black tracking-tighter text-brand/20 select-none">404</span>
        <h1 className="text-xl font-extrabold text-foreground -mt-2">Page Not Found</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          The page you're looking for doesn't exist or has been moved to a different URL.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-9 px-6 rounded-full bg-brand text-brand-foreground text-xs font-semibold hover:bg-brand/90 transition-colors shadow-sm"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
