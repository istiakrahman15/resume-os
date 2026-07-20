"use client";

import { PageHeader } from "@/components/shared/page-header";
import { BarChart } from "@/components/charts/bar-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Sparkles, UserCheck } from "lucide-react";

export default function AnalyticsPage() {
  const applicationFunnelData = [
    { label: "Jan", value: 4 },
    { label: "Feb", value: 6 },
    { label: "Mar", value: 10 },
    { label: "Apr", value: 8 },
    { label: "May", value: 12 },
    { label: "Jun", value: 17 },
  ];

  const templateDistributionData = [
    { name: "Minimal", value: 12 },
    { name: "Modern", value: 8 },
    { name: "Classic", value: 5 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics & Insights"
        description="Verify document response performance rates and AI quota consumption trends."
      />

      {/* Analytics KPI Dashboard widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border border-border bg-card shadow-sm rounded-xl">
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xxs font-bold text-muted-foreground uppercase">Response Rate</span>
              <h4 className="text-xl font-extrabold text-foreground">34.2%</h4>
            </div>
            <div className="h-9 w-9 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <TrendingUp className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm rounded-xl">
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xxs font-bold text-muted-foreground uppercase">AI Token Cost</span>
              <h4 className="text-xl font-extrabold text-foreground">$1.34</h4>
            </div>
            <div className="h-9 w-9 rounded-full bg-brand/10 text-brand flex items-center justify-center shrink-0">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card shadow-sm rounded-xl">
          <CardContent className="p-6 flex items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xxs font-bold text-muted-foreground uppercase">Interviews Booked</span>
              <h4 className="text-xl font-extrabold text-foreground">6</h4>
            </div>
            <div className="h-9 w-9 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
              <UserCheck className="h-4.5 w-4.5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart layouts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          title="Applications Funnel Over Time"
          description="Total number of submitted resumes tracked monthly."
          data={applicationFunnelData}
        />
        <DonutChart
          title="Active Resume Templates"
          description="Distribution of chosen document design layout templates."
          data={templateDistributionData}
        />
      </div>
    </div>
  );
}
