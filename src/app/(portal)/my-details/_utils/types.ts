import { z } from 'zod';

import { employeeSchema } from './schema';
import {
  getEmployeeChildren,
  getEmployeeDetails,
  getEmployeeNok,
} from '../_services';

export type TFetchedEmployee = Awaited<ReturnType<typeof getEmployeeDetails>>;
export type TFetchedEmployeeNok = Awaited<ReturnType<typeof getEmployeeNok>>;

export type TFetchedEmployeeChildren = Awaited<
  ReturnType<typeof getEmployeeChildren>
>;

export type TEmployee = z.infer<typeof employeeSchema>;
export type MaritalStatus = 'WIDOWED' | 'DIVORCED' | 'MARRIED' | 'SINGLE';
