"use client";

import { useResumeEditorStore } from "@/src/features/resumes/stores/resume-editor-store";
import { MinimalTemplate } from "@/src/features/resumes/templates/minimal";
import { ModernTemplate } from "@/src/features/resumes/templates/modern";
import { ClassicTemplate } from "@/src/features/resumes/templates/classic";
import { Loader2 } from "lucide-react";

export function ResumePreview() {
  const { templateId, data, theme, zoom } = useResumeEditorStore();

  const getTemplateComponent = () => {
    switch (templateId) {
      case "modern":
        return <ModernTemplate data={data} theme={theme} />;
      case "classic":
        return <ClassicTemplate data={data} theme={theme} />;
      case "minimal":
      default:
        return <MinimalTemplate data={data} theme={theme} />;
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-muted/30 border border-border rounded-xl overflow-auto select-none min-h-[500px]">
      <div
        className="transition-transform duration-200 ease-out origin-center bg-white shadow-lg border border-zinc-200"
        style={{
          transform: `scale(${zoom / 100})`,
          width: "100%",
          maxWidth: "800px",
        }}
      >
        {getTemplateComponent()}
      </div>
    </div>
  );
}
