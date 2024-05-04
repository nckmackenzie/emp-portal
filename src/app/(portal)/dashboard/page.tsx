import { Suspense } from 'react';
import { Metadata } from 'next';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import DashboardCards from './_components/dashboard-cards';
import LeaveApplications, {
  LeaveTableSkeleton,
} from './_components/leave-applications';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardCards />
      <Card>
        <CardHeader>
          <CardTitle>Leaves applied.</CardTitle>
          <CardDescription>List of all days applied.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<LeaveTableSkeleton />}>
            <LeaveApplications />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
