import { ChartData } from 'chart.js';
import React from 'react';
import { useAsyncData } from '../lib/use-async-data';
import { useFilterState } from '../lib/use-employee-filters-state';
import { resolveFilters } from '../lib/utils';
import { fetchNoOfEmployeesData, NoOfEmployeesEntry } from '../mocks/mock-api-response';
import { ChartCard } from './chart-card';
import { BarChart } from './charts/bar-chart';
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
            data: apiData.map(entry => entry.employees),
        }],
    };
}

export function NoOfEmployeesChart() {
    const { filters: globalFilters } = useGlobalFilter();
    const { filters: localFilters, updateFilter: updateLocalFilter, clearFilters: clearLocalFilters } = useFilterState();
  
    const effectiveFilters = React.useMemo(() => resolveFilters(globalFilters, localFilters), [globalFilters, localFilters]);   
    
    const { data: apiData, isLoading, error } = useAsyncData({
        fetchFn: () => fetchNoOfEmployeesData(effectiveFilters),
        dependencies: [effectiveFilters],
        initialData: [],
    });

    const chartData = React.useMemo(() => mapToChartData(apiData || []), [apiData]);

    if (error) {
        return (
            <ChartCard 
                title={"Number of Employees"}
                description={"Headcount, not FTE adjusted"}
                action={<EmployeeFilter filters={localFilters} updateFilter={updateLocalFilter} clearFilters={clearLocalFilters} />}
                chart={
                    <div className="flex items-center justify-center h-64">
                        <div className="flex flex-col items-center space-y-4">
                            <p className="text-sm">Error: {error}</p>
                        </div>
                    </div>
                }
            />
        );
    }

    return (
        <ChartCard 
            title={"Number of Employees"}
            description={"Headcount, not FTE adjusted"}
            action={<EmployeeFilter filters={localFilters} updateFilter={updateLocalFilter} clearFilters={clearLocalFilters} />}
            chart={
                isLoading ? (
                    <ChartLoadingSkeleton />
                ) : (
                    <BarChart data={chartData} />
                )
            }
        />
    );
}