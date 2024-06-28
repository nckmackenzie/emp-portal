import { Metadata } from 'next';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LeaveApplicationForm from './_components/leave-application-form';
import { getLeaveNo, getLeaveTypes } from './_services';
import { Suspense } from 'react';
import { ContentLayout } from '@/components/layout/content-layout';

export const metadata: Metadata = {
  title: 'Leave application',
};

export default async function LeaveApplicationPage() {
  const leaveNo = await getLeaveNo();

  const leaveTypes = await getLeaveTypes();
  const convertedLeaveTypes = leaveTypes.map(type => ({
    label: type.leaveTypeName,
    value: type.id.toString(),
  }));
  return (
    <ContentLayout title="Apply for leave">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="p-2 md:p-4">
          <CardTitle>Leave application</CardTitle>
          <CardDescription>
            Fill all fields with the required information.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-2 md:p-4">
          <Suspense>
            <LeaveApplicationForm
              leaveNo={leaveNo}
              leaveTypes={convertedLeaveTypes}
            />
          </Suspense>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
