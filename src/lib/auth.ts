// import { validateRequest } from '@/auth';

import { validateRequest } from '../../auth';

export async function checkUserAuth() {
  const { user } = await validateRequest();
  if (!user) {
    throw new Error(
      'Unauthorized. You need to be logged in to perform this action.'
    );
  }

  return user;
}
