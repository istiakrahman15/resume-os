"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ZoomIn, ZoomOut, RotateCcw, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useResumeEditorStore } from "@/src/features/resumes/stores/resume-editor-store";
import { getResumeDetails } from "@/src/features/resumes/actions";
import { SectionList } from "@/components/resumes/section-list";
import { SectionEditor } from "@/components/resumes/section-editor";
import { ResumePreview } from "@/components/resumes/resume-preview";
import { Button } from "@/components/ui/button";

export default function ResumeBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { loadResume, title, zoom, setZoom } = useResumeEditorStore();

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const resume = await getResumeDetails(resumeId);
        loadResume({
          id: resume.id,
          title: resume.title,
          templateId: resume.templateId,
          themeJson: resume.themeJson,
          dataJson: resume.dataJson,
        });
      } catch (err: any) {
        setError(err.message || "Failed to load resume details.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [resumeId, loadResume]);

  const handleZoomIn = () => setZoom(Math.min(zoom + 10, 150));
  const handleZoomOut = () => setZoom(Math.max(zoom - 10, 50));
  const handleZoomReset = () => setZoom(100);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <p className="text-xs text-muted-foreground">Loading resume editor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <div className="h-12 w-12 rounded-full bg-destructive/10 text-destructive flex items-center justify-center mx-auto">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-foreground">Error loading editor</h3>
          <p className="text-xs text-muted-foreground">{error}</p>
          <div className="pt-2">
            <Link href="/resumes">
              <Button size="sm" variant="outline">
                Back to dashboard list
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-10rem)] flex flex-col gap-4">
      {/* Builder Sub-Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Link href="/resumes">
            <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-sm font-bold text-foreground">{title}</h1>
            <p className="text-xxs text-muted-foreground">Drafting resume version</p>
          </div>
        </div>

        {/* Zoom scale controls */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon-xs" onClick={handleZoomOut} disabled={zoom <= 50}>
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-[10px] font-semibold text-muted-foreground w-12 text-center">
            {zoom}%
          </span>
          <Button variant="ghost" size="icon-xs" onClick={handleZoomIn} disabled={zoom >= 150}>
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon-xs" onClick={handleZoomReset} className="ml-1 text-muted-foreground">
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Main 3-Pane Layout panel */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Left Side Pane: Sections Nav */}
        <div className="lg:col-span-2 border border-border bg-card p-4 rounded-xl overflow-y-auto">
          <SectionList />
        </div>

        {/* Center Pane: Active form values */}
        <div className="lg:col-span-5 border border-border bg-card p-4 rounded-xl overflow-y-auto flex flex-col">
          <SectionEditor />
        </div>

        {/* Right Pane: Live layout preview */}
        <div className="lg:col-span-5 flex flex-col h-full min-h-0">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
}
