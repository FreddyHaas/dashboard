import { AverageTenureChart } from './average-tenure-chart';
import { DashboardGrid } from './dashboard-grid';
import { EmploymentTypeChart } from './employment-type-chart';
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
          <AverageTenureChart/>
          <EmploymentTypeChart/>
        </DashboardGrid>
      </div>
    </GlobalFilterProvider>
  );
}
