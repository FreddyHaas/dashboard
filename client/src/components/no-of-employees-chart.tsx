import { ChartData } from 'chart.js';
import React from 'react';
import { useAsyncData } from '../hooks/use-async-data';
import { usePersistedFilterState } from '../hooks/use-employee-filters-state';
import { resolveFilters } from '../lib/utils';
import { fetchNoOfEmployeesData, NoOfEmployeesEntry } from '../mocks/mock-api-response';
import { ChartCard } from './chart-card';
import { BarChart, ChartErrorState } from './charts';
import { ChartLoadingSkeleton } from './charts/chart-loading-skeleton';
import { EmployeeFilter } from './employee-filters';
import { useGlobalFilter } from './global-filter-context';

function mapToChartData(apiData: NoOfEmployeesEntry[]): ChartData<'bar'> {
    return {
        labels: apiData.map(entry => {
            const date = new Date(entry.date);
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
        }),
        datasets: [{
            label: 'No. of Employees',
            data: apiData.map(entry => entry.noOfEmployees),
        }],
    };
}

export function NoOfEmployeesChart() {
    const { filters: globalFilters } = useGlobalFilter();
    const { filters: localFilters, updateFilter: updateLocalFilter, clearFilters: clearLocalFilters } = usePersistedFilterState("no-of-employees");
  
    const effectiveFilters = React.useMemo(() => resolveFilters(globalFilters, localFilters), [globalFilters, localFilters]);   
    
    const { data: apiData, isLoading, error } = useAsyncData({
        fetchFn: () => fetchNoOfEmployeesData(effectiveFilters),
        dependencies: [effectiveFilters],
        initialData: [],
    });

    const chartData = React.useMemo(() => mapToChartData(apiData || []), [apiData]);

    const renderChart = () => {
        if (error) {
            return <ChartErrorState error={error} />;
        }
        
        if (isLoading) {
            return <ChartLoadingSkeleton />;
        }
        
        return <BarChart data={chartData} />;
    };

    return (
        <ChartCard 
            title={"Number of Employees"}
            description={"Headcount, not FTE adjusted"}
            action={<EmployeeFilter filters={localFilters} updateFilter={updateLocalFilter} clearFilters={clearLocalFilters} />}
            chart={renderChart()}
        />
    );
}