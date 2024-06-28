import { Metadata } from 'next';
import Link from 'next/link';
import { NotebookPen } from 'lucide-react';

import { ContentLayout } from '@/components/layout/content-layout';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Leaves',
};

export default function page() {
  return (
    <ContentLayout title="Leave">
      <Button asChild variant="default">
        <Link href="/leaves/leave-application">
          <NotebookPen className="icon mr-2" />
          <span>Apply Leave</span>
        </Link>
      </Button>
    </ContentLayout>
  );
}
