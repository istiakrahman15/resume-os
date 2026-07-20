"use client";

import Link from "next/link";
import { FileText, Target, Mail, Briefcase, Plus, Calendar, Settings, Sparkles, ChevronRight, Activity, ArrowUpRight } from "lucide-react";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { AreaChart } from "@/components/charts/area-chart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  // Mock dashboard metric data
  const metrics = [
    {
      title: "Active Resumes",
      value: 2,
      icon: FileText,
      description: "2 custom resume templates configured",
    },
    {
      title: "Applications Submitted",
      value: 17,
      icon: Briefcase,
      trend: {
        data: [5, 8, 12, 10, 15, 17],
        percentage: 36,
        label: "vs last month",
      },
    },
    {
      title: "Average ATS Score",
      value: "84%",
      icon: Target,
      trend: {
        data: [72, 75, 78, 80, 82, 84],
        percentage: 5,
        label: "vs last week",
      },
    },
    {
      title: "AI Credits Remaining",
      value: "164 / 200",
      icon: Sparkles,
      description: "Resets on next billing period",
    },
  ];

  const recentActivity = [
    { id: 1, action: "Modified resume", target: "Software Engineer CV", time: "2 hours ago", type: "resume" },
    { id: 2, action: "Completed ATS Scan", target: "Frontend Developer Job at Vercel", time: "5 hours ago", type: "ats" },
    { id: 3, action: "Moved job application", target: "Product Designer to 'Interview' stage", time: "1 day ago", type: "job" },
    { id: 4, action: "Generated Cover Letter", target: "Tailored to Apple", time: "2 days ago", type: "letter" },
  ];

  const pipelineStages = [
    { stage: "Saved", count: 4, color: "bg-muted text-muted-foreground" },
    { stage: "Applied", count: 6, color: "bg-blue-500/10 text-blue-500" },
    { stage: "Phone Screen", count: 2, color: "bg-amber-500/10 text-amber-500" },
    { stage: "Onsite Interview", count: 3, color: "bg-indigo-500/10 text-indigo-500" },
    { stage: "Offer Received", count: 1, color: "bg-emerald-500/10 text-emerald-500" },
    { stage: "Rejected", count: 1, color: "bg-destructive/10 text-destructive" },
  ];

  const atsTrendData = [
    { date: "Jul 15", value: 72 },
    { date: "Jul 16", value: 75 },
    { date: "Jul 17", value: 78 },
    { date: "Jul 18", value: 80 },
    { date: "Jul 19", value: 82 },
    { date: "Jul 20", value: 84 },
  ];

  return (
    <div className="space-y-6">
      {/* Dashboard Greeting Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">Welcome back, Aisha</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Here is a snapshot of your career documents and application tracking.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link href="/resumes/new">
            <Button size="sm" className="rounded-full bg-brand text-brand-foreground hover:bg-brand/90 font-semibold gap-1.5 shadow-sm">
              <Plus className="h-4 w-4" />
              New Resume
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <KpiCard key={idx} {...metric} />
        ))}
      </div>

      {/* Main Charts and List sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ATS Trend Area Chart */}
        <div className="lg:col-span-2 flex flex-col">
          <AreaChart
            title="ATS Score Trend"
            description="Historical progress of your resume optimization scores over the past 7 days."
            data={atsTrendData}
          />
        </div>

        {/* Pipeline snapshot card */}
        <Card className="border border-border bg-card shadow-sm rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Job Pipeline Snapshot</CardTitle>
            <CardDescription className="text-xs">Quick status of current applications in stages.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {pipelineStages.map((stage) => (
              <div key={stage.stage} className="flex items-center justify-between p-2.5 border border-border rounded-lg bg-background/50 hover:bg-muted/40 transition-colors">
                <span className="text-xs font-semibold text-foreground">{stage.stage}</span>
                <span className={`text-xxs font-bold px-2 py-0.5 rounded-full ${stage.color}`}>
                  {stage.count} {stage.count === 1 ? "job" : "jobs"}
                </span>
              </div>
            ))}
            <div className="pt-2 text-center">
              <Link href="/jobs" className="inline-flex items-center gap-1 text-xs text-brand font-semibold hover:underline">
                Open tracker boards
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity feed column */}
        <Card className="lg:col-span-2 border border-border bg-card shadow-sm rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Activity className="h-4.5 w-4.5 text-brand" />
              Recent Activities
            </CardTitle>
            <CardDescription className="text-xs">Audit actions tracked across your profile.</CardDescription>
          </CardHeader>
          <CardContent className="divide-y divide-border">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0 gap-4">
                <div className="space-y-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground truncate">{activity.action}</p>
                  <p className="text-xxs text-muted-foreground truncate">{activity.target}</p>
                </div>
                <span className="text-xxs text-muted-foreground shrink-0">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick action buttons list */}
        <Card className="border border-border bg-card shadow-sm rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
            <CardDescription className="text-xs">Shortcuts to accelerate your documentation process.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/resumes/new" className="block">
              <Button variant="outline" className="w-full justify-start text-xs font-medium h-9 border-border bg-background/50 hover:bg-muted gap-2.5">
                <FileText className="h-4 w-4 text-brand" />
                <span>Build New Resume</span>
              </Button>
            </Link>
            <Link href="/ats" className="block">
              <Button variant="outline" className="w-full justify-start text-xs font-medium h-9 border-border bg-background/50 hover:bg-muted gap-2.5">
                <Target className="h-4 w-4 text-brand" />
                <span>Perform ATS Scan</span>
              </Button>
            </Link>
            <Link href="/cover-letters" className="block">
              <Button variant="outline" className="w-full justify-start text-xs font-medium h-9 border-border bg-background/50 hover:bg-muted gap-2.5">
                <Mail className="h-4 w-4 text-brand" />
                <span>Generate Cover Letter</span>
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
