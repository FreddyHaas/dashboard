"use client";

import * as React from "react";
import { useFilterState, type Filter } from "../lib/use-employee-filter-state";

interface GlobalFilterContextType {
  filters: Filter;
  setFilters: React.Dispatch<React.SetStateAction<Filter>>;
  updateFilter: <K extends keyof Filter>(
    key: K,
    value: Filter[K]
  ) => void;
  clearFilters: () => void;
}

const GlobalFilterContext = React.createContext<GlobalFilterContextType | undefined>(undefined);

export function GlobalFilterProvider({ children }: { children: React.ReactNode }) {
  const { filters, setFilters, updateFilter, clearFilters } = useFilterState();

  const value = React.useMemo(
    () => ({
      filters,
      setFilters,
      updateFilter,
      clearFilters,
    }),
    [filters, setFilters, updateFilter, clearFilters]
  );

  return (
    <GlobalFilterContext.Provider value={value}>
      {children}
    </GlobalFilterContext.Provider>
  );
}

export function useGlobalFilter() {
  const context = React.useContext(GlobalFilterContext);
  if (context === undefined) {
    throw new Error("useGlobalFilter must be used within a GlobalFilterProvider");
  }
  return context;
}
