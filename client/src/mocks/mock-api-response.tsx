import { ChartType } from '../components/chart-card';
import { Filters } from '../lib/use-employee-filters-state';

// Fake data for different chart types
export const getChartData = (chartType: ChartType, filter: Filters) => {
    const commonLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    let commonData: any[] = [];
  
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