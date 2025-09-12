import { ChartCard } from './chart-card';
import { DashboardGrid } from './dashboard-grid';
import { GlobalFilterBar } from './global-filter-bar';

export function Dashboard() {
  return (
    <div className="w-full space-y-4 max-w-screen-xl">
      <GlobalFilterBar />
      <DashboardGrid>
        <ChartCard title="No. of Employees" />
        <ChartCard title="Avg. Tenure" />
        <ChartCard title="Headcount by Department" />
        <ChartCard title="Headcount by Department" />
      </DashboardGrid>
    </div>
  );
}
