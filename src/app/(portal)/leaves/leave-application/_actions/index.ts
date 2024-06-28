'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import db from '@/lib/database/db';
import { validateRequest } from '../../../../../../auth';
import { leaveApplicationSchema } from '../_utils/schema';
import { TLeaveApplication } from '../_utils/types';
import { calculateWorkingDays } from '../_utils/utils';
import { leaveApplications } from '@/migrations/schema';
import { formatDate, formatStringForDb } from '@/lib/formatters';

export const createLeave = async (values: TLeaveApplication) => {
  const { user } = await validateRequest();

  if (!user)
    return {
      error: 'Unauthorized. You need to be logged in to complete this action.',
    };

  const validated = leaveApplicationSchema.safeParse(values);
  if (!validated.success) {
    return {
      error:
        'Invalid information passed. Ensure you have passed accurate information.',
    };
  }

  const {
    endDate,
    leaveType,
    reason,
    resumeDate,
    startDate,
    attachment,
    hasHalfDay,
  } = validated.data;

  const leaveRef = await db.query.leaveApplications.findMany({
    columns: { leaveNo: true },
  });

  const formattedStartDate = formatDate(new Date(startDate));
  const formattedEndDate = formatDate(new Date(endDate));
  const formattedResumeDate = formatDate(new Date(resumeDate));

  if (formattedStartDate < formatDate(new Date())) {
    return { error: 'Start date cannot be earlier than current date.' };
  }

  if (formattedStartDate > formattedEndDate) {
    return { error: 'End date cannot be earlier than start date.' };
  }

  if (formattedResumeDate < formattedEndDate) {
    return { error: 'Cannot resume earlier than leave end date.' };
  }

  const numberOfDays = calculateWorkingDays(
    new Date(formattedStartDate),
    new Date(formattedEndDate)
  );

  const returned = await db
    .insert(leaveApplications)
    .values({
      leaveNo: leaveRef.length + 1,
      employeeCategory: 'MANAGEMENT',
      employeeId: user.employeeRefId,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      resumeDate: formattedResumeDate,
      leaveTypeId: Number(leaveType),
      reason: formatStringForDb(reason),
      applicationDate: formatDate(new Date()),
      attachmentUrl: attachment ?? null,
      daysTaken: !hasHalfDay
        ? numberOfDays.toString()
        : (numberOfDays - 0.5).toString(),
      leaveStatus: 'PENDING',
    })
    .returning();

  if (!returned.length)
    return { error: 'Was unable to save this leave. Contact support.' };

  revalidatePath('/dashboard');
  revalidatePath('/leaves');
  return redirect('/leaves');
};
