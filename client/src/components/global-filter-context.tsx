"use client";

import * as React from "react";
import { type DateRange } from "react-day-picker";

export interface GlobalFilterState {
  dateRange: DateRange | undefined;
  tenure: number | undefined;
  location: string | undefined;
  employmentType: "Full-time" | "Part-time" | "Contractor" | "Intern" | undefined;
  workArrangement: "Hybrid" | "Onsite" | "Remote" | undefined;
}

interface GlobalFilterContextType {
  filters: GlobalFilterState;
  setFilters: React.Dispatch<React.SetStateAction<GlobalFilterState>>;
  updateFilter: <K extends keyof GlobalFilterState>(
    key: K,
    value: GlobalFilterState[K]
  ) => void;
  clearFilters: () => void;
}

const GlobalFilterContext = React.createContext<GlobalFilterContextType | undefined>(undefined);

const initialFilterState: GlobalFilterState = {
  dateRange: undefined,
  tenure: undefined,
  location: undefined,
  employmentType: undefined,
  workArrangement: undefined,
};

export function GlobalFilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = React.useState<GlobalFilterState>(initialFilterState);

  const updateFilter = React.useCallback(
    <K extends keyof GlobalFilterState>(key: K, value: GlobalFilterState[K]) => {
      setFilters(prev => ({ ...prev, [key]: value }));
    },
    []
  );

  const clearFilters = React.useCallback(() => {
    setFilters(initialFilterState);
  }, []);

  const value = React.useMemo(
    () => ({
      filters,
      setFilters,
      updateFilter,
      clearFilters,
    }),
    [filters, updateFilter, clearFilters]
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
