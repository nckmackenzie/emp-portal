import { z } from 'zod';
import { leaveApplicationSchema } from './schema';

export type TLeaveApplication = z.infer<typeof leaveApplicationSchema>;
