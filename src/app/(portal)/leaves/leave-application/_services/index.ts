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