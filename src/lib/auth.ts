// import { validateRequest } from '@/auth';

import { redirect } from 'next/navigation';
import { validateRequest } from '../../auth';

export async function checkUserAuth() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect('/login');
  }

  return user;
}
