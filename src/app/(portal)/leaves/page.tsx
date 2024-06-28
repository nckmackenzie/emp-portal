import { Metadata } from 'next';
import Link from 'next/link';
import { NotebookPen } from 'lucide-react';

import { ContentLayout } from '@/components/layout/content-layout';
import { Button } from '@/components/ui/button';
import { LeaveTableSkeleton } from './_components/skeletons/leave-table-skeleton';
import FilterTabs from '@/components/ui/filter-tabs';
import { Suspense } from 'react';
import LeavesTable from './_components/leaves-table';

export const metadata: Metadata = {
  title: 'Leaves',
};

export default function page({
  searchParams,
}: {
  searchParams: { leaveType: string };
}) {
  return (
    <ContentLayout title="Leave" className="space-y-6">
      <Button asChild variant="default">
        <Link href="/leaves/leave-application">
          <NotebookPen className="icon mr-2" />
          <span>Apply Leave</span>
        </Link>
      </Button>
      <FilterTabs
        options={[
          { value: '1', label: 'Annual' },
          { value: '2', label: 'Sick' },
          { value: '3', label: 'Emergency' },
          { value: '4', label: 'Paternity' },
          { value: '5', label: 'Maternity' },
          { value: '6', label: 'School' },
        ]}
        filterKey="leaveType"
        className="w-max"
        size="sm"
      />
      <Suspense fallback={<LeaveTableSkeleton />}>
        <LeavesTable leaveType={searchParams.leaveType || '1'} />
      </Suspense>
    </ContentLayout>
  );
}
