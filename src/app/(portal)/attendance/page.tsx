import { Metadata } from 'next';

import { ContentLayout } from '@/components/layout/content-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Attendance',
};
export default function AttedancePage() {
  return (
    <ContentLayout title="Attendance">
      <Card>
        <CardHeader>
          <CardTitle>Attendance Record</CardTitle>
          <CardDescription>
            View attedance record. Select date ranger to filter
          </CardDescription>
        </CardHeader>
        <CardContent className='py-4'>
            
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
