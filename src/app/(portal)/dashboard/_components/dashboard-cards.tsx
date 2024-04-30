import { Calculator, Calendar, Clock, Hourglass } from 'lucide-react';
import DashboardCard from './dashboard.card';

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard label="Total days accured" value={2} Icon={Calendar} />
      <DashboardCard
        label="Total days taken"
        value={2}
        Icon={Calculator}
        href="/leave/applied"
      />
      <DashboardCard label="Leave balance" value={2} Icon={Hourglass} />
      <DashboardCard
        label="Total lost hours"
        value={2}
        Icon={Clock}
        href="/lost-hours"
      />
    </div>
  );
}
