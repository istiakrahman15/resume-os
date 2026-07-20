"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Globe, ExternalLink, Settings, Eye, Trash2, ShieldAlert } from "lucide-react";
import { getPortfoliosList, createPortfolio } from "@/src/features/portfolios/actions";
import { PageHeader } from "@/components/shared/page-header";
import { EmptyState } from "@/components/shared/empty-state";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function PortfoliosPage() {
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Creation modal state
  const [createOpen, setCreateOpen] = useState(false);
  const [slug, setSlug] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const list = await getPortfoliosList();
      setPortfolios(list);
    } catch (err) {
      toast.error("Failed to load portfolios list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    if (!slug.trim()) {
      toast.error("Please enter a slug path.");
      return;
    }

    setLoading(true);
    try {
      await createPortfolio(slug.toLowerCase().trim());
      toast.success("Portfolio created successfully.");
      setSlug("");
      setCreateOpen(false);
      loadData();
    } catch (err: any) {
      toast.error(err.message || "Failed to create portfolio. Slug might be taken.");
    } finally {
      setLoading(false);
    }
  };

  const headerActions = (
    <Button
      size="sm"
      className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold gap-1.5 shadow-sm"
      onClick={() => setCreateOpen(true)}
    >
      <Plus className="h-4 w-4" />
      New Portfolio
    </Button>
  );

  if (loading && portfolios.length === 0) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Globe className="h-8 w-8 animate-spin text-brand" />
          <p className="text-xs text-muted-foreground">Loading portfolio list...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Portfolios"
        description="Publish your resume data as a professional responsive webpage."
        actions={portfolios.length > 0 ? headerActions : undefined}
      />

      {portfolios.length === 0 ? (
        <EmptyState
          icon={Globe}
          title="No hosted portfolios yet"
          description="Create a portfolio page using beautiful templates and host it on your custom path."
          action={
            <Button
              size="sm"
              className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold gap-1.5 shadow-sm"
              onClick={() => setCreateOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Build Portfolio
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolios.map((ptf) => {
            const publicUrl = `${window.location.origin}/${ptf.slug}`;

            return (
              <Card key={ptf.id} className="border border-border bg-card shadow-sm hover:border-brand/40 hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                <CardHeader className="pb-3 flex flex-row items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-bold text-foreground truncate max-w-[180px]">
                      /{ptf.slug}
                    </CardTitle>
                    <p className="text-xxs text-muted-foreground capitalize flex items-center gap-1.5">
                      Theme: {ptf.theme} •{" "}
                      <span className={ptf.status === "published" ? "text-emerald-500 font-bold" : "text-amber-500 font-bold"}>
                        {ptf.status}
                      </span>
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="py-2 flex items-center justify-center min-h-[120px] bg-muted/15 border-y border-border/50">
                  <Globe className="h-10 w-10 text-muted-foreground/35" />
                </CardContent>
                <CardFooter className="py-3 px-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    {ptf.status === "published" && (
                      <a href={publicUrl} target="_blank" rel="noreferrer">
                        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </a>
                    )}
                  </div>
                  <Link href={`/portfolios/${ptf.id}/edit`}>
                    <Button variant="outline" size="sm" className="h-7 text-xs font-semibold rounded-full">
                      Edit blocks
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* Creation Modal */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-sm bg-popover rounded-xl border border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">New Portfolio</DialogTitle>
            <DialogDescription className="text-xxs">Configure the URL slug for your hosted webpage.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label className="text-xxs font-semibold">URL Path Slug</Label>
              <div className="flex items-center border border-border rounded-lg bg-background px-3 h-9">
                <span className="text-xs text-muted-foreground">resumeos.app/</span>
                <input
                  type="text"
                  placeholder="john-doe"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="flex-1 bg-transparent text-xs text-foreground outline-none border-none py-1 ml-0.5"
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="rounded-full text-xs">
              Cancel
            </Button>
            <Button onClick={handleCreate} className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs px-6 shadow-sm">
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
