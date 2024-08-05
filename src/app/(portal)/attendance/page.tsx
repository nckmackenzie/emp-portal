import { Suspense } from 'react';
import { Metadata } from 'next';
import { addDays, format } from 'date-fns';
import {
  type LucideIcon,
  Timer,
  Clock,
  Clock11,
  CalendarClock,
} from 'lucide-react';

import { ContentLayout } from '@/components/layout/content-layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AttendanceActions from './_components/attendance-actions';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import AttendanceDatatable from './_components/attendance-datatable';

import { dummyArray } from '@/lib/utils';
import { getAttendance, getAttendanceSummary } from './service';

export const metadata: Metadata = {
  title: 'Attendance',
};

interface AttendancePageProps {
  searchParams: {
    from: string | undefined;
    to: string | undefined;
  };
}

export default function AttedancePage({ searchParams }: AttendancePageProps) {
  const { from, to } = searchParams;
  const formattedFromDate = `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1
  ).padStart(2, '0')}-01`;
  const rangeFrom = from ?? formattedFromDate;
  const rangeTo = to ?? format(addDays(new Date(rangeFrom), 20), 'yyyy-MM-dd');

  return (
    <ContentLayout title="Attendance">
      <div className="space-y-6 md:space-y-8">
        <AttendanceActions />
        <Suspense fallback={<SummaryCardsSkeleton />}>
          <SummaryCards rangeFrom={rangeFrom} rangeTo={rangeTo} />
        </Suspense>
        <Card>
          <CardHeader>
            <CardTitle>Attendance Record</CardTitle>
            <CardDescription>
              Attendance records from {format(new Date(rangeFrom), 'PPP')} to{' '}
              {format(new Date(rangeTo), 'PPP')}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-4 ">
            <Suspense fallback={<AttendanceTableSkeleton />}>
              <AttendanceTable from={rangeFrom} to={rangeTo} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </ContentLayout>
  );
}

interface SummaryCardProps {
  label: string;
  icon: LucideIcon;
  value: string | number;
}

async function SummaryCards({
  rangeFrom,
  rangeTo,
}: {
  rangeFrom: string;
  rangeTo: string;
}) {
  const summary = await getAttendanceSummary(rangeFrom, rangeTo);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8">
      <SummaryCard
        icon={CalendarClock}
        label="Total Worked Hours"
        value={summary[0].totalHours}
      />
      <SummaryCard
        icon={Clock}
        label="Late Arrivals"
        value={summary[0].lateArrivals}
      />
      <SummaryCard
        icon={Clock11}
        label="Early Departures"
        value={summary[0].earlyDepatures}
      />
      <SummaryCard
        icon={Timer}
        label="Total Lost Hours"
        value={summary[0].lostHours}
      />
    </div>
  );
}

function SummaryCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8">
      {dummyArray(4).map((_, i) => (
        <Card className="rounded-md w-full" key={i}>
          <CardContent className="p-4">
            <Skeleton className="size-5" />
            <div className="space-y-1 mt-4">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-4 w-56" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

async function AttendanceTable({ from, to }: { from: string; to: string }) {
  const attendance = await getAttendance(from, to);
  return <AttendanceDatatable attendances={attendance} />;
}

function SummaryCard({ label, icon: Icon, value }: SummaryCardProps) {
  return (
    <Card className="rounded-md w-full">
      <CardContent className="p-4">
        <Icon className="size-5 text-muted-foreground" />
        <div className="space-y-1 mt-4">
          <div className="text-3xl font-bold">{value}</div>
          <div className="text-muted-foreground text-sm">{label}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function AttendanceTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time In</TableHead>
          <TableHead>Time Out</TableHead>
          <TableHead>Short Hours</TableHead>
          <TableHead>Work Hours</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dummyArray(10).map((_, i) => (
          <TableRow key={i}>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 w-6" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
