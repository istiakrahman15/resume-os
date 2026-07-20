import Link from "next/link";
import { Plus, Mail, Calendar, Eye, Trash2, ArrowUpRight } from "lucide-react";
import { getCoverLettersList } from "@/src/features/cover-letters/actions";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const revalidate = 0; // dynamic page

export default async function CoverLettersPage() {
  let letters: Awaited<ReturnType<typeof getCoverLettersList>> = [];
  try {
    letters = await getCoverLettersList();
  } catch {
    // Database not configured or user not authenticated — show empty state
  }

  const headerActions = (
    <Link href="/cover-letters/new">
      <Button size="sm" className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold gap-1.5 shadow-sm">
        <Plus className="h-4 w-4" />
        New Letter
      </Button>
    </Link>
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Cover Letters"
        description="Draft and manage tailored professional cover letters for specific job applications."
        actions={letters.length > 0 ? headerActions : undefined}
      />

      {letters.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No cover letters created yet"
          description="Draft your first cover letter utilizing our guided AI generator."
          action={
            <Link href="/cover-letters/new">
              <Button size="sm" className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold gap-1.5 shadow-sm">
                <Plus className="h-4 w-4" />
                Draft Cover Letter
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {letters.map((letter) => {
            const lastUpdated = new Date(letter.updatedAt).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <Card key={letter.id} className="border border-border bg-card shadow-sm hover:border-brand/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-bold text-foreground truncate max-w-[180px]">
                      {letter.title}
                    </CardTitle>
                    <p className="text-xxs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Updated {lastUpdated}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="py-2 flex items-center justify-center min-h-[120px] bg-muted/15 border-y border-border/50">
                  <Mail className="h-10 w-10 text-muted-foreground/35" />
                </CardContent>
                <CardFooter className="py-3 px-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <Link href={`/cover-letters/${letter.id}`}>
                      <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                  <Link href={`/cover-letters/${letter.id}`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs font-semibold rounded-full">
                      Edit details
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
