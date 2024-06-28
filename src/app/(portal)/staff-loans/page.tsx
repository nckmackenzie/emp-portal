import { Suspense } from 'react';
import { Metadata } from 'next';

import { ContentLayout } from '@/components/layout/content-layout';
import LoanActions from './_components/actions';
import PendingLoansTable from './_components/pending-loans';
import { PendingLoanSkeleton } from './_components/skeletons';

export const metadata: Metadata = {
  title: 'Staff Loans',
};

export default function StaffLoansPage() {
  return (
    <ContentLayout title="Staff Loans" className="space-y-8">
      <LoanActions />
      <Suspense fallback={<PendingLoanSkeleton />}>
        <PendingLoansTable />
      </Suspense>
    </ContentLayout>
  );
}
