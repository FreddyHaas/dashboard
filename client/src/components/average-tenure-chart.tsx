import { ChartData } from 'chart.js';
import React from 'react';
import { useDebouncedQuery } from '../hooks/use-debounced-query';
import { usePersistedFilterState } from '../hooks/use-employee-filters-state';
import { resolveFilters } from '../lib/utils';
import {
  AverageTenureEntry,
  fetchAverageTenureData,
} from '../mocks/mock-api-response';
import { ChartCard, ChartErrorState, ChartLoadingSkeleton, LineChart } from './charts';
import { EmployeeFilter } from './filters';
import { useGlobalFilter } from './global-filter-context';

const AVERAGE_TENURE_FILTER_SCOPE = 'average-tenure';

function mapToChartData(apiData: AverageTenureEntry[]): ChartData<'line'> {
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
        label: 'Average Tenure (years)',
        data: apiData.map((entry) => entry.averageTenure),
      },
    ],
  };
}

export function AverageTenureChart() {
  const { filters: globalFilters } = useGlobalFilter();
  const {
    filters: localFilters,
    updateFilter: updateLocalFilter,
    clearFilters: clearLocalFilters,
  } = usePersistedFilterState(AVERAGE_TENURE_FILTER_SCOPE);

  const effectiveFilters = React.useMemo(
    () => resolveFilters(globalFilters, localFilters),
    [globalFilters, localFilters],
  );

  const {
    data: apiData = [],
    isLoading,
    error,
  } = useDebouncedQuery({
    queryKey: [AVERAGE_TENURE_FILTER_SCOPE, effectiveFilters],
    queryFn: () => fetchAverageTenureData(effectiveFilters),
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

    return <LineChart data={chartData} />;
  };

  return (
    <ChartCard
      title={'Average Employee Tenure'}
      description={'In years'}
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
