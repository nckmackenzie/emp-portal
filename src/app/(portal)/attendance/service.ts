import { cache } from 'react';
import { sql } from 'drizzle-orm';

import { checkUserAuth } from '@/lib/auth';
import db from '@/lib/database/db';
import { type AttendanceSummaryResult } from './_components/types';

export const getAttendanceSummary = cache(async (from: string, to: string) => {
  const user = await checkUserAuth();
  const stmt = sql`SELECT * FROM get_individual_attendance_report(${from}, ${to}, ${user.employeeRefId});`;
  const res: AttendanceSummaryResult[] = await db.execute(stmt);

  return res.map(row => ({
    totalHours: row.total_hours,
    lateArrivals: row.late_arrivals,
    earlyDepatures: row.early_departures,
    lostHours: row.lost_hours,
  }));
});

export const getAttendance = cache(async (fromDate: string, toDate: string) => {
  const user = await checkUserAuth();

  const staff = await db.query.employees.findFirst({
    columns: { attendanceId: true },
    where: (model, { eq }) => eq(model.id, user.employeeRefId),
  });
  if (!staff || !staff.attendanceId) throw new Error('No attendance id found');

  return await db.query.attendances.findMany({
    where: (model, { eq, and, lte, gte }) =>
      and(
        eq(model.employeeId, staff.attendanceId as number),
        gte(model.attendanceDate, fromDate),
        lte(model.attendanceDate, toDate)
      ),
  });
});
