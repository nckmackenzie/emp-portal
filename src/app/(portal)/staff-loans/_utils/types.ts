import { z } from 'zod';
import { loanSchema } from './schema';

export type TLoanApplication = z.infer<typeof loanSchema>;
