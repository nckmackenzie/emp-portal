import { Badge } from '@/components/ui/badge';
import React from 'react';

export default function LeaveApplicationCards() {
  const status = 'APPROVED';
  return (
    <div className="block md:hidden">
      <div className="border rounded-md p-2 space-y-2">
        <div className="font-semibold grid grid-cols-2">
          Applied Date: <span className="font-normal">April 22, 2024</span>
        </div>
        <div className="font-semibold grid grid-cols-2">
          From Date: <span className="font-normal">April 22, 2024</span>
        </div>
        <div className="font-semibold grid grid-cols-2">
          To Date: <span className="font-normal">April 22, 2024</span>
        </div>
        <div className="font-semibold grid grid-cols-2">
          # of Days: <span className="font-normal">2</span>
        </div>
        <div className="font-semibold grid grid-cols-2">
          Status:{' '}
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
    </div>
  );
}
