import {
  pgTable,
  pgEnum,
  serial,
  varchar,
  integer,
  foreignKey,
  text,
  uuid,
  timestamp,
  index,
  boolean,
  bigint,
  unique,
  date,
  numeric,
  uniqueIndex,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';

export const keyStatus = pgEnum('key_status', [
  'default',
  'valid',
  'invalid',
  'expired',
]);
export const keyType = pgEnum('key_type', [
  'aead-ietf',
  'aead-det',
  'hmacsha512',
  'hmacsha256',
  'auth',
  'shorthash',
  'generichash',
  'kdf',
  'secretbox',
  'secretstream',
  'stream_xchacha20',
]);
export const aalLevel = pgEnum('aal_level', ['aal1', 'aal2', 'aal3']);
export const factorType = pgEnum('factor_type', ['totp', 'webauthn']);
export const factorStatus = pgEnum('factor_status', ['unverified', 'verified']);
export const codeChallengeMethod = pgEnum('code_challenge_method', [
  's256',
  'plain',
]);
export const userRoleEnum = pgEnum('userRoleEnum', [
  'SUPER ADMIN',
  'ADMIN',
  'STANDARD USER',
]);
export const discountTypeEnum = pgEnum('discountTypeEnum', [
  'AMOUNT',
  'PERCENTAGE',
  'NONE',
]);
export const vatTypeEnum = pgEnum('vatTypeEnum', [
  'INCLUSIVE',
  'EXCLUSIVE',
  'NONE',
]);
export const stockMovementTypeEnum = pgEnum('stockMovementTypeEnum', [
  'OPENING_BAL',
  'CONVERSION_OUT',
  'CONVERSION_IN',
  'CONVERSION',
  'TRANSFER',
  'ISSUE',
  'GRN',
]);
export const employeeCategory = pgEnum('employeeCategory', [
  'CONTRACTOR',
  'WORKFLOOR',
  'NON-UNIONISABLE',
  'MANAGEMENT',
  'UNIONISABLE',
]);
export const employeeStatus = pgEnum('employeeStatus', [
  'RETIRED',
  'RESIGNED',
  'TERMINATED',
  'ACTIVE',
]);
export const employmentType = pgEnum('employmentType', [
  'NO CONTRACT',
  'INTERN',
  'CASUAL',
  'CONTRACT',
  'PERMANENT',
]);
export const genderEnum = pgEnum('genderEnum', ['FEMALE', 'MALE']);
export const maritalStatusEnum = pgEnum('maritalStatusEnum', [
  'WIDOWED',
  'DIVORCED',
  'MARRIED',
  'SINGLE',
]);
export const bloodTypeEnum = pgEnum('bloodTypeEnum', ['O', 'AB', 'B', 'A']);
export const leaveStatusEnum = pgEnum('leaveStatusEnum', [
  'REJECTED',
  'APPROVED',
  'PENDING',
]);
export const appraisalStatusEnum = pgEnum('appraisalStatusEnum', [
  'FILLED',
  'COMPLETED',
  'CONDUCTED',
  'STAFF FILLED',
  'PENDING',
  'NOT SET',
]);
export const disciplinaryCaseActionEnum = pgEnum('disciplinaryCaseActionEnum', [
  'OTHER',
  'TERMINATION',
  'SUSPENSION',
  'SURCHARGE',
  'WRITTEN-WARNING',
  'VERBAL-WARNING',
]);
export const disciplinaryCaseStatusEnum = pgEnum('disciplinaryCaseStatusEnum', [
  'CLOSED',
  'RESOLVED',
  'UNDER-INVESTIGATION',
  'REPORTED',
]);
export const healthSafetyInjuryEnum = pgEnum('healthSafetyInjuryEnum', [
  'MAJOR',
  'MINOR',
  'CLOSED',
  'REJECTED',
  'PENDING',
  'NOT-FILED',
]);
export const healthSafetyStatusEnum = pgEnum('healthSafetyStatusEnum', [
  'CLOSED',
  'REJECTED',
  'PENDING',
  'NOT-FILED',
]);
export const educationLevelEnum = pgEnum('educationLevelEnum', [
  'NONE',
  'PRIMARY',
  'SECONDARY',
  'CERTIFICATE',
  'DIPLOMA',
  'HIGHER-DIPLOMA',
  'BACHELORS-DEGREE',
  'MASTERS-DEGREE',
  'PHD',
]);
export const educationTypeEnum = pgEnum('educationTypeEnum', [
  'professional',
  'academic',
]);
export const workfloorType = pgEnum('workfloorType', [
  'NON-UNIONISABLE',
  'UNIONISABLE',
]);

export const forms = pgTable('forms', {
  id: serial('id').primaryKey().notNull(),
  formName: varchar('form_name', { length: 100 }).notNull(),
  module: varchar('module').notNull(),
  moduleId: integer('module_id').notNull(),
  path: varchar('path').notNull(),
  menuOrder: integer('menu_order').notNull(),
});

export const session = pgTable('session', {
  id: text('id').primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'string',
  }).notNull(),
});

