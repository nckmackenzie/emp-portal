'use server';
import { revalidatePath } from 'next/cache';
import { format } from 'date-fns';

import db from '@/lib/database/db';
import { checkUserAuth } from '@/lib/auth';
import { TLoanApplication } from '../_utils/types';
import { loanSchema } from '../_utils/schema';
import { staffLoans } from '@/migrations/schema';
import { formatStringForDb } from '@/lib/formatters';

export const applyLoan = async (request: TLoanApplication) => {
  const user = await checkUserAuth();

  const validated = loanSchema.safeParse(request);
  if (!validated.success) return { error: 'Invalid data passed.' };

  const { amount, deduction, duration, reason } = validated.data;

  const returned = await db
    .insert(staffLoans)
    .values({
      loanDate: format(new Date(), 'yyyy-MM-dd'),
      loanAmount: amount.toString(),
      loanDuration: duration,
      employeeId: user.employeeRefId,
      reason: formatStringForDb(reason),
      deductableAmount: deduction.toString(),
    })
    .returning({ id: staffLoans.id });

  if (!returned.length)
    return { error: 'Was unable to apply this loan. Contact support.' };

  revalidatePath('/staff-loans');
  return { error: null };
};
