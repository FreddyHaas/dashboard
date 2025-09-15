"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import * as React from "react";
import { type DateRange } from "react-day-picker";

interface DateRangeFilterProps {
  dateRange?: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
  className?: string;
}

export function DateRangeFilter({ 
  dateRange, 
  onDateRangeChange, 
  className = "min-w-[220px]" 
}: DateRangeFilterProps) {
  const dateLabel = React.useMemo(() => {
    if (dateRange?.from && dateRange.to) {
      return `${format(dateRange.from, "dd.MM.yyyy")} - ${format(dateRange.to, "dd.MM.yyyy")}`;
    }
    if (dateRange?.from) {
      return `${format(dateRange.from, "dd.MM.yyyy")} - …`;
    }
    return "Select dates";
  }, [dateRange]);

  return (
    <div className={`flex ${className} flex-col gap-1`}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start text-left font-normal h-9 w-[220px] cursor-pointer">
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateLabel}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-2">
            <Calendar
              mode="range"
              numberOfMonths={2}
              selected={dateRange}
              onSelect={onDateRangeChange}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
