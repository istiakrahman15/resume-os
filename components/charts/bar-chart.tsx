"use client";

import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DataPoint {
  label: string;
  value: number;
}

interface BarChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  dataKey?: string;
  color?: string;
}

export function BarChart({
  title,
  description,
  data,
  dataKey = "value",
  color = "var(--chart-2)",
}: BarChartProps) {
  return (
    <Card className="w-full border border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-[240px] pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" vertical={false} />
            <XAxis
              dataKey="label"
              className="text-xxs font-medium fill-muted-foreground"
              axisLine={false}
              tickLine={false}
              dy={10}
            />
            <YAxis
              className="text-xxs font-medium fill-muted-foreground"
              axisLine={false}
              tickLine={false}
              dx={-5}
            />
            <Tooltip
              cursor={{ fill: "var(--muted)", opacity: 0.3 }}
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius-md)",
                fontSize: "12px",
                color: "var(--popover-foreground)",
              }}
              labelStyle={{ fontWeight: 600, marginBottom: "4px" }}
            />
            <Bar
              dataKey={dataKey}
              fill={color}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
