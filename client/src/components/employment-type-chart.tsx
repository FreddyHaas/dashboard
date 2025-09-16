import { ChartData } from 'chart.js';
import React from 'react';

import { useDebouncedQuery } from '../hooks/use-debounced-query';
import {
  EMPLOYMENT_TYPE_LABELS,
  usePersistedFilterState,
} from '../hooks/use-employee-filters-state';
import { resolveFilters } from '../lib/utils';
import {
  EmployeeTypeEntry,
  fetchEmployeeEmploymentTypeData,
} from '../mocks/mock-api-response';
import { ChartCard, ChartErrorState, ChartLoadingSkeleton, PieChart } from './charts';
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

  const {
    data: apiData = [],
    isLoading,
    error,
  } = useDebouncedQuery({
    queryKey: [EMPLOYMENT_TYPE_FILTER_SCOPE, effectiveFilters],
    queryFn: () => fetchEmployeeEmploymentTypeData(effectiveFilters),
    debounceMs: 500,
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
        <EmployeeFilter
          filters={localFilters}
          updateFilter={updateLocalFilter}
          clearFilters={clearLocalFilters}
          shortButton={false}
        />
      }
      chart={renderChart()}
    />
  );
}
