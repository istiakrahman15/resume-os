"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, FileText, Mail, Target, Briefcase, Settings, Sparkles } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  const items = [
    { label: "Create New Resume", href: "/resumes/new", icon: FileText, category: "Actions" },
    { label: "Generate Cover Letter", href: "/cover-letters", icon: Mail, category: "Actions" },
    { label: "ATS Scanner", href: "/ats", icon: Target, category: "Actions" },
    { label: "Job Tracker Kanban", href: "/jobs", icon: Briefcase, category: "Actions" },
    { label: "Upgrade Plan", href: "/billing", icon: Sparkles, category: "Settings" },
    { label: "Account Settings", href: "/settings", icon: Settings, category: "Settings" },
  ];

  const filteredItems = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    onOpenChange(false);
    setQuery("");
    router.push(href);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg p-0 overflow-hidden bg-popover rounded-xl border border-border" showCloseButton={false}>
        <div className="flex items-center border-b border-border px-3.5 py-3 gap-2">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none border-none py-1"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center rounded border border-border bg-muted px-1.5 font-mono text-[9px] font-medium text-muted-foreground">
            ESC
          </kbd>
        </div>

        <div className="max-h-[300px] overflow-y-auto p-2 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="p-4 text-center text-xs text-muted-foreground">
              No results found.
            </div>
          ) : (
            <div>
              <div className="text-[10px] uppercase font-bold text-muted-foreground px-2 pb-1.5 tracking-wider">
                Suggestions
              </div>
              <ul className="space-y-0.5">
                {filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label}>
                      <button
                        onClick={() => handleSelect(item.href)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/80 rounded-lg text-left transition-colors font-medium"
                      >
                        <Icon className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-foreground" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
