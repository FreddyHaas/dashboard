"use client";

import type { AppRouter } from '@server/routes/router';
import { type inferRouterOutputs } from '@trpc/server';
import { useCallback, useEffect, useState } from 'react';
import { type DateRange } from "react-day-picker";
import { useDebounce } from 'use-debounce';
import { trpc } from '../components/trpc-provider';

type RouterOutputs = inferRouterOutputs<AppRouter>;
type filterDto = RouterOutputs['getFilterOrDefault'];

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

type EmploymentType = NonNullable<Filters['employmentType']>;

export const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  fulltime: "Full-time",
  parttime: "Part-time", 
  contractor: "Contractor",
  intern: "Intern"
};

export const EMPLOYMENT_TYPE_OPTIONS = Object.entries(EMPLOYMENT_TYPE_LABELS).map(([key, value]) => ({
  value: key as EmploymentType,
  label: value
}));

function mapDateRange(filterDto: filterDto): DateRange | undefined {
  if (!filterDto?.dateRangeFrom) {
    return undefined;
  }
  
  return {
    from: new Date(filterDto.dateRangeFrom),
    to: filterDto.dateRangeTo ? new Date(filterDto.dateRangeTo) : undefined,
  };
}

function mapToClientFilterModel(filterDto: filterDto): Filters {
  return {
    dateRange: mapDateRange(filterDto),
    tenure: filterDto?.tenure || undefined,
    location: filterDto?.location || undefined,
    employmentType: filterDto?.employmentType || undefined,
    workArrangement: filterDto?.workArrangement || undefined,
  };
}

function mapToServerFilterDto(filters: Filters, scope: string) {
  return {
    scope,
    dateRangeFrom: filters.dateRange?.from || null,
    dateRangeTo: filters.dateRange?.to || null,
    tenure: filters.tenure || null,
    location: filters.location || null,
    employmentType: filters.employmentType || null,
    workArrangement: filters.workArrangement || null,
  };
}

export function usePersistedFilterState(scope: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: filterDto, isLoading: isInitialLoading, error: queryError } = trpc.getFilterOrDefault.useQuery(
    { scope }
  );

  const [filters, setFilters] = useState<Filters>(() => {
    if (filterDto) {
      return mapToClientFilterModel(filterDto);
    }
    return initialFilterState;
  });

  // Handle successful data loading
  useEffect(() => {
    if (filterDto) {
      const filter = mapToClientFilterModel(filterDto);
      setFilters(filter);
    }
  }, [filterDto]);

  // Handle query errors
  useEffect(() => {
    if (queryError) {
      console.error("Failed to load filters:", queryError);
      setError(`Failed to load filters: ${queryError.message}`);
    }
  }, [queryError]);

  // Save filter mutation
  const saveFilterMutation = trpc.saveFilter.useMutation({
    onError: (err) => {
      console.error("Failed to save filters:", err);
      setError(`Failed to save filters: ${err.message}`);
    },
  });

  // Debounce the filters state
  const [debouncedFilters] = useDebounce(filters, 500);

  // Save filters when debounced value changes
  useEffect(() => {
    if (debouncedFilters) {
      setIsLoading(true);
      setError(null);
      const serverData = mapToServerFilterDto(debouncedFilters, scope);
      saveFilterMutation.mutate(serverData, {
        onSettled: () => {
          setIsLoading(false);
        },
      });
    }
  }, [debouncedFilters, scope]);

  const updateFilter = useCallback(
    <K extends keyof Filters>(key: K, value: Filters[K]) => {
      const newFilters = { ...filters, [key]: value };
      setFilters(newFilters);
    },
    [filters]
  );

  const clearFilters = useCallback(() => {
    const clearedFilters = {
      dateRange: undefined,
      tenure: undefined,
      location: undefined,
      employmentType: undefined,
      workArrangement: undefined,
    };
    setFilters(clearedFilters);
  }, []);

  return {
    filters,
    setFilters,
    updateFilter,
    clearFilters,
    isLoading: isLoading || isInitialLoading,
    error,
  };
}
