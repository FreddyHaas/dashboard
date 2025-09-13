"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";

export interface Filters {
  dateRange: DateRange | undefined;
  tenure: number | undefined;
  location: string | undefined;
  employmentType: "fulltime" | "parttime" | "contractor" | "intern" | undefined;
  workArrangement: "hybrid" | "onsite" | "remote" | undefined;
}

const initialFilterState: Filters = {
  dateRange: undefined,
  tenure: undefined,
  location: undefined,
  employmentType: undefined,
  workArrangement: undefined,
};

export function useFilterState(initialState: Filters = initialFilterState) {
  const [filters, setFilters] = React.useState<Filters>(initialState);

  const updateFilter = React.useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
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
