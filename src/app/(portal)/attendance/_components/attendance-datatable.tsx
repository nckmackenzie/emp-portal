'use client';

import { type ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { DataTable } from '@/components/ui/datatable';
import { type Attendance } from './types';

interface AttendanceDatatableProps {
  attendances: Attendance[];
}

const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: 'attendanceDate',
    header: 'Date',
    cell: ({ row }) => (
      <div>{format(new Date(row.getValue('attendanceDate')), 'PPP')}</div>
    ),
  },
  {
    accessorKey: 'timeIn',
    header: () => <div className="text-center">Time In</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('timeIn')}</div>
    ),
  },
  {
    accessorKey: 'timeOut',
    header: () => <div className="text-center">Time Out</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('timeOut')}</div>
    ),
  },
  {
    accessorKey: 'shortHour',
    header: () => <div className="text-center">Short Hours</div>,
    cell: ({ row }) => {
      const { shortHour } = row.original;
      return (
        <div className="text-center">
          {shortHour ? (+shortHour === 0 ? '-' : shortHour) : '-'}
        </div>
      );
    },
  },
  {
    accessorKey: 'workHour',
    header: () => <div className="text-center">Total Hours</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('workHour')}</div>
    ),
  },
];

export default function AttendanceDatatable({
  attendances,
}: AttendanceDatatableProps) {
  return <DataTable columns={columns} data={attendances} />;
}
