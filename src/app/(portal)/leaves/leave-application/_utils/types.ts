import { z } from 'zod';
import { leaveApplicationSchema } from './schema';
import { getLeaves } from '../_services';

export type TLeaveApplication = z.infer<typeof leaveApplicationSchema>;

export type AppliedLeave = Awaited<
  ReturnType<typeof getLeaves>
> extends (infer U)[]
  ? U
  : never;
