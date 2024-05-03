import { cache } from 'react';

import db from '@/lib/database/db';

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
