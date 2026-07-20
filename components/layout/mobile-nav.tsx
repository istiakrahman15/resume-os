"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Mail, Target, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const pathname = usePathname();

  const items = [
    { label: "Home", href: "/dashboard", icon: LayoutDashboard },
    { label: "Resumes", href: "/resumes", icon: FileText },
    { label: "Cover Letters", href: "/cover-letters", icon: Mail },
    { label: "ATS Score", href: "/ats", icon: Target },
    { label: "Jobs", href: "/jobs", icon: Briefcase },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-border bg-card/90 backdrop-blur-md flex items-center justify-around px-2 pb-safe z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)]">
      {items.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1.5 w-14 h-full text-xxs font-medium transition-colors",
              isActive
                ? "text-brand"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn("h-4.5 w-4.5 shrink-0 transition-colors", isActive ? "stroke-[2.25]" : "stroke-[1.5]")} />
            <span className="truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
