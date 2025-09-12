"use client";

import { format } from "date-fns";
import { X } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useGlobalFilter } from "./global-filter-context";

export function GlobalFilterBar() {
  const { filters, updateFilter, clearFilters } = useGlobalFilter();
  const { dateRange, tenure, location, employmentType, workArrangement } = filters;

  const dateLabel = React.useMemo(() => {
    if (dateRange?.from && dateRange.to) {
      return `${format(dateRange.from, "LLL d, y")} - ${format(dateRange.to, "LLL d, y")}`;
    }
    if (dateRange?.from) {
      return `${format(dateRange.from, "LLL d, y")} - …`;
    }
    return "Select dates";
  }, [dateRange]);

  return (
    <div className="w-full border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/30">
      <div className="mx-auto max-w-7xl py-3">
        <div className="flex flex-wrap items-center">
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-wrap items-end gap-1 flex-1">
            <div className="flex min-w-[220px] flex-col gap-1">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="justify-start text-left font-normal h-9 w-[220px]">
                    {dateLabel}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-2">
                    <Calendar
                      mode="range"
                      numberOfMonths={2}
                      selected={dateRange}
                      onSelect={(range) => updateFilter('dateRange', range)}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex-1" />
            {(dateRange || location || tenure || employmentType || workArrangement) && (
              <Button 
                variant="ghost" 
                size="icon"
                className="h-9 w-9 cursor-pointer"
                onClick={clearFilters}
                title="Clear Filters"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-9 cursor-pointer">Filter</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-72 p-2" align="end">
                <div className="flex flex-col gap-3">
                  <div className="flex min-w-[200px] flex-col gap-1">
                    <Label className="text-xs text-muted-foreground">Location</Label>
                    <Select value={location} onValueChange={(value) => updateFilter('location', value)}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="berlin">Berlin</SelectItem>
                        <SelectItem value="munich">Munich</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}


