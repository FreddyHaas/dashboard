'use client';

import * as React from 'react';
import {
  usePersistedFilterState,
  type Filters,
} from '../hooks/use-employee-filters-state';

interface GlobalFilterContextType {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  clearFilters: () => void;
  isLoading: boolean;
  error: string | null;
}

const GlobalFilterContext = React.createContext<
  GlobalFilterContextType | undefined
>(undefined);

export function GlobalFilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const filterState = usePersistedFilterState('global');

  return (
    <GlobalFilterContext.Provider value={filterState}>
      {children}
    </GlobalFilterContext.Provider>
  );
}

export function useGlobalFilter() {
  const context = React.useContext(GlobalFilterContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalFilter must be used within a GlobalFilterProvider',
    );
  }
  return context;
}
