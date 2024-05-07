import { cache } from 'react';

import db from '@/lib/database/db';

export const getEmployeeDetails = cache(async (userId: number) => {
  return await db.query.employees.findFirst({
    columns: {
      surname: true,
      otherNames: true,
      dob: true,
      gender: true,
      idNo: true,
      imageUrl: true,
      maritalStatus: true,
      spouseContact: true,
      spouseName: true,
    },
    where: (model, { eq }) => eq(model.id, userId),
    with: {
      contact: true,
      otherDetails: true,
    },
  });
});

export const getEmployeeNok = cache(async (userId: number) => {
  return await db.query.employeesNoks.findFirst({
    where: (model, { eq }) => eq(model.employeeId, userId),
  });
});

export const getEmployeeChildren = cache(async (userId: number) => {
  return await db.query.employeesChildren.findMany({
    where: (model, { eq }) => eq(model.employeeId, userId),
  });
});
