import { getAppliedLeaves } from '../../leave-application/_services';

export type TLeaveApplication = Awaited<
  ReturnType<typeof getAppliedLeaves>
> extends (infer U)[]
  ? U
  : never;
