"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight, LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { appNav } from "@/src/config/nav";
import { siteConfig } from "@/src/config/site";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    // Auth logging out trigger placeholder
    console.log("Logout triggered");
  };

  return (
    <aside
      className={cn(
        "hidden lg:flex flex-col h-screen sticky top-0 border-r border-border bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out z-20",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed ? (
          <Link href="/dashboard" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground text-base">
              R
            </span>
            <span className="text-foreground">{siteConfig.name}</span>
          </Link>
        ) : (
          <Link href="/dashboard" className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground font-bold text-base">
            R
          </Link>
        )}

        <Button
          variant="ghost"
          size="icon-xs"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "h-6 w-6 border border-border bg-background hover:bg-muted text-muted-foreground",
            collapsed ? "absolute -right-3 top-5" : ""
          )}
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </Button>
      </div>

      {/* Navigation List */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {appNav.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              {!collapsed && section.label && (
                <h4 className="px-3 text-xxs font-semibold uppercase tracking-wider text-muted-foreground/80">
                  {section.label}
                </h4>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                  const Icon = item.icon;

                  const linkEl = (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all group relative",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold"
                          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
                      )}
                    >
                      <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-brand" : "text-muted-foreground group-hover:text-foreground")} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {!collapsed && item.pro && (
                        <span className="ml-auto inline-flex items-center gap-0.5 rounded-full bg-brand/10 px-1.5 py-0.5 text-xxs font-medium text-brand">
                          <Sparkles className="h-2 w-2" />
                          Pro
                        </span>
                      )}
                    </Link>
                  );

                  if (collapsed) {
                    return (
                      <li key={item.href}>
                        <Tooltip>
                          <TooltipTrigger render={linkEl} />
                          <TooltipContent side="right" className="flex items-center gap-2">
                            {item.label}
                            {item.pro && (
                              <span className="inline-flex items-center gap-0.5 rounded-full bg-brand/10 px-1.5 py-0.5 text-xxs font-medium text-brand">
                                <Sparkles className="h-2.5 w-2.5" /> Pro
                              </span>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </li>
                    );
                  }

                  return <li key={item.href}>{linkEl}</li>;
                })}
              </ul>
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Sidebar Footer User Info */}
      <div className="p-4 border-t border-border flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarFallback className="bg-brand/10 text-brand text-xs font-semibold">U</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-foreground truncate">User Profile</span>
              <span className="text-xxs text-muted-foreground truncate">Free Tier</span>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={handleLogout}
            className="text-muted-foreground hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </aside>
  );
}
