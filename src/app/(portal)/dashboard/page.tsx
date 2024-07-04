import { Metadata } from 'next';
import { Suspense } from 'react';

import { ContentLayout } from '@/components/layout/content-layout';
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
import { DashboardCardSkeleton } from './_components/skeletons';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function DashboardPage() {
  return (
    <ContentLayout title="Dashboard">
      <div className="space-y-8">
        <Suspense fallback={<DashboardCardSkeleton />}>
          <DashboardCards />
        </Suspense>
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
    </ContentLayout>
  );
}
