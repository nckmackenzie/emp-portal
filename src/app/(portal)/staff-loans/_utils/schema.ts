import { z } from 'zod';

export const loanSchema = z.object({
  amount: z.coerce
    .number({ required_error: 'Amount is required' })
    .min(1, 'Amount is required'),
  duration: z.coerce
    .number({ required_error: 'Duration is required' })
    .min(1, 'Duration is required'),
  reason: z.string().min(1, 'Reason is required'),
  deduction: z.coerce
    .number({ required_error: 'Deduction is required' })
    .min(1, 'Deduction is required'),
});
