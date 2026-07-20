"use client";

import { useResumeEditorStore } from "@/src/features/resumes/stores/resume-editor-store";
import { FileText, Target, Mail, Briefcase, Plus, User, FileText as SummaryIcon, GraduationCap, Laptop, FolderGit, Award, Languages, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

export function SectionList() {
  const { activeSection, setActiveSection } = useResumeEditorStore();

  const sections = [
    { id: "header", label: "Contact Header", icon: User },
    { id: "summary", label: "Summary Profile", icon: SummaryIcon },
    { id: "workExperience", label: "Work Experience", icon: Briefcase },
    { id: "education", label: "Education", icon: GraduationCap },
    { id: "skills", label: "Skills Categories", icon: Laptop },
    { id: "projects", label: "Personal Projects", icon: FolderGit },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "languages", label: "Languages", icon: Languages },
  ];

  return (
    <div className="w-full flex flex-col gap-1">
      <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider px-3 mb-2">
        Resume Sections
      </div>
      {sections.map((section) => {
        const Icon = section.icon;
        const isActive = activeSection === section.id;

        return (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-lg text-left transition-all",
              isActive
                ? "bg-brand/10 text-brand"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <Icon className={cn("h-4 w-4 shrink-0", isActive ? "text-brand" : "text-muted-foreground")} />
            <span>{section.label}</span>
          </button>
        );
      })}
    </div>
  );
}
