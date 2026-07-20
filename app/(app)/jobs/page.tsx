"use client";

import { useEffect, useState } from "react";
import { getJobColumns, getJobsList, createJob, moveJob, deleteJob } from "@/src/features/jobs/actions";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash, ArrowRight, Briefcase, PlusCircle, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function JobsPage() {
  const [columns, setColumns] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Job Modal State
  const [createOpen, setCreateOpen] = useState(false);
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [targetColId, setTargetColId] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const cols = await getJobColumns();
      const list = await getJobsList();
      setColumns(cols);
      setJobs(list);
      if (cols.length > 0) {
        setTargetColId(cols[0].id);
      }
    } catch (err) {
      toast.error("Failed to load tracking data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async () => {
    if (!company.trim() || !role.trim()) {
      toast.error("Company and role names are required.");
      return;
    }

    try {
      await createJob(company, role, targetColId);
      toast.success("Job application tracked.");
      setCompany("");
      setRole("");
      setCreateOpen(false);
      loadData();
    } catch (err) {
      toast.error("Failed to track application.");
    }
  };

  const handleMove = async (jobId: string, fromColId: string, toColId: string) => {
    try {
      await moveJob(jobId, fromColId, toColId);
      toast.success("Job card moved.");
      loadData();
    } catch (err) {
      toast.error("Failed to update status.");
    }
  };

  const handleDelete = async (jobId: string) => {
    try {
      await deleteJob(jobId);
      toast.success("Job card removed.");
      loadData();
    } catch (err) {
      toast.error("Failed to delete card.");
    }
  };

  const headerActions = (
    <Button
      size="sm"
      className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold gap-1.5 shadow-sm"
      onClick={() => setCreateOpen(true)}
    >
      <Plus className="h-4 w-4" />
      Track Application
    </Button>
  );

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Job Application Pipeline"
        description="Track your active submissions and moves in a modern Kanban pipeline layout."
        actions={headerActions}
      />

      {/* Kanban Board columns wrapper */}
      <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin max-w-full">
        {columns.map((col) => {
          const colJobs = jobs.filter((j) => j.columnId === col.id);

          return (
            <div key={col.id} className="w-72 shrink-0 bg-muted/20 border border-border p-4 rounded-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: col.color }} />
                  <h4 className="text-xs font-bold text-foreground">{col.label}</h4>
                </div>
                <span className="text-[10px] font-bold text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  {colJobs.length}
                </span>
              </div>

              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
                {colJobs.length === 0 ? (
                  <div className="text-[10px] text-muted-foreground text-center py-8 border border-dashed rounded-lg border-border/80">
                    No items tracked
                  </div>
                ) : (
                  colJobs.map((job) => {
                    const nextColIdx = columns.findIndex((c) => c.id === col.id) + 1;
                    const nextCol = columns[nextColIdx];

                    return (
                      <Card key={job.id} className="border border-border bg-card shadow-sm hover:border-brand/35 transition-colors p-3.5 space-y-3 relative group">
                        <div className="space-y-1">
                          <h5 className="text-xs font-bold text-foreground truncate">{job.role}</h5>
                          <p className="text-[10px] text-muted-foreground truncate">{job.company}</p>
                        </div>
                        <div className="flex justify-between items-center pt-2 gap-2 border-t border-border/40">
                          <Button
                            size="icon-xs"
                            variant="ghost"
                            onClick={() => handleDelete(job.id)}
                            className="text-muted-foreground hover:text-destructive shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash className="h-3 w-3" />
                          </Button>
                          {nextCol && (
                            <Button
                              size="xs"
                              variant="outline"
                              onClick={() => handleMove(job.id, col.id, nextCol.id)}
                              className="rounded-full text-xxs font-semibold gap-1 ml-auto shrink-0"
                            >
                              <span>Move to {nextCol.label}</span>
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </Card>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Track Job Modal Dialog */}
      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="max-w-md bg-popover rounded-xl border border-border">
          <DialogHeader>
            <DialogTitle className="text-base font-bold">Track Application</DialogTitle>
            <DialogDescription className="text-xxs">Configure details of target job listing.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1">
              <Label className="text-xxs font-semibold">Company Name</Label>
              <Input placeholder="e.g. Vercel" value={company} onChange={(e) => setCompany(e.target.value)} className="text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-xxs font-semibold">Role Name</Label>
              <Input placeholder="e.g. Developer Relations" value={role} onChange={(e) => setRole(e.target.value)} className="text-xs" />
            </div>
            <div className="space-y-1">
              <Label className="text-xxs font-semibold">Initial Stage Column</Label>
              <select
                value={targetColId}
                onChange={(e) => setTargetColId(e.target.value)}
                className="w-full h-9 rounded-lg border border-border bg-background px-3 py-1 text-xs outline-none"
              >
                {columns.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" size="sm" onClick={() => setCreateOpen(false)} className="rounded-full text-xs">
              Cancel
            </Button>
            <Button onClick={handleCreate} className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold text-xs px-6 shadow-sm">
              Confirm
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LoaderSpinner() {
  return (
    <div className="flex flex-col items-center gap-3">
      <PlusCircle className="h-8 w-8 animate-spin text-brand" />
      <p className="text-xs text-muted-foreground">Loading tracking dashboard...</p>
    </div>
  );
}
