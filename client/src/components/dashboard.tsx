import { ChartCard, ChartType } from './chart-card';
import { DashboardGrid } from './dashboard-grid';
import { GlobalFilterBar } from './global-filter-bar';
import { GlobalFilterProvider } from './global-filter-context';

export function Dashboard() {
  return (
    <GlobalFilterProvider>
      <div className="w-full space-y-4 max-w-screen-xl">
        <GlobalFilterBar />
        <DashboardGrid>
          <ChartCard title="No. of Employees" chartType={ChartType.Bar} />
          <ChartCard title="Avg. Tenure" chartType={ChartType.Line} />
          <ChartCard title="Headcount by Department" chartType={ChartType.Pie} />
          <ChartCard title="Revenue Trends" chartType={ChartType.Line} />
        </DashboardGrid>
      </div>
    </GlobalFilterProvider>
  );
}