export const uoms = pgTable('uoms', {
  id: serial('id').primaryKey().notNull(),
  uom: varchar('uom').notNull(),
  abbreviation: varchar('abbreviation', { length: 50 }).notNull(),
});

export const vats = pgTable('vats', {
  id: serial('id').primaryKey().notNull(),
  value: integer('value').notNull(),
  vatName: varchar('vat_name', { length: 20 }).notNull(),
});

export const vendors = pgTable(
  'vendors',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    vendorName: text('vendor_name').notNull(),
    contact: varchar('contact', { length: 20 }),
    kraPin: varchar('kra_pin', { length: 50 }),
    address: text('address'),
    email: varchar('email'),
    contactPerson: varchar('contact_person'),
    active: boolean('active').default(true),
  },
  table => {
    return {
      vendorNameIdx: index('vendor_name_idx').on(table.vendorName),
    };
  }
);

export const productCategories = pgTable('product_categories', {
  id: serial('id').primaryKey().notNull(),
  categoryName: varchar('category_name').notNull(),
  active: boolean('active').default(true),
});

export const projects = pgTable(
  'projects',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    projectName: varchar('project_name').notNull(),
    active: boolean('active').default(true),
    createdAt: timestamp('created_at', { mode: 'string' }).defaultNow(),
  },
  table => {
    return {
      projectNameIdx: index('project_name_idx').on(table.projectName),
    };
  }
);

export const mrqHeaders = pgTable('mrq_headers', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  reference: text('reference').notNull(),
  documentDate: timestamp('document_date', { mode: 'string' }).notNull(),
  linked: boolean('linked').default(false).notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  createdOn: timestamp('created_on', { mode: 'string' }).defaultNow().notNull(),
  isDeleted: boolean('is_deleted').default(false).notNull(),
});

export const ordersHeader = pgTable(
  'orders_header',
  {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
    reference: text('reference').notNull(),
    documentDate: date('document_date').notNull(),
    vendorId: uuid('vendor_id')
      .notNull()
      .references(() => vendors.id, { onDelete: 'cascade' }),
    billNo: varchar('bill_no'),
    mrqId: integer('mrq_id').references(() => mrqHeaders.id, {
      onDelete: 'cascade',
    }),
    billDate: date('bill_date'),
    createdBy: uuid('created_by')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdOn: timestamp('created_on', { mode: 'string' })
      .defaultNow()
      .notNull(),
    isDeleted: boolean('is_deleted').default(false),
    vatType: vatTypeEnum('vat_type').default('NONE').notNull(),
    vatId: integer('vat_id').references(() => vats.id, { onDelete: 'cascade' }),
  },
  table => {
    return {
      ordersHeaderReferenceUnique: unique('orders_header_reference_unique').on(
        table.reference
      ),
    };
  }
);

