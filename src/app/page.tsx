import React from 'react';
import { validateRequest } from '../../auth';
import { redirect } from 'next/navigation';

export default async function page() {
  const { user } = await validateRequest();
  if (!user) return redirect('/login');
  return redirect('/dashboard');
}
