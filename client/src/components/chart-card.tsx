"use client";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartCardProps {
  title: string,
  description: string, 
  action: React.ReactNode,
  chart: React.ReactNode,
}

export function ChartCard({ title, description, action, chart }: ChartCardProps) {

  return (
    <Card className="min-w-[250px]">
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardAction>
          {action}
        </CardAction>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="py-4">
        <div className="h-40 w-full">
          {chart}
        </div>
      </CardContent>
    </Card>
  );
}