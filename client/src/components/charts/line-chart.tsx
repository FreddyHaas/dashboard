"use client";

import { getChartColors } from '@/lib/chart-colors';
import { ChartData, ChartOptions } from 'chart.js';
import { Line } from 'react-chartjs-2';

interface LineChartProps {
  data: ChartData<'line'>;
}

export function LineChart({ data }: LineChartProps) {
  const colors = getChartColors();
  
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: colors.card,
        titleColor: colors.cardForeground,
        bodyColor: colors.cardForeground,
        borderColor: colors.border,
        borderWidth: 1,
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
    datasets: data.datasets.map(dataset => ({
      ...dataset,
      borderColor: colors.primary,
      backgroundColor: `${colors.primary}1a`, // Add transparency for fill
      tension: 0.4,
      fill: true,
    })),
  };

  return <Line data={styledData} options={options} />;
}
