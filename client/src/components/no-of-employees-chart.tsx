import { ChartData } from 'chart.js';
import React from 'react';
import { useDebouncedQuery } from '../hooks/use-debounced-query';
import { usePersistedFilterState } from '../hooks/use-employee-filters-state';
import { resolveFilters } from '../lib/utils';
import {
  fetchNoOfEmployeesData,
  NoOfEmployeesEntry,
} from '../mocks/mock-api-response';
import { ChartCard } from './chart-card';
import { BarChart, ChartErrorState } from './charts';
import { ChartLoadingSkeleton } from './charts/chart-loading-skeleton';
import { EmployeeFilter } from './employee-filters';
import { useGlobalFilter } from './global-filter-context';

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
  } = usePersistedFilterState('no-of-employees');

  const effectiveFilters = React.useMemo(
    () => resolveFilters(globalFilters, localFilters),
    [globalFilters, localFilters],
  );

  const {
    data: apiData = [],
    isLoading,
    error,
  } = useDebouncedQuery({
    queryKey: ['no-of-employees', effectiveFilters],
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