export const grnsDetails = pgTable('grns_details', {
  id: uuid('id').defaultRandom().notNull(),
  headerId: integer('header_id')
    .notNull()
    .references(() => grnsHeader.id),
  itemId: uuid('item_id')
    .notNull()
    .references(() => products.id),
  qty: integer('qty').notNull(),
  rate: numeric('rate').notNull(),
  remarks: text('remarks'),
});

export const grnsHeader = pgTable('grns_header', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  receiptDate: date('receipt_date').defaultNow().notNull(),
  invoiceNo: varchar('invoice_no'),
  vendorId: uuid('vendor_id').references(() => vendors.id),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  createdOn: date('created_on').defaultNow(),
  isDeleted: boolean('is_deleted').default(false),
});

export const departments = pgTable('departments', {
  id: serial('id').primaryKey().notNull(),
  departmentName: varchar('department_name').notNull(),
  isProduction: boolean('is_production').default(true).notNull(),
  productionFlow: integer('production_flow'),
});

export const materialIssuesHeader = pgTable(
  'material_issues_header',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    issueNo: integer('issue_no').notNull(),
    issueDate: date('issue_date').defaultNow().notNull(),
    staffName: varchar('staff_name'),
    jobcardNo: varchar('jobcard_no', { length: 6 }),
    text: text('text'),
    issuedBy: uuid('issued_by')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    createdOn: date('created_on').defaultNow().notNull(),
    isDeleted: boolean('is_deleted').default(false).notNull(),
  },
  table => {
    return {
      materialIssuesHeaderIssueNoUnique: unique(
        'material_issues_header_issue_no_unique'
      ).on(table.issueNo),
    };
  }
);

export const stockMovements = pgTable('stock_movements', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  transactionDate: date('transaction_date').defaultNow().notNull(),
  itemId: uuid('item_id')
    .notNull()
    .references(() => products.id),
  qty: numeric('qty').notNull(),
  transactionType: stockMovementTypeEnum('transaction_type').notNull(),
  transactionId: text('transaction_id').notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  createdOn: date('created_on').defaultNow(),
  remarks: text('remarks'),
  isDeleted: boolean('is_deleted').default(false),
});

export const conversions = pgTable('conversions', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  conversionDate: date('conversion_date').defaultNow().notNull(),
  convertingItem: uuid('converting_item')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  convertingQuantity: numeric('converting_quantity').notNull(),
  convertedItem: uuid('converted_item')
    .notNull()
    .references(() => products.id, { onDelete: 'cascade' }),
  convertedQuantity: numeric('converted_quantity').notNull(),
});

export const users = pgTable(
  'users',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    contact: varchar('contact', { length: 10 }).notNull(),
    password: text('password').notNull(),
    userType: userRoleEnum('user_type').default('STANDARD USER').notNull(),
    contactVerified: timestamp('contact_verified', { mode: 'string' }),
    email: text('email'),
    image: text('image'),
    defaultMenu: varchar('default_menu'),
    active: boolean('active').default(true).notNull(),
    role: integer('role').references(() => roles.id, { onDelete: 'cascade' }),
    promptPasswordChange: boolean('prompt_password_change').default(false),
    resetToken: text('reset_token'),
  },
  table => {
    return {
      contactIdx: uniqueIndex('contact_idx').on(table.contact),
      userNameIdx: index('user_name_idx').on(table.name),
      usersContactUnique: unique('users_contact_unique').on(table.contact),
      usersEmailUnique: unique('users_email_unique').on(table.email),
    };
  }
);

export const roles = pgTable('roles', {
  id: serial('id').primaryKey().notNull(),
  role: varchar('role').notNull(),
  menuName: varchar('menu_name').notNull(),
});

