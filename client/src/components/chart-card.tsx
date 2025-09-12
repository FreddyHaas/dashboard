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
import { ChartFilterBar } from './chart-filter-bar';
import { BarChart, LineChart, PieChart } from './charts';
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

// Fake data for different chart types
const getChartData = (chartType: ChartType, filters: any) => {
  const commonLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  let commonData = [12, 19, 3, 5, 2, 3];
  
  // Apply filter effects to data (simulated)
  if (filters.location && filters.location !== 'all') {
    commonData = commonData.map(val => Math.floor(val * 0.8));
  }
  if (filters.department && filters.department !== 'all') {
    commonData = commonData.map(val => Math.floor(val * 1.2));
  }
  if (filters.timeframe) {
    const multiplier = filters.timeframe === '7d' ? 0.3 : filters.timeframe === '30d' ? 0.7 : 1;
    commonData = commonData.map(val => Math.floor(val * multiplier));
  }

  switch (chartType) {
    case ChartType.Bar:
      return {
        labels: commonLabels,
        datasets: [
          {
            label: 'Data',
            data: commonData,
          },
        ],
      };
    case ChartType.Line:
      return {
        labels: commonLabels,
        datasets: [
          {
            label: 'Trend',
            data: commonData,
          },
        ],
      };
    case ChartType.Pie:
      return {
        labels: ['Desktop', 'Mobile', 'Tablet'],
        datasets: [
          {
            data: [65, 25, 10],
          },
        ],
      };
    default:
      return {
        labels: commonLabels,
        datasets: [
          {
            label: 'Data',
            data: commonData,
          },
        ],
      };
  }
};

export function ChartCard({ title, chartType }: { title: string; chartType: ChartType }) {
  const { filters } = useGlobalFilter();
  const chartData = React.useMemo(() => getChartData(chartType, filters), [chartType, filters]);

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
        <CardAction><ChartFilterBar/></CardAction>
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