export type TLeaveApplication = {
  AppliedDate: Date;
  FromDate: Date;
  ToDate: Date;
  NumberOfDays: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
};
