import Link from "next/link";
import { Plus, FileText, Target, Calendar, Trash2, Copy, Eye, Sparkles } from "lucide-react";
import { getResumesList } from "@/src/features/resumes/actions";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // dynamic page

export default async function ResumesPage() {
  let resumes: Awaited<ReturnType<typeof getResumesList>> = [];
  try {
    resumes = await getResumesList();
  } catch {
    // Database not configured or user not authenticated — show empty state
  }

  const headerActions = (
    <Link href="/resumes/new">
      <Button size="sm" className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold gap-1.5 shadow-sm">
        <Plus className="h-4 w-4" />
        New Resume
      </Button>
    </Link>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Resumes"
        description="Build and optimize your resume templates for automated tracking checks."
        actions={resumes.length > 0 ? headerActions : undefined}
      />

      {resumes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No resumes built yet"
          description="Build your first resume utilizing our block editor and optimize it against target descriptions."
          action={
            <Link href="/resumes/new">
              <Button size="sm" className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold gap-1.5 shadow-sm">
                <Plus className="h-4 w-4" />
                Create Resume
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => {
            const lastUpdated = new Date(resume.updatedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            // Mock score values for UI representation
            const mockScore = 84;

            return (
              <Card key={resume.id} className="border border-border bg-card shadow-sm hover:border-brand/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-bold text-foreground truncate max-w-[180px]">
                      {resume.title}
                    </CardTitle>
                    <p className="text-xxs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Updated {lastUpdated}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-0.5 rounded-full bg-brand/10 px-2 py-0.5 text-xxs font-semibold text-brand">
                    <Sparkles className="h-2.5 w-2.5" />
                    {mockScore}% Score
                  </span>
                </CardHeader>
                <CardContent className="py-2 flex items-center justify-center min-h-[120px] bg-muted/15 border-y border-border/50">
                  <FileText className="h-10 w-10 text-muted-foreground/35" />
                </CardContent>
                <CardFooter className="py-3 px-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <Link href={`/resumes/${resume.id}`}>
                      <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <Link href={`/resumes/${resume.id}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs font-semibold rounded-full">
                      Edit document
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
