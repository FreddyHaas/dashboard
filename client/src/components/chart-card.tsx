"use client";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import * as React from 'react';
import { useFilterState } from '../lib/use-employee-filters-state';
import { resolveFilters } from '../lib/utils';
import { getChartData } from '../mocks/mock-api-response';
import { BarChart, LineChart, PieChart } from './charts';
import { EmployeeFilter } from './filters';
import { useGlobalFilter } from './global-filter-context';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export enum ChartType {
  Bar = 'Bar',
  Line = 'Line',
  Pie = 'Pie'
}

export function ChartCard({ title, chartType }: { title: string; chartType: ChartType }) {
  const { filters: globalFilters } = useGlobalFilter();
  const { filters: localFilters, updateFilter: updateLocalFilter, clearFilters: clearLocalFilters } = useFilterState();

  const effectiveFilters = React.useMemo(() => resolveFilters(globalFilters, localFilters), [globalFilters, localFilters]);
  const chartData = React.useMemo(() => getChartData(chartType, effectiveFilters), [chartType, effectiveFilters]);

  const renderChart = () => {
    switch (chartType) {
      case ChartType.Bar:
        return <BarChart data={chartData} />;
      case ChartType.Line:
        return <LineChart data={chartData} />;
      case ChartType.Pie:
        return <PieChart data={chartData} />;
      default:
        return <BarChart data={chartData} />;
    }
  };

  return (
    <Card className="min-w-[250px]">
      <CardHeader className="py-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardAction>
          <EmployeeFilter filters={localFilters} updateFilter={updateLocalFilter} clearFilters={clearLocalFilters} />
        </CardAction>
        <CardDescription>
          {chartType} chart visualization
        </CardDescription>
      </CardHeader>

      <CardContent className="py-4">
        <div className="h-40 w-full">
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
}