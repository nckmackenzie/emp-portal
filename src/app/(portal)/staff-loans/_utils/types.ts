import { z } from 'zod';
import { loanSchema } from './schema';
import { getLoans } from '../../leaves/leave-application/_services';

export type TLoanApplication = z.infer<typeof loanSchema>;

export type Loan = Awaited<
  ReturnType<typeof getLoans>
> extends (infer U)[]
  ? U
  : never;


