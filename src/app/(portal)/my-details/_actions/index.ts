'use server';

import { eq } from 'drizzle-orm';
import { format } from 'date-fns';

import db from '@/lib/database/db';
import { formatStringForDb } from '@/lib/formatters';
import {
  employeeQualifications,
  employees,
  employeesChildren,
  employeesContacts,
  employeesNoks,
  employeesOtherdetails,
} from '@/migrations/schema';

import { validateRequest } from '../../../../../auth';
import { employeeSchema } from '../_utils/schema';
import { TEmployee } from '../_utils/types';

export const updateDetails = async (values: TEmployee) => {
  const { user } = await validateRequest();
  if (!user)
    return { error: 'You need to be logged in to perform this action.' };

  const validated = employeeSchema.safeParse(values);
  if (!validated.success)
    return { error: 'Ensure you have filled all the details accurately.' };

  const {
    contact,
    kraPin,
    idNo,
    dob,
    email,
    gender,
    nhifNo,
    nssfNo,
    image,
    maritalStatus,
    spouseName,
    spouseContact,
    alternativeContact,
    children,
    nok1Contact,
    nok1Name,
    nok1Relation,
    allergies,
    allergyDescription,
    bloodType,
    conviction,
    convictionDescription,
    illness,
    illnessDescription,
    nok2Contact,
    nok2Name,
    nok2Relation,
    postalAddress,
    postalCode,
    countyId,
    estate,
    ethnicity,
    education,
    nationality,
    passport,
    educationLevel,
    effectiveDate,
    termination,
    terminationDetails,
  } = validated.data;

  const dbIdNo = await db.query.employees.findFirst({
    where: (model, { eq, ne, and }) =>
      and(
        eq(model.idNo, formatStringForDb(idNo)!),
        ne(model.id, user.employeeRefId)
      ),
  });
  const dbContact = await db.query.employeesContacts.findFirst({
    where: (model, { eq, ne, and }) =>
      and(
        eq(model.primaryContact, formatStringForDb(contact)!),
        ne(model.employeeId, user.employeeRefId)
      ),
  });
  const dbKra = await db.query.employeesOtherdetails.findFirst({
    where: (model, { eq, and, ne }) =>
      and(
        eq(model.kraPin, formatStringForDb(kraPin)!),
        ne(model.employeeId, user.employeeRefId)
      ),
  });

  if (dbIdNo) {
    return { error: 'ID Number already exists!' };
  }

  if (dbContact) {
    return { error: 'Contact already exists!' };
  }

  if (dbKra) {
    return { error: 'KRA pin already exists!' };
  }

  const isSuccess = await db.transaction(async tx => {
    const returned = await tx
      .update(employees)
      .set({
        dob: format(new Date(dob), 'yyyy-MM-dd'),
        gender,
        idNo,
        imageUrl: formatStringForDb(image),
        maritalStatus,
        spouseName: formatStringForDb(spouseName),
        spouseContact: formatStringForDb(spouseContact),
        nationality: formatStringForDb(nationality),
        ethnicity: formatStringForDb(ethnicity),
      })
      .where(eq(employees.id, user.employeeRefId))
      .returning();

    const updatedContacts = await tx
      .update(employeesContacts)
      .set({
        primaryContact: contact,
        alternativeContact: formatStringForDb(alternativeContact),
        address: formatStringForDb(postalAddress),
        emailAddress: email,
        postalCode: formatStringForDb(postalCode),
        countyId: countyId ? +countyId : null,
        estate: formatStringForDb(estate),
        passport: formatStringForDb(passport),
      })
      .where(eq(employeesContacts.employeeId, user.employeeRefId))
      .returning();

    const updatedNok = await tx
      .update(employeesNoks)
      .set({
        nameOne: formatStringForDb(nok1Name),
        contactOne: formatStringForDb(nok1Contact),
        relationOne: formatStringForDb(nok1Relation),
        nameTwo: formatStringForDb(nok2Name),
        contactTwo: formatStringForDb(nok2Contact),
        relationTwo: formatStringForDb(nok2Relation),
      })
      .where(eq(employeesNoks.employeeId, user.employeeRefId))
      .returning();

    const updatedOther = await tx
      .update(employeesOtherdetails)
      .set({
        kraPin: formatStringForDb(kraPin),
        nhif: formatStringForDb(nhifNo),
        nssf: formatStringForDb(nssfNo),
        allergies: !!allergies,
        allegryDescription: !!allergies
          ? formatStringForDb(allergyDescription)
          : null,
        illness: !!illness,
        illnessDescription: !!illness
          ? formatStringForDb(illnessDescription)
          : null,
        conviction: !!conviction,
        convictionDescription: !!conviction
          ? formatStringForDb(convictionDescription)
          : null,
        bloodType: bloodType ?? null,
        educationLevel: educationLevel ?? null,
        terminated: !!termination,
        terminationDescription: formatStringForDb(terminationDetails),
        effectiveDate: effectiveDate
          ? format(new Date(effectiveDate), 'yyyy-MM-dd')
          : null,
      })
      .where(eq(employeesOtherdetails.employeeId, user.employeeRefId))
      .returning();

    await tx
      .delete(employeesChildren)
      .where(eq(employeesChildren.employeeId, user.employeeRefId));

    const formattedChildren = children.map(child => ({
      employeeId: user.employeeRefId,
      childName: formatStringForDb(child.childName),
      dob: format(new Date(child.dob), 'yyyy-MM-dd'),
    }));

    formattedChildren.forEach(async child => {
      await tx.insert(employeesChildren).values({
        employeeId: user.employeeRefId,
        childname: child.childName,
        dob: format(new Date(child.dob), 'yyyy-MM-dd'),
      });
    });

    let returnedEducation = true;
    if (education && education.length > 0) {
      const formattedEducation = education.map(education => ({
        id: education.id,
        employeeId: user.employeeRefId,
        qualificationType: education.type,
        from: education.from,
        to: education.to,
        school: education.school,
        attainment: education.attainment,
        specialization: education.specialization,
      }));
      const returned = await tx
        .insert(employeeQualifications)
        .values(formattedEducation)
        .returning({ id: employeeQualifications.id });

      returnedEducation = !!returned.length;
    }

    return (
      //   !!returnedChildren.length &&
      !!updatedOther.length &&
      !!updatedNok.length &&
      !!updatedContacts.length &&
      !!returned &&
      !!returnedEducation
    );
  });

  if (!isSuccess)
    return {
      error:
        'There was a problem updating your details. Retry or contact support.',
    };

  return { error: null };
  //validate kra,id,contact, exists
};
