'use client';

import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/datatable';
import { Badge } from '@/components/ui/badge';

import { TLeaveApplication } from '../_types';

export default function LeaveAppliedTable({
  data,
}: {
  data: TLeaveApplication[];
}) {
  const columns: ColumnDef<TLeaveApplication>[] = [
    {
      accessorKey: 'applicationDate',
      header: 'Applied Date',
      cell: ({ row }) => (
        <div>{format(row.getValue('applicationDate'), 'PPP')}</div>
      ),
    },
    {
      accessorKey: 'startDate',
      header: 'From Date',
      cell: ({ row }) => <div>{format(row.getValue('startDate'), 'PPP')}</div>,
    },
    {
      accessorKey: 'endDate',
      header: 'To Date',
      cell: ({ row }) => <div>{format(row.getValue('endDate'), 'PPP')}</div>,
    },
    {
      accessorKey: 'daysTaken',
      header: 'Number of days',
    },
    {
      accessorKey: 'leaveStatus',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('leaveStatus');
        return (
          <div>
            <Badge
              variant={
                status === 'APPROVED'
                  ? 'success'
                  : status === 'REJECTED'
                  ? 'destructive'
                  : 'warning'
              }
            >
              {row.getValue('leaveStatus')}
            </Badge>
          </div>
        );
      },
    },
  ];
  return (
    <div className="hidden md:block">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
