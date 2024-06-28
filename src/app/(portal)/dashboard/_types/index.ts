import { getAppliedLeaves } from '../../leaves/leave-application/_services';

export type TLeaveApplication = Awaited<
  ReturnType<typeof getAppliedLeaves>
> extends (infer U)[]
  ? U
  : never;
