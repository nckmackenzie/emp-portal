import { z } from 'zod';

export const employeeSchema = z.object({
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
  dob: z.string().optional(),
  maritalStatus: z
    .enum(['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED'])
    .optional(),
  idNo: z.string().optional(),
  payrollNo: z.string().optional(),
  alternativeContact: z.string().optional(),
  postalAddress: z.string().optional(),
  postalCode: z.string().optional(),
  gender: z.enum(['MALE', 'FEMALE'], {
    required_error: 'Gender is required.',
  }),
  email: z.string().optional(),
  kraPin: z.string().optional(),
  nhifNo: z.string().optional(),
  nssfNo: z.string().optional(),

  nok1Name: z.string().optional(),
  nok1Contact: z.string().optional(),
  nok1Relation: z.string().optional(),
  nok2Name: z.string().optional(),
  nok2Contact: z.string().optional(),
  nok2Relation: z.string().optional(),
  spouseName: z.string().optional(),
  spouseContact: z.string().optional(),
  children: z.array(z.object({ childName: z.string(), dob: z.coerce.date() })),

  allergies: z.boolean().optional(),
  allergyDescription: z.string().optional(),
  illness: z.boolean().optional(),
  illnessDescription: z.string().optional(),
  conviction: z.boolean().optional(),
  convictionDescription: z.string().optional(),
  bloodType: z.enum(['A', 'B', 'AB', 'O']).optional(),
});
