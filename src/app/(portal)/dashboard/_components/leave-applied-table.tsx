'use client';

import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';

import { DataTable } from '@/components/ui/datatable';
import { Badge } from '@/components/ui/badge';

import { TLeaveApplication } from '../_types';

const data: TLeaveApplication[] = [
  {
    AppliedDate: new Date('2024-04-01'),
    FromDate: new Date('2024-04-03'),
    ToDate: new Date('2024-04-04'),
    NumberOfDays: 2,
    status: 'PENDING',
  },
];

export default function LeaveAppliedTable() {
  const columns: ColumnDef<TLeaveApplication>[] = [
    {
      accessorKey: 'AppliedDate',
      header: 'Applied Date',
      cell: ({ row }) => (
        <div>{format(row.getValue('AppliedDate'), 'PPP')}</div>
      ),
    },
    {
      accessorKey: 'FromDate',
      header: 'From Date',
      cell: ({ row }) => <div>{format(row.getValue('FromDate'), 'PPP')}</div>,
    },
    {
      accessorKey: 'ToDate',
      header: 'To Date',
      cell: ({ row }) => <div>{format(row.getValue('ToDate'), 'PPP')}</div>,
    },
    {
      accessorKey: 'NumberOfDays',
      header: 'Number of days',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status');
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
              {row.getValue('status')}
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
