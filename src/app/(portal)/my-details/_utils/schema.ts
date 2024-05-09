import { z } from 'zod';

export const employeeSchema = z
  .object({
    surname: z
      .string({ required_error: 'Surname is required' })
      .min(1, 'Surname is required.'),
    otherNames: z
      .string({ required_error: 'Other names are required' })
      .min(1, 'Other names are required'),
    contact: z
      .string({ required_error: 'Provide a phone number.' })
      .min(10, 'Phone number is invalid')
      .max(10, 'Phone number is invalid'),
    dob: z.string({ required_error: 'Date of birth is required.' }),
    maritalStatus: z
      .enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'])
      .optional(),
    idNo: z.string({ required_error: 'ID Number is required.' }),
    image: z.string().optional(),
    alternativeContact: z.string().optional(),
    postalAddress: z.string().optional(),
    postalCode: z.string().optional(),
    gender: z.enum(['MALE', 'FEMALE'], {
      required_error: 'Gender is required.',
    }),
    email: z
      .string({ required_error: 'Email address is required.' })
      .min(1, 'Email address is required')
      .email(),
    kraPin: z.string().min(1, 'Field is required'),
    nhifNo: z.string().min(1, 'Field is required'),
    nssfNo: z.string().min(1, 'Field is required'),

    nok1Name: z.string({ required_error: 'Name of next of kin is required.' }),
    nok1Contact: z.string({
      required_error: 'Provide contact for next of kin.',
    }),
    nok1Relation: z.string({
      required_error: 'Provide relations for next of kin.',
    }),
    nok2Name: z.string().optional(),
    nok2Contact: z.string().optional(),
    nok2Relation: z.string().optional(),
    spouseName: z.string().optional(),
    spouseContact: z.string().optional(),
    children: z.array(
      z.object({ childName: z.string(), dob: z.coerce.date() })
    ),

    countyId: z.string(),
    estate: z.string(),
    allergies: z.boolean().optional(),
    allergyDescription: z.string().optional(),
    illness: z.boolean().optional(),
    illnessDescription: z.string().optional(),
    conviction: z.boolean().optional(),
    convictionDescription: z.string().optional(),
    bloodType: z.enum(['A', 'B', 'AB', 'O']).optional(),
  })
  .superRefine(({ kraPin }, ctx) => {
    if (kraPin.trim().length > 0 && kraPin.trim().length !== 11) {
      ctx.addIssue({
        code: 'custom',
        message: 'Invalid KRA pin provided.',
        path: ['kraPin'],
      });
    }
  });
