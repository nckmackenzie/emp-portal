import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import {
  getCounties,
  getEmployeeChildren,
  getEmployeeDetails,
  getEmployeeNok,
} from './_services';
import DetailsForms from './_components/details-form';
import { validateRequest } from '../../../../auth';
import { ContentLayout } from '@/components/layout/content-layout';

export const metadata: Metadata = {
  title: 'My details',
};

export default async function MyDetailsPage() {
  const { user } = await validateRequest();
  if (!user) redirect('/login');

  const info = await getEmployeeDetails(user.employeeRefId);
  const nextOfKin = await getEmployeeNok(user.employeeRefId);
  const children = await getEmployeeChildren(user.employeeRefId);
  const counties = await getCounties();

  return (
    <ContentLayout title="My details">
      <DetailsForms
        data={info}
        nok={nextOfKin}
        kids={children}
        counties={counties}
      />
    </ContentLayout>
  );
}
