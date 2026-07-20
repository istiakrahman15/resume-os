"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getResumesList } from "@/src/features/resumes/actions";
import { createCoverLetter } from "@/src/features/cover-letters/actions";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Sparkles, Mail } from "lucide-react";
import { toast } from "sonner";

export default function NewCoverLetterPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState<any[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState<string>("");
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadResumes() {
      try {
        const list = await getResumesList();
        setResumes(list);
      } catch (err) {
        toast.error("Failed to load resumes.");
      }
    }
    loadResumes();
  }, []);

  const handleCreate = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title.");
      return;
    }

    setLoading(true);
    try {
      const letter = await createCoverLetter(title, selectedResumeId || undefined);
      toast.success("Cover letter created successfully.");
      router.push(`/cover-letters/${letter.id}`);
    } catch (err: any) {
      toast.error(err.message || "Failed to create cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const headerActions = (
    <Link href="/cover-letters">
      <Button variant="ghost" size="sm" className="gap-1 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to list
      </Button>
    </Link>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Create Cover Letter"
        description="Draft a professional letter aligned with your resume document details."
        actions={headerActions}
      />

      <div className="max-w-xl mx-auto pt-4">
        <Card className="border border-border bg-card shadow-sm rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Mail className="h-5 w-5 text-brand" />
              Document Configurations
            </CardTitle>
            <CardDescription className="text-xs">Provide naming details to configure the letter context.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">Letter Title</Label>
              <Input
                placeholder="e.g. Frontend Engineer Cover Letter"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-xs h-9 rounded-lg"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-muted-foreground uppercase">Linked Resume (Optional)</Label>
              <Select value={selectedResumeId} onValueChange={(val) => setSelectedResumeId(val || "")}>
                <SelectTrigger className="text-xs h-9 rounded-lg border-border">
                  <SelectValue placeholder="Select resume details" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none" className="text-xs">No Linked Resume</SelectItem>
                  {resumes.map((r) => (
                    <SelectItem key={r.id} value={r.id} className="text-xs">
                      {r.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleCreate}
              disabled={loading}
              className="w-full rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs h-9 gap-1.5 shadow-sm mt-2"
            >
              <Sparkles className="h-4 w-4" />
              {loading ? "Creating document..." : "Create with setup"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
