"use client";

import { ResponsiveContainer, AreaChart as RechartsAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface DataPoint {
  date: string;
  value: number;
}

interface AreaChartProps {
  title: string;
  description?: string;
  data: DataPoint[];
  dataKey?: string;
  strokeColor?: string;
  fillColor?: string;
}

export function AreaChart({
  title,
  description,
  data,
  dataKey = "value",
  strokeColor = "var(--chart-1)",
  fillColor = "var(--chart-1)",
}: AreaChartProps) {
  return (
    <Card className="w-full border border-border bg-card">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="h-[240px] pl-0">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsAreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={fillColor} stopOpacity={0.2} />
                <stop offset="95%" stopColor={fillColor} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" vertical={false} />
            <XAxis
              dataKey="date"
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
              contentStyle={{
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius-md)",
                fontSize: "12px",
                color: "var(--popover-foreground)",
              }}
              labelStyle={{ fontWeight: 600, marginBottom: "4px" }}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={strokeColor}
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </RechartsAreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
