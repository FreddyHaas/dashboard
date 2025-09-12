"use client";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartFilterBar } from './chart-filter-bar';

export function ChartCard({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <Card>
    <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardAction><ChartFilterBar/></CardAction>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent className="py-4">
        {children ?? (
          <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
            Chart goes here
          </div>
        )}
      </CardContent>
    </Card>
  );
}


