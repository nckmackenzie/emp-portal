import { getAttendance } from '../service';

export type AttendanceSummaryResult = {
  total_hours: number;
  late_arrivals: number;
  early_departures: number;
  lost_hours: number;
};

export type Attendance = Awaited<
  ReturnType<typeof getAttendance>
> extends (infer T)[]
  ? T
  : never;
