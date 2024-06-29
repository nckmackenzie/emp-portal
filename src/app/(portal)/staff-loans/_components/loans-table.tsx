import LoansDatatable from './loans-datatable';

import { getLoans } from '../../leaves/leave-application/_services';

export default async function LoansTable() {
  const loans = await getLoans();
  return <LoansDatatable loans={loans} />;
}
