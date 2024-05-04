import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { TLeaveApplication } from '../_types';

export default function LeaveApplicationCards({
  data,
}: {
  data: TLeaveApplication[];
}) {
  return (
    <div className="block md:hidden">
      {data.map(leave => {
        const status = leave.leaveStatus;
        return (
          <div className="border rounded-md p-2 space-y-2" key={leave.leaveNo}>
            <div className="font-semibold grid grid-cols-2">
              Applied Date:{' '}
              <span className="font-normal">
                {format(leave.applicationDate, 'PPP')}
              </span>
            </div>
            <div className="font-semibold grid grid-cols-2">
              From Date:{' '}
              <span className="font-normal">
                {format(leave.startDate, 'PPP')}
              </span>
            </div>
            <div className="font-semibold grid grid-cols-2">
              To Date:{' '}
              <span className="font-normal">
                {format(leave.endDate, 'PPP')}
              </span>
            </div>
            <div className="font-semibold grid grid-cols-2">
              # of Days: <span className="font-normal">{leave.daysTaken}</span>
            </div>
            <div className="font-semibold grid grid-cols-2">
              Status:
              <Badge
                className="w-max"
                variant={
                  status === 'APPROVED'
                    ? 'success'
                    : status === 'REJECTED'
                    ? 'destructive'
                    : 'warning'
                }
              >
                {status}
              </Badge>
            </div>
          </div>
        );
      })}
    </div>
  );
}
