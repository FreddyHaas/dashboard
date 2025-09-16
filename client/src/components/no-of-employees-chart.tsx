import { ChartData } from 'chart.js';
import React from 'react';
import { useDebouncedQuery } from '../hooks/use-debounced-query';
import { usePersistedFilterState } from '../hooks/use-employee-filters-state';
import { resolveFilters } from '../lib/utils';
import {
  fetchNoOfEmployeesData,
  NoOfEmployeesEntry,
} from '../mocks/mock-api-response';
import { BarChart, ChartCard, ChartErrorState, ChartLoadingSkeleton } from './charts';
import { EmployeeFilter } from './filters';
import { useGlobalFilter } from './global-filter-context';

const NO_OF_EMPLOYEES_FILTER_SCOPE = 'no-of-employees';

function mapToChartData(apiData: NoOfEmployeesEntry[]): ChartData<'bar'> {
  return {
    labels: apiData.map((entry) => {
      const date = new Date(entry.date);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }),
    datasets: [
      {
        label: 'No. of Employees',
        data: apiData.map((entry) => entry.noOfEmployees),
      },
    ],
  };
}

export function NoOfEmployeesChart() {
  const { filters: globalFilters } = useGlobalFilter();
  const {
    filters: localFilters,
    updateFilter: updateLocalFilter,
    clearFilters: clearLocalFilters,
  } = usePersistedFilterState(NO_OF_EMPLOYEES_FILTER_SCOPE);

  const effectiveFilters = React.useMemo(
    () => resolveFilters(globalFilters, localFilters),
    [globalFilters, localFilters],
  );

  const {
    data: apiData = [],
    isLoading,
    error,
  } = useDebouncedQuery({
    queryKey: [NO_OF_EMPLOYEES_FILTER_SCOPE, effectiveFilters],
    queryFn: () => fetchNoOfEmployeesData(effectiveFilters),
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

    return <BarChart data={chartData} />;
  };

  return (
    <ChartCard
      title={'Number of Employees'}
      description={'Headcount, not FTE adjusted'}
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