export const mrqDetails = pgTable(
  'mrq_details',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    headerId: integer('header_id')
      .notNull()
      .references(() => mrqHeaders.id, { onDelete: 'cascade' }),
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    requestId: bigint('request_id', { mode: 'number' }).notNull(),
    projectId: uuid('project_id')
      .notNull()
      .references(() => projects.id, { onDelete: 'cascade' }),
    itemId: uuid('item_id').references(() => products.id, {
      onDelete: 'cascade',
    }),
    unitId: integer('unit_id')
      .notNull()
      .references(() => uoms.id, { onDelete: 'cascade' }),
    qty: numeric('qty').notNull(),
    remarks: varchar('remarks'),
    linked: boolean('linked').default(false).notNull(),
    serviceId: uuid('service_id').references(() => services.id, {
      onDelete: 'cascade',
    }),
  },
  table => {
    return {
      mrqDetailsRequestIdUnique: unique('mrq_details_request_id_unique').on(
        table.requestId
      ),
    };
  }
);

export const services = pgTable('services', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  serviceName: varchar('service_name').notNull(),
  active: boolean('active').default(true).notNull(),
  serviceFee: integer('service_fee').default(0).notNull(),
});

export const tempDebtors = pgTable(
  'temp_debtors',
  {
    id: text('id').primaryKey().notNull(),
    debtorsName: varchar('debtors_name', { length: 150 }).notNull(),
    email: varchar('email').notNull(),
    contact: varchar('contact'),
    debtAmount: numeric('debt_amount').notNull(),
  },
  table => {
    return {
      tempDebtorsEmailUnique: unique('temp_debtors_email_unique').on(
        table.email
      ),
      tempDebtorsContactUnique: unique('temp_debtors_contact_unique').on(
        table.contact
      ),
    };
  }
);

export const employeesContacts = pgTable('employees_contacts', {
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id, { onDelete: 'cascade' }),
  primaryContact: varchar('primary_contact', { length: 15 }),
  alternativeContact: varchar('alternative_contact'),
  address: varchar('address'),
  postalCode: varchar('postal_code', { length: 5 }),
  estate: varchar('estate'),
  street: varchar('street'),
  countyId: integer('county_id').references(() => counties.id, {
    onDelete: 'restrict',
  }),
  district: varchar('district'),
  location: varchar('location'),
  village: varchar('village'),
  emailAddress: varchar('email_address', { length: 255 }),
  passport: varchar('passport'),
});

export const designations = pgTable('designations', {
  id: integer('id').primaryKey().notNull(),
  designationName: varchar('designation_name', { length: 150 }).notNull(),
  active: boolean('active').default(true).notNull(),
});

export const employeesChildren = pgTable('employees_children', {
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id, { onDelete: 'cascade' }),
  childname: varchar('childname'),
  dob: date('dob'),
});

export const employees = pgTable(
  'employees',
  {
    id: integer('id').primaryKey().notNull(),
    reference: uuid('reference').defaultRandom().notNull(),
    surname: varchar('surname', { length: 255 }).notNull(),
    otherNames: varchar('other_names').notNull(),
    gender: genderEnum('gender').notNull(),
    dob: date('dob').notNull(),
    maritalStatus: maritalStatusEnum('marital_status'),
    idNo: varchar('id_no', { length: 15 }),
    payrollNo: varchar('payroll_no', { length: 6 }),
    department: integer('department')
      .notNull()
      .references(() => departments.id, { onDelete: 'restrict' }),
    designation: integer('designation')
      .notNull()
      .references(() => designations.id, { onDelete: 'restrict' }),
    employmentType: employmentType('employment_type'),
    contractDate: date('contract_date').defaultNow(),
    joiningDate: date('joining_date').defaultNow(),
    contractDuration: integer('contract_duration').default(0).notNull(),
    expiryDate: date('expiry_date'),
    employeeCategory: employeeCategory('employee_category').notNull(),
    spouseName: varchar('spouse_name', { length: 255 }),
    spouseContact: varchar('spouse_contact', { length: 15 }),
    employeeStatus: employeeStatus('employee_status')
      .default('ACTIVE')
      .notNull(),
    imageUrl: text('image_url'),
    remarks: text('remarks'),
    isNew: boolean('is_new').default(true).notNull(),
    nationality: varchar('nationality', { length: 100 }),
    ethnicity: varchar('ethnicity', { length: 100 }),
    workfloorType: workfloorType('workfloor_type'),
  },
  table => {
    return {
      employeeSurnameIdx: index('employee_surname_idx').on(table.surname),
      employeeOthernamesIdx: index('employee_othernames_idx').on(
        table.otherNames
      ),
    };
  }
);

