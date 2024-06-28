'use client';
import { useTransition } from 'react';
import { format } from 'date-fns';
import { ColumnDef } from '@tanstack/react-table';
import { MoreVertical } from 'lucide-react';

import { DataTable } from '@/components/ui/datatable';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CustomPrompt } from '@/components/ui/custom-prompt';

import { AppliedLeave } from '../leave-application/_utils/types';
import { cancelLeave } from '../leave-application/_actions';
import { toast } from 'sonner';

interface LeaveDatatableProps {
  leaves: AppliedLeave[];
}

export default function LeaveDatatable({ leaves }: LeaveDatatableProps) {
  const [isPending, startTransition] = useTransition();
  const columns: ColumnDef<AppliedLeave>[] = [
    {
      accessorKey: 'startDate',
      header: 'Start Date',
      cell: ({ row }) => <div>{format(row.getValue('startDate'), 'PPP')}</div>,
    },
    {
      accessorKey: 'endDate',
      header: 'End Date',
      cell: ({ row }) => <div>{format(row.getValue('endDate'), 'PPP')}</div>,
    },
    {
      accessorKey: 'daysTaken',
      header: '# of days',
    },
    {
      accessorKey: 'resumeDate',
      header: 'Resume Date',
      cell: ({ row }) => <div>{format(row.getValue('resumeDate'), 'PPP')}</div>,
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
    {
      id: 'actions',
      cell: ({ row }) => {
        const leave = row.original;
        const isCancellable =
          leave.leaveStatus === 'PENDING' ||
          (leave.leaveStatus === 'APPROVED' &&
            new Date(leave.startDate) > new Date());

        if (!isCancellable) return null;

        function handleCancelLeave() {
          startTransition(() => {
            cancelLeave(leave.leaveNo)
              .then(res => {
                if (res?.error) {
                  toast.error(res.error);
                  return;
                }
              })
              .catch(err => toast.error(`😞 ${err.message}`));
          });
        }

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="more-btn" disabled={isPending}>
                <MoreVertical className="icon-muted" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <CustomPrompt
                description="Cancel Leave"
                prompt="Are you sure you want to cancel the selected leave?"
                onConfirm={handleCancelLeave}
                isPending={isPending}
              >
                <button
                  className="delete-menu-item text-xs text-destructive"
                  disabled={isPending}
                >
                  Cancel Leave
                </button>
              </CustomPrompt>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return <DataTable data={leaves} columns={columns} />;
}
