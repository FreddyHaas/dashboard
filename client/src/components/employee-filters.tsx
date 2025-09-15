"use client";

import { useMemo } from 'react';
import { EMPLOYMENT_TYPE_OPTIONS, type Filters } from "../hooks/use-employee-filters-state";
import { ClearFiltersButton, FilterDropdown, NumberFilter, OptionFilter, TextFilter } from "./filters";

interface FilterProps {
  filters: Filters;
  updateFilter: <K extends keyof Filters>(key: K, value: Filters[K]) => void;
  clearFilters: () => void;
}

export function EmployeeFilter({ filters, updateFilter, clearFilters }: FilterProps) {
  const { tenure, location, employmentType, workArrangement } = filters;
  const activeFilterCount = useMemo(() => {
    const { dateRange, ...otherFilters } = filters;
    return Object.values(otherFilters).filter(value => value !== undefined).length;
  }, [filters]);
  const hasFilters = activeFilterCount > 0;

  return (
    <div className="flex flex-wrap items-end gap-1">
      <ClearFiltersButton
        onClear={clearFilters}
        hasFilters={hasFilters}
      />
      <FilterDropdown filterCount={activeFilterCount}>
      <div className="flex flex-col gap-4">
      <OptionFilter<typeof filters.employmentType>
        label="Employment Type"
        value={employmentType}
        onValueChange={(value) => updateFilter('employmentType', value)}
        options={EMPLOYMENT_TYPE_OPTIONS}
      />
      <OptionFilter<typeof filters.workArrangement>
        label="Work Arrangement"
        value={workArrangement}
        onValueChange={(value) => updateFilter('workArrangement', value)}
        options={[
          { value: "hybrid", label: "Hybrid" },
          { value: "onsite", label: "Onsite" },
          { value: "remote", label: "Remote" }
        ]}
      />
      <TextFilter
        label="Location"
        value={location}
        onValueChange={(value) => updateFilter('location', value)}
        placeholder="Enter location"
      />
      <NumberFilter
        label="Minimum tenure (years)"
        value={tenure}
        onValueChange={(value) => updateFilter('tenure', value)}
        min={0}
        max={50}
        defaultValue={0}
      />
    </div>
      </FilterDropdown>
    </div>
    
  );
}