export const employeesNoks = pgTable('employees_noks', {
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id, { onDelete: 'cascade' }),
  nameOne: varchar('name_one'),
  relationOne: varchar('relation_one'),
  contactOne: varchar('contact_one', { length: 15 }),
  nameTwo: varchar('name_two'),
  relationTwo: varchar('relation_two'),
  contactTwo: varchar('contact_two', { length: 15 }),
});

export const counties = pgTable('counties', {
  id: integer('id').primaryKey().notNull(),
  county: varchar('county').notNull(),
});

export const products = pgTable(
  'products',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    productName: varchar('product_name').notNull(),
    categoryId: integer('category_id')
      .notNull()
      .references(() => productCategories.id),
    uomId: integer('uom_id').references(() => uoms.id),
    buyingPrice: numeric('buying_price'),
    active: boolean('active').default(true),
    stockItem: boolean('stock_item').default(true),
    isPeace: boolean('is_peace').default(false).notNull(),
  },
  table => {
    return {
      productNameIdx: index('product_name_idx').on(table.productName),
    };
  }
);

export const employeesOtherdetails = pgTable('employees_otherdetails', {
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id, { onDelete: 'cascade' }),
  nhif: varchar('nhif'),
  nssf: varchar('nssf'),
  kraPin: varchar('kra_pin'),
  allergies: boolean('allergies').default(false).notNull(),
  allegryDescription: varchar('allegry_description'),
  illness: boolean('illness').default(false).notNull(),
  illnessDescription: varchar('illness_description'),
  conviction: boolean('conviction').default(false).notNull(),
  convictionDescription: varchar('conviction_description'),
  bloodType: bloodTypeEnum('blood_type'),
  educationLevel: educationLevelEnum('education_level'),
});

export const ordersDetails = pgTable('orders_details', {
  id: uuid('id').defaultRandom().primaryKey().notNull(),
  headerId: integer('header_id')
    .notNull()
    .references(() => ordersHeader.id, { onDelete: 'cascade' }),
  projectId: uuid('project_id')
    .notNull()
    .references(() => projects.id, { onDelete: 'cascade' }),
  itemId: uuid('item_id').references(() => products.id, {
    onDelete: 'cascade',
  }),
  qty: numeric('qty').notNull(),
  rate: numeric('rate').notNull(),
  discountType: discountTypeEnum('discount_type').default('NONE').notNull(),
  discount: numeric('discount').notNull(),
  discountedAmount: numeric('discounted_amount').notNull(),
  vatType: vatTypeEnum('vat_type'),
  vatId: integer('vat_id').references(() => vats.id, { onDelete: 'cascade' }),
  amountExclusive: numeric('amount_exclusive').notNull(),
  vat: numeric('vat').notNull(),
  amountInclusive: numeric('amount_inclusive').notNull(),
  received: boolean('received').default(false),
  serviceId: uuid('service_id').references(() => services.id, {
    onDelete: 'cascade',
  }),
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  requestId: bigint('request_id', { mode: 'number' }),
});

export const employeeSession = pgTable('employee_session', {
  id: text('id').primaryKey().notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => employeeUsers.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at', {
    withTimezone: true,
    mode: 'date',
  }).notNull(),
});

