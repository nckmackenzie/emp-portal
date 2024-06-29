import { cache } from 'react';

import db from '@/lib/database/db';
import { validateRequest } from '../../../../../../auth';
import { checkUserAuth } from '@/lib/auth';

export const getLeaveTypes = cache(async () => {
  return await db.query.leaveTypes.findMany({
    columns: { id: true, leaveTypeName: true },
  });
});

export const getLeaveNo = async () => {
  const result = await db.query.leaveApplications.findMany({
    columns: { leaveNo: true },
  });
  return result.length + 1;
};

export const getAppliedLeaves = cache(async () => {
  const { user } = await validateRequest();

  if (!user)
    throw new Error('You need to be logged in to perform this action.');

  return await db.query.leaveApplications.findMany({
    columns: {
      leaveNo: true,
      applicationDate: true,
      daysTaken: true,
      endDate: true,
      startDate: true,
      leaveStatus: true,
    },
    where: (model, { eq, and }) =>
      and(eq(model.isDeleted, false), eq(model.employeeId, user.employeeRefId)),
    orderBy: (model, { desc }) => [desc(model.applicationDate)],
  });
});

export const getLeaves = cache(async (leaveType: string) => {
  const user = await checkUserAuth();

  return await db.query.leaveApplications.findMany({
    columns: {
      leaveNo: true,
      startDate: true,
      endDate: true,
      daysTaken: true,
      resumeDate: true,
      leaveStatus: true,
    },
    where: (model, { eq, and }) =>
      and(
        eq(model.isDeleted, false),
        eq(model.employeeId, user.employeeRefId),
        eq(model.leaveTypeId, +leaveType)
      ),
    orderBy: (model, { desc }) => [desc(model.applicationDate)],
  });
});

export const getLoans = cache(async () => {
  const user = await checkUserAuth();
  const loans = await db.query.staffLoans.findMany({
    columns: {
      id: true,
      loanAmount: true,
      loanDate: true,
      completed: true,
      loanStatus: true,
    },
    where: (model, { eq, and, or }) =>
      and(
        eq(model.employeeId, user.employeeRefId),
        or(eq(model.loanStatus, 'PENDING'), eq(model.loanStatus, 'APPROVED'))
      ),
    with: {
      loanDeductions: { columns: { deductionAmount: true } },
    },
    orderBy: (model, { desc }) => [desc(model.loanDate)],
  });

  return loans.map(loan => ({
    ...loan,
    loanDeductions: loan.loanDeductions.reduce(
      (acc, deduction) => acc + Number(deduction.deductionAmount),
      0
    ),
  }));
});
