"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, Sparkles, Sliders } from "lucide-react";
import { Button } from "@/components/ui/button";
import { templateRegistry, type TemplateCategory } from "@/src/config/templates";

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | "all">("all");

  const categories: Array<{ label: string; value: TemplateCategory | "all" }> = [
    { label: "All Templates", value: "all" },
    { label: "Modern", value: "modern" },
    { label: "Minimal", value: "minimal" },
    { label: "Classic", value: "classic" },
    { label: "Professional", value: "professional" },
    { label: "Developer", value: "developer" },
    { label: "Creative", value: "creative" },
  ];

  const filteredTemplates = templateRegistry.filter(
    (t) => selectedCategory === "all" || t.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Resume Templates
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed">
          Pre-optimized template architectures fully compliant with automated parser guidelines.
        </p>
      </div>

      {/* Filter Category Selectors */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <Button
            key={cat.value}
            variant={selectedCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat.value)}
            className="rounded-full"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group border border-border rounded-xl bg-card overflow-hidden hover:border-brand/40 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div className="aspect-[4/5] bg-muted/20 flex items-center justify-center border-b border-border p-4 relative">
              <FileText className="h-16 w-16 text-muted-foreground/35 group-hover:scale-110 transition-transform duration-300" />
              <span
                className={`absolute top-4 right-4 text-xxs font-bold px-2 py-0.5 rounded-full uppercase border ${
                  template.tier === "pro"
                    ? "bg-brand/10 border-brand/20 text-brand"
                    : "bg-muted border-border text-muted-foreground"
                }`}
              >
                {template.tier}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">{template.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {template.description}
                </p>
              </div>
              <div className="flex justify-between items-center gap-4">
                <span className="text-xxs text-muted-foreground capitalize">
                  Layout: {template.pdfLayout}
                </span>
                <Link href={`/signup?template=${template.id}`}>
                  <Button size="sm" className="rounded-full text-xs bg-brand text-brand-foreground hover:bg-brand/90 font-semibold gap-1">
                    Use template
                    <Sparkles className="h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