export const employeeUsers = pgTable(
  'employee_users',
  {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    name: text('name').notNull(),
    contact: varchar('contact', { length: 10 }).notNull(),
    password: text('password'),
    employeeType: employeeCategory('employee_type')
      .default('MANAGEMENT')
      .notNull(),
    email: text('email'),
    image: text('image'),
    active: boolean('active').default(true).notNull(),
    promptPasswordChange: boolean('prompt_password_change').default(false),
    resetToken: text('reset_token'),
    employeeRefId: integer('employee_ref_id').notNull(),
    idNumber: text('id_number').notNull(),
  },
  table => {
    return {
      employeeUserContactIdx: uniqueIndex('employee_user_contact_idx').on(
        table.contact
      ),
      employeeUserNameIdx: index('employee_user_name_idx').on(table.name),
      employeeUserIdNumberIdx: uniqueIndex('employee_user_id_number_idx').on(
        table.idNumber
      ),
      employeeUsersContactUnique: unique('employee_users_contact_unique').on(
        table.contact
      ),
      employeeUsersEmailUnique: unique('employee_users_email_unique').on(
        table.email
      ),
    };
  }
);

export const contractExtensions = pgTable('contract_extensions', {
  id: text('id').primaryKey().notNull(),
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id),
  oldExpiryDate: date('old_expiry_date').notNull(),
  extensionDuration: numeric('extension_duration').notNull(),
  newExpiryDate: date('new_expiry_date').notNull(),
  remarks: text('remarks'),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  createdDate: date('created_date').defaultNow().notNull(),
});

export const leaveTypes = pgTable('leave_types', {
  id: integer('id').primaryKey().notNull(),
  leaveTypeName: varchar('leave_type_name').notNull(),
  allocationManagement: numeric('allocation_management').notNull(),
  allocationWorkshop: numeric('allocation_workshop').notNull(),
  isPaidLeave: boolean('is_paid_leave').notNull(),
  requiresAttachment: boolean('requires_attachment').default(false).notNull(),
});

export const leaveApplications = pgTable('leave_applications', {
  leaveNo: integer('leave_no').primaryKey().notNull(),
  employeeCategory: employeeCategory('employee_category').notNull(),
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id, { onDelete: 'cascade' }),
  leaveTypeId: integer('leave_type_id')
    .notNull()
    .references(() => leaveTypes.id, { onDelete: 'cascade' }),
  applicationDate: date('application_date').defaultNow().notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  resumeDate: date('resume_date').notNull(),
  daysTaken: numeric('days_taken').notNull(),
  leaveStatus: leaveStatusEnum('leave_status').default('PENDING').notNull(),
  reason: text('reason'),
  authorizedBy: uuid('authorized_by').references(() => users.id),
  approvedBy: uuid('approved_by').references(() => users.id),
  isUnpaid: boolean('is_unpaid').default(false),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  attachmentUrl: text('attachment_url'),
});

export const kpis = pgTable('kpis', {
  id: text('id').primaryKey().notNull(),
  kpi: text('kpi').notNull(),
  designationId: integer('designation_id').references(() => designations.id),
});

export const calendarYears = pgTable('calendar_years', {
  id: integer('id').primaryKey().notNull(),
  yearName: varchar('year_name', { length: 20 }).notNull(),
});

export const staffObjectivesDetails = pgTable('staff_objectives_details', {
  id: text('id').primaryKey().notNull(),
  headerId: integer('header_id')
    .notNull()
    .references(() => staffObjectivesHeader.id),
  kpiId: text('kpi_id')
    .notNull()
    .references(() => kpis.id),
  objective: text('objective').notNull(),
});

export const staffObjectivesHeader = pgTable('staff_objectives_header', {
  id: serial('id').primaryKey().notNull(),
  staffId: integer('staff_id')
    .notNull()
    .references(() => employees.id),
  yearId: integer('year_id')
    .notNull()
    .references(() => calendarYears.id),
});

