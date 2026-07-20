"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles, AlertTriangle, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCoverLetterDetails, updateCoverLetter } from "@/src/features/cover-letters/actions";
import { toast } from "sonner";

export default function CoverLetterEditorPage() {
  const params = useParams();
  const router = useRouter();
  const letterId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("Cover Letter");

  // Editable Letter Content Fields
  const [greeting, setGreeting] = useState("Dear Hiring Team,");
  const [opening, setOpening] = useState("");
  const [body, setBody] = useState("");
  const [closing, setClosing] = useState("Sincerely,\n[Your Name]");

  // AI Prompt Inputs
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [tone, setTone] = useState("professional");
  const [aiGenerating, setAiGenerating] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const ltr = await getCoverLetterDetails(letterId);
        setTitle(ltr.title);
        setGreeting(ltr.bodyJson?.greeting || "Dear Hiring Team,");
        setOpening(ltr.bodyJson?.opening || "");
        setBody(ltr.bodyJson?.body?.join("\n\n") || "");
        setClosing(ltr.bodyJson?.closing || "Sincerely,\n[Your Name]");
      } catch (err: any) {
        setError(err.message || "Failed to load cover letter details.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [letterId]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateCoverLetter(letterId, {
        bodyJson: {
          greeting,
          opening,
          body: body.split("\n\n"),
          closing,
        },
      });
      toast.success("Cover letter saved successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to save cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!company.trim() || !role.trim()) {
      toast.error("Please enter company and role to generate cover letter.");
      return;
    }

    setAiGenerating(true);
    setBody("");

    try {
      const response = await fetch("/api/ai/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          company,
          jobDescription,
          tone,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate cover letter.");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let streamedBody = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          streamedBody += decoder.decode(value);
          setBody(streamedBody);
        }
      }
      toast.success("AI draft generated successfully.");
    } catch (err: any) {
      toast.error(err.message || "Failed to stream generation.");
    } finally {
      setAiGenerating(false);
    }
  };

  if (loading && !aiGenerating) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand" />
          <p className="text-xs text-muted-foreground">Loading letter editor...</p>
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
            <Link href="/cover-letters">
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
      {/* Editor Sub-Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <Link href="/cover-letters">
            <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-sm font-bold text-foreground">{title}</h1>
            <p className="text-xxs text-muted-foreground">Editing draft copy</p>
          </div>
        </div>

        <Button
          onClick={handleSave}
          className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs h-9 px-6 shadow-sm gap-1.5"
        >
          <Save className="h-4 w-4" />
          Save draft
        </Button>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">
        {/* Left Side: Standard Letter Input Editor */}
        <div className="lg:col-span-7 border border-border bg-card p-6 rounded-xl overflow-y-auto space-y-4">
          <h3 className="text-sm font-bold border-b pb-2">Letter Content Editor</h3>

          <div className="space-y-1">
            <Label className="text-xxs font-semibold">Salutation Greeting</Label>
            <Input size="sm" value={greeting} onChange={(e) => setGreeting(e.target.value)} />
          </div>

          <div className="space-y-1">
            <Label className="text-xxs font-semibold">Opening Paragraph (Optional)</Label>
            <Textarea
              rows={2}
              value={opening}
              onChange={(e) => setOpening(e.target.value)}
              placeholder="E.g. I am excited to apply for..."
              className="text-xs"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xxs font-semibold">Main Body Paragraphs (separate paragraphs with blank line)</Label>
            <Textarea
              rows={12}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Main achievement paragraphs..."
              className="text-xs font-sans leading-relaxed"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-xxs font-semibold">Closing & Sign-off</Label>
            <Textarea
              rows={3}
              value={closing}
              onChange={(e) => setClosing(e.target.value)}
              className="text-xs"
            />
          </div>
        </div>

        {/* Right Side: AI Assistance Panel */}
        <div className="lg:col-span-5 border border-border bg-card p-6 rounded-xl overflow-y-auto space-y-4 flex flex-col">
          <h3 className="text-sm font-bold border-b pb-2 flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-brand" />
            Guided AI Generator
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-xxs font-semibold">Company Name</Label>
              <Input size="sm" placeholder="e.g. Vercel" value={company} onChange={(e) => setCompany(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xxs font-semibold">Role Name</Label>
              <Input size="sm" placeholder="e.g. Software Engineer" value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-xxs font-semibold">Tone Variant</Label>
            <Select value={tone} onValueChange={(val) => setTone(val || "")}>
              <SelectTrigger className="text-xs h-9 rounded-lg border-border">
                <SelectValue placeholder="Select tone style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professional" className="text-xs">Professional & Formal</SelectItem>
                <SelectItem value="confident" className="text-xs">Confident & Energetic</SelectItem>
                <SelectItem value="concise" className="text-xs">Concise & Direct</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 flex-1">
            <Label className="text-xxs font-semibold">Job Description (Optional)</Label>
            <Textarea
              rows={6}
              placeholder="Paste specific qualifications to align accomplishments..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="text-xs font-sans h-[calc(100%-2rem)] min-h-[120px]"
            />
          </div>

          <Button
            onClick={handleGenerateAI}
            disabled={aiGenerating}
            className="w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs h-9 gap-1.5 shadow-sm mt-4"
          >
            <Sparkles className="h-4 w-4" />
            {aiGenerating ? "Streaming draft..." : "Generate AI Letter"}
          </Button>
        </div>
      </div>
    </div>
  );
}
