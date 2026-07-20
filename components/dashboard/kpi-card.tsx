import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkline } from "@/components/charts/sparkline";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    data: number[];
    percentage: number;
    label: string;
  };
}

export function KpiCard({ title, value, icon: Icon, description, trend }: KpiCardProps) {
  return (
    <Card className="border border-border bg-card shadow-sm rounded-xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <span className="text-xxs font-bold text-muted-foreground uppercase tracking-wider">{title}</span>
            <div className="text-2xl font-bold tracking-tight text-foreground truncate">{value}</div>
          </div>
          <div className="h-10 w-10 rounded-xl bg-brand/5 border border-brand/10 text-brand flex items-center justify-center shrink-0">
            <Icon className="h-5 w-5 stroke-[1.5]" />
          </div>
        </div>

        {trend && (
          <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-border/50">
            <div className="flex flex-col gap-0.5">
              <span className={`text-xs font-semibold ${trend.percentage >= 0 ? "text-emerald-500" : "text-destructive"}`}>
                {trend.percentage >= 0 ? "+" : ""}{trend.percentage}%
              </span>
              <span className="text-xxs text-muted-foreground">{trend.label}</span>
            </div>
            <Sparkline data={trend.data} color={trend.percentage >= 0 ? "var(--chart-3)" : "var(--destructive)"} />
          </div>
        )}

        {!trend && description && (
          <p className="text-xxs text-muted-foreground mt-4 pt-3 border-t border-border/50 leading-normal">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