export const appraisalHeader = pgTable('appraisal_header', {
  id: serial('id').primaryKey().notNull(),
  appraisalDate: date('appraisal_date').notNull(),
  staffId: integer('staff_id')
    .notNull()
    .references(() => employees.id),
  yearId: integer('year_id')
    .notNull()
    .references(() => calendarYears.id),
  appraisalStatus: appraisalStatusEnum('appraisal_status')
    .default('PENDING')
    .notNull(),
  conductedOn: date('conducted_on'),
  createdOn: date('created_on').defaultNow().notNull(),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  isDeleted: boolean('is_deleted').default(false).notNull(),
  startTime: varchar('start_time').notNull(),
  endTime: varchar('end_time').notNull(),
  remarks: text('remarks').notNull(),
});

export const disciplinaryCases = pgTable('disciplinary_cases', {
  id: text('id').primaryKey().notNull(),
  caseDate: date('case_date').notNull(),
  incidenceDescription: text('incidence_description').notNull(),
  remarks: text('remarks').notNull(),
  caseStatus: disciplinaryCaseStatusEnum('case_status')
    .default('REPORTED')
    .notNull(),
  caseAction: disciplinaryCaseActionEnum('case_action').notNull(),
  otherAction: varchar('other_action'),
  isDeleted: boolean('is_deleted').default(false).notNull(),
});

export const employeeCertifications = pgTable('employee_certifications', {
  id: serial('id').primaryKey().notNull(),
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id),
  certification: varchar('certification').notNull(),
  score: varchar('score').notNull(),
});

export const healthSafety = pgTable('health_safety', {
  id: text('id').primaryKey().notNull(),
  incidenceDate: date('incidence_date').notNull(),
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id),
  departmentId: integer('department_id')
    .notNull()
    .references(() => departments.id),
  incedenceDescription: text('incedence_description').notNull(),
  injurySeverity: healthSafetyInjuryEnum('injury_severity').notNull(),
  applicationStatus: healthSafetyStatusEnum('application_status')
    .default('NOT-FILED')
    .notNull(),
  applicationDate: date('application_date'),
  resolutionDate: date('resolution_date'),
  amountAwarded: numeric('amount_awarded'),
});

export const employeeTerminations = pgTable('employee_terminations', {
  id: text('id').primaryKey().notNull(),
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id),
  terminationDate: date('termination_date').notNull(),
  reason: text('reason').notNull(),
  remarks: text('remarks'),
});

export const employeeQualifications = pgTable('employee_qualifications', {
  id: text('id').primaryKey().notNull(),
  employeeId: integer('employee_id')
    .notNull()
    .references(() => employees.id),
  qualificationType: educationTypeEnum('qualification_type').notNull(),
  from: varchar('from'),
  to: varchar('to'),
  school: varchar('school'),
  attainment: varchar('attainment'),
  specialization: varchar('specialization'),
});

export const loanDeductions = pgTable('loan_deductions', {
  id: serial('id').primaryKey().notNull(),
  loanId: integer('loan_id').references(() => staffLoans.id),
  deductionAmount: numeric('deduction_amount').notNull(),
  deductionDate: date('deduction_date').notNull(),
  remarks: text('remarks'),
  createdBy: uuid('created_by')
    .notNull()
    .references(() => users.id),
  createdDate: date('created_date').defaultNow().notNull(),
});

export const staffLoans = pgTable('staff_loans', {
  id: serial('id').primaryKey().notNull(),
  loanDate: date('loan_date').notNull(),
  employeeId: integer('employee_id').references(() => employees.id),
  loanAmount: numeric('loan_amount').notNull(),
  loanDuration: integer('loan_duration').notNull(),
  deductableAmount: numeric('deductable_amount').default('0').notNull(),
  reason: text('reason'),
  attachment: text('attachment'),
  completed: boolean('completed').default(false).notNull(),
});

