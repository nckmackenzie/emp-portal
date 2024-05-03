import { z } from 'zod';

export const leaveApplicationSchema = z
  .object({
    leaveRef: z.coerce.number({ required_error: 'Leave ref missing.' }),
    applicationDate: z.coerce.date({
      required_error: 'Application date is required.',
    }),
    employeeCategory: z.enum(['UNIONISABLE', 'MANAGEMENT', 'NON-UNIONISABLE'], {
      required_error: 'Select category',
    }),
    employeeId: z.coerce.number({ required_error: 'Employee is required.' }),
    startDate: z.coerce.date({
      required_error: 'Select start date for this leave.',
    }),
    endDate: z.coerce.date({
      required_error: 'Select end date for this leave.',
    }),
    leaveType: z.string({ required_error: 'Select leave type.' }),
    reason: z.string({
      required_error: 'Enter reason for applying for leave.',
    }),
    resumeDate: z.coerce.date({ required_error: 'Enter resumption date.' }),
    hasHalfDay: z.boolean().default(false).optional(),
    attachment: z.string().optional(),
  })
  .superRefine(
    (
      {
        applicationDate,
        startDate,
        endDate,
        resumeDate,
        leaveType,
        attachment,
      },
      ctx
    ) => {
      if (startDate < applicationDate) {
        ctx.addIssue({
          code: 'custom',
          message: 'Start date cannot be earlier than current date.',
          path: ['startDate'],
        });
      }
      if (startDate > endDate) {
        ctx.addIssue({
          code: 'custom',
          message: 'End date cannot be earlier than start date.',
          path: ['endDate'],
        });
      }
      if (resumeDate < endDate) {
        ctx.addIssue({
          code: 'custom',
          message: 'Cannot resume earlier than leave end date.',
          path: ['resumeDate'],
        });
      }
      if (leaveType === '3' && !attachment) {
        ctx.addIssue({
          code: 'custom',
          message: 'An attachment is required for this leave.',
          path: ['leaveType'],
        });
      }
    }
  );
