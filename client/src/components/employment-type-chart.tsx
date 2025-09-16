import { ChartData } from 'chart.js';
import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import {
  EMPLOYMENT_TYPE_LABELS,
  usePersistedFilterState,
} from '../hooks/use-employee-filters-state';
import { resolveFilters } from '../lib/utils';
import {
  EmployeeTypeEntry,
  fetchEmployeeEmploymentTypeData,
} from '../mocks/mock-api-response';
import {
  ChartCard,
  ChartErrorState,
  ChartLoadingSkeleton,
  PieChart,
} from './charts';
import { EmployeeFilter } from './filters';
import { useGlobalFilter } from './global-filter-context';

const EMPLOYMENT_TYPE_FILTER_SCOPE = 'employment-type';

function mapToChartData(apiData: EmployeeTypeEntry[]): ChartData<'pie'> {
  return {
    labels: apiData.map((entry) => {
      const employmentType =
        entry.employmentType as keyof typeof EMPLOYMENT_TYPE_LABELS;
      return EMPLOYMENT_TYPE_LABELS[employmentType] || entry.employmentType;
    }),
    datasets: [
      {
        label: 'Number of Employees',
        data: apiData.map((entry) => entry.noOfEmployees),
      },
    ],
  };
}

export function EmploymentTypeChart() {
  const { filters: globalFilters } = useGlobalFilter();
  const {
    filters: localFilters,
    updateFilter: updateLocalFilter,
    clearFilters: clearLocalFilters,
  } = usePersistedFilterState(EMPLOYMENT_TYPE_FILTER_SCOPE);

  const effectiveFilters = React.useMemo(
    () => resolveFilters(globalFilters, localFilters),
    [globalFilters, localFilters],
  );

  const [debouncedEffectiveFilters] = useDebounce(effectiveFilters, 500);

  const {
    data: apiData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: [EMPLOYMENT_TYPE_FILTER_SCOPE, debouncedEffectiveFilters],
    queryFn: () => fetchEmployeeEmploymentTypeData(debouncedEffectiveFilters!),
    enabled: debouncedEffectiveFilters !== null,
  });

  const chartData = React.useMemo(
    () => mapToChartData(apiData || []),
    [apiData],
  );

  const renderChart = () => {
    if (error) {
      return <ChartErrorState error={error.message || 'An error occurred'} />;
    }

    if (isLoading) {
      return <ChartLoadingSkeleton />;
    }

    return (
      <div className="max-w-[350px]">
        <PieChart data={chartData} />
      </div>
    );
  };

  return (
    <ChartCard
      title={'Employment Type Distribution'}
      description={'At last selected filter date'}
      action={
        localFilters && (
          <EmployeeFilter
            filters={localFilters}
            updateFilter={updateLocalFilter}
            clearFilters={clearLocalFilters}
            shortButton={true}
          />
        )
      }
      chart={renderChart()}
    />
  );
}
