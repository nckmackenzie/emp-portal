'use client';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

import { DataTable } from '@/components/ui/datatable';
import { Badge } from '@/components/ui/badge';

import { Loan } from '../_utils/types';
import { numberFormat } from '@/lib/formatters';

interface LoansDatatableProps {
  loans: Loan[];
}

function LoansDatatable({ loans }: LoansDatatableProps) {
  const columns: ColumnDef<Loan>[] = [
    {
      accessorKey: 'loanDate',
      header: 'Application Date',
      cell: ({ row }) => (
        <div>{format(new Date(row.getValue('loanDate')), 'PPP')}</div>
      ),
    },
    {
      accessorKey: 'loanAmount',
      header: () => <div className="text-right">Loan Amount</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {numberFormat(row.getValue('loanAmount'))}
        </div>
      ),
    },
    {
      accessorKey: 'loanDeductions',
      header: () => <div className="text-right">Loan Deductions</div>,
      cell: ({ row }) => (
        <div className="text-right">
          {numberFormat(row.getValue('loanDeductions'))}
        </div>
      ),
    },
    {
      id: 'loanBalance',
      header: () => <div className="text-right">Loan Balance</div>,
      cell: ({ row }) => {
        const balance =
          Number(row.getValue('loanAmount')) -
          Number(row.getValue('loanDeductions'));
        return <div className="text-right">{numberFormat(balance)}</div>;
      },
    },
    {
      accessorKey: 'loanStatus',
      header: 'Loan Status',
      cell: ({ row }) => {
        const loan = row.original;
        const status = loan.completed;
        const loanStatus = loan.loanStatus;
        return (
          <div>
            <Badge
              variant={
                status
                  ? 'success'
                  : loanStatus === 'APPROVED'
                  ? 'warning'
                  : 'destructive'
              }
            >
              {status
                ? 'Completed'
                : loanStatus === 'APPROVED'
                ? 'In Progress'
                : 'Pending Approval'}
            </Badge>
          </div>
        );
      },
    },
  ];
  return <DataTable columns={columns} data={loans} />;
}

export default LoansDatatable;
