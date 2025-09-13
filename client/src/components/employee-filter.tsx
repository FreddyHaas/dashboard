"use client";

import { useMemo } from 'react';
import { type Filter } from "../lib/use-employee-filter-state";
import { ClearFiltersButton, FilterDropdown, NumberFilter, OptionFilter, TextFilter } from "./filters";

interface ChartFilterBarProps {
  filters: Filter;
  updateFilter: <K extends keyof Filter>(key: K, value: Filter[K]) => void;
  clearFilters: () => void;
}

export function EmployeeFilter({ filters, updateFilter, clearFilters }: ChartFilterBarProps) {
  const { tenure, location, employmentType, workArrangement } = filters;
  const hasFilters = useMemo(() => 
    Object.values(filters).some(value => value !== undefined), 
    [filters]
  );

  return (
    <div className="flex flex-wrap items-end gap-1">
      <ClearFiltersButton
        onClear={clearFilters}
        hasFilters={hasFilters}
      />
      <FilterDropdown>
      <div className="flex flex-col gap-4">
      <OptionFilter<typeof filters.employmentType>
        label="Employment Type"
        value={employmentType}
        onValueChange={(value) => updateFilter('employmentType', value)}
        options={[
          { value: "fulltime", label: "Full-time" },
          { value: "parttime", label: "Part-time" },
          { value: "contractor", label: "Contractor" },
          { value: "intern", label: "Intern" }
        ]}
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
