import { Calculator, Calendar, Clock, Hourglass } from 'lucide-react';
import DashboardCard from './dashboard.card';
import { getCummulatedDays, getDaysTaken } from '../_services';

export default async function DashboardCards() {
  const [accumulatedDays, daysTaken] = await Promise.all([
    getCummulatedDays(),
    getDaysTaken(),
  ]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard
        label="Total days accured"
        value={accumulatedDays}
        Icon={Calendar}
      />
      <DashboardCard
        label="Total days taken"
        value={daysTaken}
        Icon={Calculator}
        href="/leave/applied"
      />
      <DashboardCard
        label="Leave balance"
        value={accumulatedDays - daysTaken}
        Icon={Hourglass}
      />
      <DashboardCard
        label="Total lost hours"
        value={0}
        Icon={Clock}
        href="/lost-hours"
      />
    </div>
  );
}
