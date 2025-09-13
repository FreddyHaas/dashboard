import { DashboardGrid } from './dashboard-grid';
import { GlobalFilterBar } from './global-filter-bar';
import { GlobalFilterProvider } from './global-filter-context';
import { NoOfEmployeesChart } from './no-of-employees-chart';

export function Dashboard() {
  return (
    <GlobalFilterProvider>
      <div className="w-full space-y-4 max-w-screen-xl">
        <GlobalFilterBar />
        <DashboardGrid>
          <NoOfEmployeesChart/>
        </DashboardGrid>
      </div>
    </GlobalFilterProvider>
  );
}
