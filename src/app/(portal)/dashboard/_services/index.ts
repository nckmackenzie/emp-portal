import { cache } from 'react';
import { redirect } from 'next/navigation';

import db from '@/lib/database/db';
import { validateRequest } from '../../../../../auth';
import { checkUserAuth } from '@/lib/auth';

export const getCummulatedDays = async () => {
  const user = await checkUserAuth();

  const employeeType = await db.query.employees.findFirst({
    columns: { employeeCategory: true },
    where: (model, { eq }) => eq(model.id, user.employeeRefId),
  });
  const daysAssigned = await db.query.leaveTypes.findFirst({
    columns: { allocationManagement: true, allocationWorkshop: true },
  });
  if (!employeeType) throw new Error('Please log in again to continue');

  const assignedDays =
    employeeType.employeeCategory === 'WORKFLOOR'
      ? daysAssigned?.allocationWorkshop!
      : daysAssigned?.allocationManagement!;
  const fullMonthDays = +assignedDays / 12;
  const halfMonthDays = +assignedDays / 12 / 2;
  const previousFullMonthDays = new Date().getMonth() * fullMonthDays;
  const currentMonthDays =
    new Date().getDate() >= 15 ? fullMonthDays : halfMonthDays;
  const cummulatedDays = previousFullMonthDays + currentMonthDays;
  return cummulatedDays;
};

export const getDaysTaken = cache(async () => {
  const user = await checkUserAuth();
  const daysTaken = await db.query.leaveApplications
    .findMany({
      where: (model, { and, eq }) =>
        and(
          eq(model.employeeId, user.employeeRefId),
          eq(model.isDeleted, false),
          eq(model.leaveStatus, 'APPROVED'),
          eq(model.leaveTypeId, 1)
        ),
      columns: { daysTaken: true },
    })
    .then(data => data.reduce((a, b) => a + Number(b.daysTaken), 0));

  return daysTaken;
});
