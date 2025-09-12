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
import { ChartFilterBar } from './chart-filter-bar';
import { BarChart, LineChart, PieChart } from './charts';

// Register Chart.js components
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
const getChartData = (chartType: ChartType) => {
  const commonLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const commonData = [12, 19, 3, 5, 2, 3];

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
            data: [12, 19, 3, 5, 2, 3],
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
  const chartData = getChartData(chartType);

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
    <Card>
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