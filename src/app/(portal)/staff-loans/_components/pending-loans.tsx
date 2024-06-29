import { format } from 'date-fns';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { checkUserAuth } from '@/lib/auth';
import db from '@/lib/database/db';
import { numberFormat } from '@/lib/formatters';

export default async function PendingLoansTable() {
  const user = await checkUserAuth();
  const pending = await db.query.staffLoans.findMany({
    columns: {
      id: true,
      loanDate: true,
      loanAmount: true,
      loanDuration: true,
      deductableAmount: true,
    },
    where: (model, { eq, and }) =>
      and(
        eq(model.loanStatus, 'PENDING'),
        eq(model.employeeId, user.employeeRefId)
      ),
  });

  if (!pending.length) return null;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Application Date</TableHead>
            <TableHead className="text-right">Loan Amount</TableHead>
            <TableHead className="text-right">Loan Duration</TableHead>
            <TableHead className="text-right">Monthly Payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pending.map(loan => (
            <TableRow key={loan.id}>
              <TableCell>{format(new Date(loan.loanDate), 'PPP')}</TableCell>
              <TableCell className="font-medium text-right">
                {numberFormat(loan.loanAmount)}
              </TableCell>
              <TableCell className="text-right">
                {loan.loanDuration} Months
              </TableCell>
              <TableCell className="text-right">
                {numberFormat(loan.deductableAmount)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
