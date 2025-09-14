"use client";

import { Separator } from "@/components/ui/separator";
import { DateRangeFilter, EmployeeFilter } from "./filters";
import { useGlobalFilter } from './global-filter-context';

export function GlobalFilterBar() {
  const { filters, updateFilter, clearFilters } = useGlobalFilter();
  const { dateRange } = filters;

  return (
    <div className="w-full border-b bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/30">
      <div className="mx-auto max-w-7xl pb-3">
        <div className="flex flex-wrap items-center">
          <Separator orientation="vertical" className="h-6" />
          <div className="flex flex-wrap items-end gap-1 flex-1">
            <DateRangeFilter
              dateRange={dateRange}
              onDateRangeChange={(range) => updateFilter('dateRange', range as any)}
            />
            <div className="flex-1" />
            <EmployeeFilter filters={filters} updateFilter={updateFilter} clearFilters={clearFilters} />
          </div>
        </div>
      </div>
    </div>
  );
}


