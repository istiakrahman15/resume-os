"use client";

import { useState, useEffect } from "react";
import { Bell, Search, Sparkles, User, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CommandPalette } from "@/components/layout/command-palette";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between px-6 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-10 w-full">
      {/* Search Input Trigger */}
      <div className="flex items-center w-full max-w-sm">
        <Button
          variant="outline"
          className="w-full justify-start text-muted-foreground/75 text-xs font-normal h-9 rounded-lg border-border bg-background/50 hover:bg-muted"
          onClick={() => setSearchOpen(true)}
        >
          <Search className="mr-2 h-3.5 w-3.5" />
          <span>Search command palette...</span>
          <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </Button>
      </div>

      {/* Action Buttons & Profile Dropdown */}
      <div className="flex items-center gap-3">
        {/* Pro upgrade badge */}
        <Button
          variant="outline"
          size="sm"
          className="hidden sm:inline-flex items-center gap-1.5 border-brand/20 bg-brand/5 hover:bg-brand/10 text-brand text-xs font-semibold h-8 rounded-full"
        >
          <Sparkles className="h-3 w-3" />
          Upgrade to Pro
        </Button>

        {/* Theme Toggle */}
        {mounted && (
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-muted-foreground hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        )}

        {/* Notifications Trigger */}
        <Button
          variant="ghost"
          size="icon-sm"
          className="text-muted-foreground hover:text-foreground relative"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand animate-pulse" />
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative h-8 w-8 rounded-full outline-none select-none">
            <Avatar className="h-8 w-8 border border-border">
              <AvatarFallback className="bg-brand/10 text-brand text-xs font-semibold">U</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-semibold leading-none text-foreground">User Profile</p>
                  <p className="text-xs leading-none text-muted-foreground">free@resumeos.app</p>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Profile settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Sparkles className="mr-2 h-4 w-4 text-brand" />
                <span>Billing / Plans</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Global Command Search Overlay */}
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