export const userRoles = pgTable(
  'user_roles',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
  },
  table => {
    return {
      userRolesRoleIdUserIdPk: primaryKey({
        columns: [table.userId, table.roleId],
        name: 'user_roles_role_id_user_id_pk',
      }),
    };
  }
);

export const disciplinaryCasesDocuments = pgTable(
  'disciplinary_cases_documents',
  {
    caseId: text('case_id')
      .notNull()
      .references(() => disciplinaryCases.id),
    uploadedUrl: text('uploaded_url').notNull(),
  },
  table => {
    return {
      disciplinaryCasesDocumentsCaseIdUploadedUrlPk: primaryKey({
        columns: [table.caseId, table.uploadedUrl],
        name: 'disciplinary_cases_documents_case_id_uploaded_url_pk',
      }),
    };
  }
);

export const disciplinaryCasesPersonnel = pgTable(
  'disciplinary_cases_personnel',
  {
    staffId: integer('staff_id')
      .notNull()
      .references(() => employees.id),
    caseId: text('case_id')
      .notNull()
      .references(() => disciplinaryCases.id),
  },
  table => {
    return {
      disciplinaryCasesPersonnelCaseIdStaffIdPk: primaryKey({
        columns: [table.staffId, table.caseId],
        name: 'disciplinary_cases_personnel_case_id_staff_id_pk',
      }),
    };
  }
);

export const healthSafetyDocuments = pgTable(
  'health_safety_documents',
  {
    caseId: text('case_id')
      .notNull()
      .references(() => healthSafety.id),
    uploadedUrl: text('uploaded_url').notNull(),
  },
  table => {
    return {
      healthSafetyDocumentsCaseIdUploadedUrlPk: primaryKey({
        columns: [table.caseId, table.uploadedUrl],
        name: 'health_safety_documents_case_id_uploaded_url_pk',
      }),
    };
  }
);

export const verificationTokens = pgTable(
  'verification_tokens',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'string' }).notNull(),
  },
  table => {
    return {
      verificationTokensIdentifierTokenPk: primaryKey({
        columns: [table.identifier, table.token],
        name: 'verification_tokens_identifier_token_pk',
      }),
    };
  }
);

export const accounts = pgTable(
  'accounts',
  {
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('provider_account_id').notNull(),
    refreshToken: text('refresh_token'),
    accessToken: text('access_token'),
    expiresAt: integer('expires_at'),
    tokenType: text('token_type'),
    scope: text('scope'),
    idToken: text('id_token'),
    sessionState: text('session_state'),
  },
  table => {
    return {
      accountsProviderProviderAccountIdPk: primaryKey({
        columns: [table.provider, table.providerAccountId],
        name: 'accounts_provider_provider_account_id_pk',
      }),
    };
  }
);

export const employeeRelations = relations(employees, ({ one, many }) => ({
  contact: one(employeesContacts, {
    fields: [employees.id],
    references: [employeesContacts.employeeId],
  }),
  nok: one(employeesNoks, {
    fields: [employees.id],
    references: [employeesNoks.employeeId],
  }),
  otherDetails: one(employeesOtherdetails, {
    fields: [employees.id],
    references: [employeesOtherdetails.employeeId],
  }),
  children: many(employeesChildren),
  qualifications: many(employeeQualifications),
  department: one(departments, {
    fields: [employees.department],
    references: [departments.id],
  }),
  designation: one(designations, {
    fields: [employees.designation],
    references: [designations.id],
  }),
  contracts: many(contractExtensions),
}));

export const employeeChildrenRelations = relations(
  employeesChildren,
  ({ one }) => ({
    employee: one(employees, {
      fields: [employeesChildren.employeeId],
      references: [employees.id],
    }),
  })
);

export const employeeQualificationsRelations = relations(
  employeeQualifications,
  ({ one }) => ({
    employee: one(employees, {
      fields: [employeeQualifications.employeeId],
      references: [employees.id],
    }),
  })
);
