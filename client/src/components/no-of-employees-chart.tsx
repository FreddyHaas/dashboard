import { ChartData } from 'chart.js';
import React from 'react';
import { useFilterState } from '../lib/use-employee-filters-state';
import { resolveFilters } from '../lib/utils';
import { fetchNoOfEmployeesData, NoOfEmployeesEntry } from '../mocks/mock-api-response';
import { ChartCard } from './chart-card';
import { BarChart } from './charts/bar-chart';
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
    const apiData = React.useMemo(() => fetchNoOfEmployeesData(effectiveFilters), [effectiveFilters]);
    const chartData = React.useMemo(() => mapToChartData(apiData), [apiData]);

    return (
        <ChartCard 
        title={"Number of Employees"}
        description={"Headcount, not FTE adjusted"}
        action={<EmployeeFilter filters={localFilters} updateFilter={updateLocalFilter} clearFilters={clearLocalFilters} />}
        chart={<BarChart data={chartData} />}
        />
    );
  }