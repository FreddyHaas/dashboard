'use client';

import Chart, { CategoryScale } from 'chart.js/auto';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Data } from '../lib/mockData';

Chart.register(CategoryScale);

export function Panel({ title }: { title: string }) {
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: 'Users Gained ',
        data: Data.map((data) => data.userGain),
        backgroundColor: [
          'rgba(75,192,192,1)',
          '#50AF95',
          '#f3ba2f',
          '#2a71d0',
        ],
        borderColor: 'black',
        borderWidth: 2,
      },
    ],
  });

  return (
    <div>
      <p>{title}</p>
      <Line data={chartData} />
    </div>
  );
}
