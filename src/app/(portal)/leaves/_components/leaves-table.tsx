import React from 'react';
import { getLeaves } from '../leave-application/_services';
import LeaveDatatable from './leave-datatable';

export default async function LeavesTable({
  leaveType,
}: {
  leaveType: string;
}) {
  const leaves = await getLeaves(leaveType);
  return <LeaveDatatable leaves={leaves} />;
}
