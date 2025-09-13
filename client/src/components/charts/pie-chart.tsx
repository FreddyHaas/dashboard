"use client";

import { getChartColors } from '@/lib/chart-colors';
import { ChartData, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './chart-component-registry'; // Import to register Chart.js components

interface PieChartProps {
  data: ChartData<'pie'>;
}

export function PieChart({ data }: PieChartProps) {
  const colors = getChartColors();
  
  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: colors.mutedForeground,
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: colors.card,
        titleColor: colors.cardForeground,
        bodyColor: colors.cardForeground,
        borderColor: colors.border,
        borderWidth: 1,
      },
    },
  };

  const chartColors = [colors.chart1, colors.chart2, colors.chart3, colors.chart4, colors.chart5];
  
  const styledData = {
    ...data,
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      backgroundColor: chartColors,
      borderColor: colors.card,
      borderWidth: 2,
    })),
  };

  return <Pie data={styledData} options={options} />;
}
