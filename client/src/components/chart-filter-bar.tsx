"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import * as React from "react";

export function ChartFilterBar() {
  const [timeframe, setTimeframe] = React.useState<string | undefined>(undefined);
  const [segment, setSegment] = React.useState<string | undefined>(undefined);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="h-8 cursor-pointer">Filter</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-72 p-2" align="end">
          <div className="flex flex-col gap-3">
            <div className="flex min-w-[200px] flex-col gap-1">
              <Label className="text-xs text-muted-foreground">Timeframe</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex min-w-[200px] flex-col gap-1">
              <Label className="text-xs text-muted-foreground">Segment</Label>
              <Select value={segment} onValueChange={setSegment}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Select segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="returning">Returning</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}


