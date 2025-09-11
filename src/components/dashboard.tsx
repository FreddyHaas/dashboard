import { Panel } from './panel';

export function Dashboard() {
  return (
    <div>
      <p>Dashboard</p>
      <Panel title={'No. of Employees'} />
      <Panel title={'Avg. tenure'} />
    </div>
  );
}
