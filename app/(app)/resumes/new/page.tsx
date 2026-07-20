"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { templateRegistry } from "@/src/config/templates";
import { createResume } from "@/src/features/resumes/actions";
import { toast } from "sonner";

export default function NewResumePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string>("minimal");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const template = templateRegistry.find((t) => t.id === selectedTemplate);
      const title = `My ${template ? template.name : "Untitled"} Resume`;
      const newResume = await createResume(title, selectedTemplate);
      toast.success("Resume created successfully.");
      router.push(`/resumes/${newResume.id}`);
    } catch (err: any) {
      toast.error(err.message || "Could not create resume.");
    } finally {
      setLoading(false);
    }
  };

  const headerActions = (
    <Link href="/resumes">
      <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to list
      </Button>
    </Link>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Select Template"
        description="Choose a design style to initialize your document structure. You can customize accents and layouts inside."
        actions={headerActions}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
        {templateRegistry.map((template) => {
          const isSelected = selectedTemplate === template.id;

          return (
            <div
              key={template.id}
              onClick={() => setSelectedTemplate(template.id)}
              className={`group border rounded-xl overflow-hidden cursor-pointer bg-card transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? "border-brand ring-2 ring-brand/20 shadow-md scale-102"
                  : "border-border shadow-sm hover:border-brand/40"
              }`}
            >
              <div className="aspect-[4/5] bg-muted/20 flex items-center justify-center border-b border-border p-4 relative">
                <FileText className={`h-16 w-16 transition-all duration-300 ${isSelected ? "text-brand scale-110" : "text-muted-foreground/35 group-hover:scale-105"}`} />
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
                <div className="flex justify-between items-center gap-2">
                  <span className="text-xxs text-muted-foreground capitalize">
                    Layout: {template.pdfLayout}
                  </span>
                  {isSelected && (
                    <span className="text-xxs font-bold text-brand uppercase">Selected</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Initialize action bar */}
      <div className="border-t border-border pt-6 flex items-center justify-end">
        <Button
          onClick={handleCreate}
          disabled={loading}
          className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold gap-1.5 px-8 shadow-md"
        >
          {loading ? "Initializing..." : "Create with template"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
