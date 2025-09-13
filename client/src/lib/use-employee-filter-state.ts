"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";

export interface Filter {
  dateRange: DateRange | undefined;
  tenure: number | undefined;
  location: string | undefined;
  employmentType: "fulltime" | "parttime" | "contractor" | "intern" | undefined;
  workArrangement: "hybrid" | "onsite" | "remote" | undefined;
}

const initialFilterState: Filter = {
  dateRange: undefined,
  tenure: undefined,
  location: undefined,
  employmentType: undefined,
  workArrangement: undefined,
};

export function useFilterState(initialState: Filter = initialFilterState) {
  const [filters, setFilters] = React.useState<Filter>(initialState);

  const updateFilter = React.useCallback(
    <K extends keyof Filter>(key: K, value: Filter[K]) => {
      setFilters(prev => ({ ...prev, [key]: value }));
    },
    []
  );

  const clearFilters = React.useCallback(() => {
    setFilters(initialState);
  }, [initialState]);

  const resetFilters = React.useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  return {
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    resetFilters,
  };
}
