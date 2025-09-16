'use client';

import { getChartColors } from '@/lib/colors';
import { ChartData, ChartOptions } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './chart-component-registry'; // Import to register Chart.js components

interface BarChartProps {
  data: ChartData<'bar'>;
}

export function BarChart({ data }: BarChartProps) {
  const colors = getChartColors();

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: colors.border,
        },
        ticks: {
          color: colors.mutedForeground,
        },
      },
      y: {
        grid: {
          color: colors.border,
        },
        ticks: {
          color: colors.mutedForeground,
        },
      },
    },
  };

  const styledData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: colors.secondary,
      borderColor: colors.secondary,
      borderWidth: 1,
    })),
  };

  return <Bar data={styledData} options={options} />;
}
