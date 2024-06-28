import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import LeaveApplicationCards from './leave-application-cards';
import LeaveAppliedTable from './leave-applied-table';
import { Skeleton } from '@/components/ui/skeleton';
import { dummyArray } from '@/lib/utils';
import { getAppliedLeaves } from '../../leaves/leave-application/_services';

export default async function LeaveApplications() {
  const leaves = await getAppliedLeaves();
  return (
    <>
      <LeaveAppliedTable data={leaves} />
      <LeaveApplicationCards data={leaves} />
    </>
  );
}

export const LeaveTableSkeleton = () => {
  return (
    <>
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Application Date</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Number of days</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyArray(10).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-36" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-16" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="block md:hidden">
        <div className="border rounded-md p-2 space-y-2">
          <div className="font-semibold grid grid-cols-2">
            Applied Date: <Skeleton className="w-36 h-4" />
          </div>
          <div className="font-semibold grid grid-cols-2">
            From Date: <Skeleton className="w-36 h-4" />
          </div>
          <div className="font-semibold grid grid-cols-2">
            To Date: <Skeleton className="w-36 h-4" />
          </div>
          <div className="font-semibold grid grid-cols-2">
            # of Days: <Skeleton className="w-8 h-4" />
          </div>
          <div className="font-semibold grid grid-cols-2">
            Status: <Skeleton className="w-28 h-4" />
          </div>
        </div>
      </div>
    </>
  );
};
