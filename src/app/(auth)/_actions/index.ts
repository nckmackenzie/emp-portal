'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { compare, hash } from 'bcrypt-ts';
import { createId, isCuid } from '@paralleldrive/cuid2';
import { eq } from 'drizzle-orm';

import { lucia, validateRequest } from '../../../../auth';
import db from '@/lib/database/db';
import { TLogin } from '../_types';
import { changePasswordSchema, loginSchema } from '../_utils/schema';
import { employeeUsers } from '@/migrations/schema';
import { EMPLOYEECATEGORY } from '../../../..';

export const login = async (values: TLogin) => {
  const validated = loginSchema.safeParse(values);
  const token = createId();

  if (!validated.success) return { error: 'Invalid data passed.' };

  const { contact, password } = validated.data;

  const user = await db.query.employeeUsers.findFirst({
    where: (model, { eq }) => eq(model.contact, contact),
  });

  if (!user) {
    const emp = await db.query.employeesContacts.findFirst({
      columns: { employeeId: true, emailAddress: true },
      where: (model, { eq }) => eq(model.primaryContact, contact),
    });

    if (!emp) {
      return { error: 'Invalid contact or password!' };
    }

    const details = await db.query.employees.findFirst({
      columns: {
        id: true,
        idNo: true,
        otherNames: true,
        employeeCategory: true,
        imageUrl: true,
      },
      where: (model, { eq }) => eq(model.id, emp.employeeId),
    });

    if (password !== details?.idNo)
      return { error: 'Invalid contact or password!' };

    const createdUser = await db
      .insert(employeeUsers)
      .values({
        contact,
        name: details?.otherNames.toLowerCase() as string,
        employeeRefId: emp.employeeId,
        idNumber: details?.idNo as string,
        employeeType: details?.employeeCategory as EMPLOYEECATEGORY,
        email: emp.emailAddress,
        image: details?.imageUrl,
        resetToken: token,
      })
      .returning({ id: employeeUsers.id });

    if (createdUser.length === 0)
      return { error: 'An error occured. Please try again.' };

    redirect(`/change-password?stage=first-time&resetToken=${token}`);
  }

  if (!user.active)
    return { error: 'This account is currently deactivated.Contact support' };

  if (user.password === null && password !== user.idNumber) {
    return { error: 'Invalid contact or password!' };
  } else if (user.password === null && password === user.idNumber) {
    await db.update(employeeUsers).set({ resetToken: token });
    return redirect(`/change-password?stage=first-time&resetToken=${token}`);
  }

  const passwordMatches = await compare(password, user.password!);
  if (!passwordMatches) return { error: 'Invalid contact or password!' };

  const session = await lucia.createSession(user.id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect('/dashboard');
};

export const changePassword = async (passwords: any, token: string) => {
  const validated = changePasswordSchema.safeParse(passwords);

  if (!validated.success)
    return {
      error:
        'Invalid data password. Ensure your passwords are corrently entered.',
    };

  if (!isCuid(token)) return { error: 'Invalid reset token entered.' };

  const { password } = validated.data;

  const user = await db.query.employeeUsers.findFirst({
    columns: { id: true, name: true, employeeType: true, image: true },
    where: (user, { eq }) => eq(user.resetToken, token),
  });

  if (!user) return { error: 'Invalid reset token passed' };

  const hashedPassword = await hash(password, 10);

  const returned: { id: string }[] = await db
    .update(employeeUsers)
    .set({
      resetToken: null,
      password: hashedPassword,
      promptPasswordChange: false,
    })
    .where(eq(employeeUsers.id, user.id))
    .returning({ id: employeeUsers.id });

  if (!returned.length)
    return {
      error:
        'Something went wrong while changing your password. Contact support',
    };

  const session = await lucia.createSession(user.id, {
    name: user.name,
    employeeType: user.employeeType as
      | 'NON-UNIONISABLE'
      | 'MANEGEMENT'
      | 'UNIONISABLE'
      | 'WORKFLOOR'
      | 'CONTRACTOR',
    image: user.image,
  });
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return redirect('/dashboard');
};

export const logout = async () => {
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: 'Unauthorized',
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect('/login');
};
