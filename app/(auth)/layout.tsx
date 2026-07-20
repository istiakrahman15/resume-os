import Link from "next/link";
import { siteConfig } from "@/src/config/site";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-card/30 to-background/50 relative">
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-20">
        <div className="h-[300px] w-[500px] rounded-full bg-brand/10 blur-[80px]" />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5 font-bold text-xl tracking-tight mb-6">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground text-base shadow-sm">
            R
          </span>
          <span className="text-foreground">{siteConfig.name}</span>
        </Link>
      </div>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-card py-8 px-6 border border-border shadow-xl rounded-2xl sm:px-10">
          {children}
        </div>
      </div>
    </div>
  );
}
