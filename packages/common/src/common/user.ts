import type { ChipProps } from '@mui/material';

import { getInitialLang } from '../libs';
import type { InformationFormValues } from '../schema';
import type { RowsInformation } from '../types';
import { SUPPORTED_MESSAGE } from './lang';
import { SYSTEM_ROLES } from './role';

// user status
export enum ENROLLMENT_STATUSES {
  NOT_ENROLLED = 'NOT_ENROLLED',
  PENDING = 'PENDING',
  ENROLLED = 'ENROLLED',
  WITHDRAWN = 'WITHDRAWN',
  PROCESSING = 'PROCESSING',
  REJECTED = 'REJECTED',
}

export enum ENROLLMENT_WITHDRAWN_STATUSES {
  CREATED = 'CREATED',
  SENT = 'SENT',
  SIGNING_COMPLETED = 'SIGNING_COMPLETED', // This status use for auto redirect to login page after sign success withdrall
  SIGNED = 'SIGNED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
}

export const MODE_PROGRAM = {
  ENROLLMENT: 'enrollment',
  WITHDRAWAL: 'withdrawal',
} as const;

export type ProgramMode = (typeof MODE_PROGRAM)[keyof typeof MODE_PROGRAM];

export const ELIGIBILITY_STATUS_VALUE = ['ELIGIBLE', 'INELIGIBLE'] as const;

export const EMPLOYMENT_STATUS_VALUE = [
  'ACTIVE',
  'TERMINATED',
  'RETIRED',
  'REVOKED',
  'STANDBY',
] as const;

export enum EEmploymentStatus {
  ACTIVE = 'ACTIVE',
  TERMINATED = 'TERMINATED',
  RETIRED = 'RETIRED',
  REVOKED = 'REVOKED',
  STANDBY = 'STANDBY',
}

export const DEFAULT_VALUE: InformationFormValues = {
  employeeInformation: {
    employeeId: '',
    fullName: '',
    employeeType: '',
    companyEmail: '',
    employeeStatus: 'ACTIVE',
    joiningDate: '',
    terminationDate: '',
    nationality: '',
    dependants: '',
  },
  organizationalInformation: {
    businessUnit: '',
    departmentName: '',
    jobTitle: '',
    costCenter: '',
    workLocation: '',
  },
  paymentInformation: {
    bankAccountHolder: '',
    accountNumber: '',
    bankName: '',
    localBankCode: '',
  },
  resetPassword: {
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  },
  personalEmailUpdate: {
    personalEmail: '',
  },
  preferredLanguage: {
    preferredLanguage: getInitialLang(),
  },
  employeeStatus: {
    employmentStatus: 'ACTIVE',
    activationDate: '',
  },
  eligibilityStatus: {
    eligibilityStatus: 'ELIGIBLE',
  },
  adminRole: {
    role: SYSTEM_ROLES.USER,
  },
};

const EMPLOYMENT_STATUSES_OPTIONS = [
  {
    label: 'profile.enums.employmentStatus.ACTIVE',
    value: EEmploymentStatus.ACTIVE,
  },
  {
    label: 'profile.enums.employmentStatus.TERMINATED',
    value: EEmploymentStatus.TERMINATED,
  },
  {
    label: 'profile.enums.employmentStatus.RETIRED',
    value: EEmploymentStatus.RETIRED,
  },
  {
    label: 'profile.enums.employmentStatus.REVOKED',
    value: EEmploymentStatus.REVOKED,
  },
  {
    label: 'profile.enums.employmentStatus.STANDBY',
    value: EEmploymentStatus.STANDBY,
  },
];
export const ELIGIBILITY_STATUSES_OPTIONS = [
  {
    label: 'profile.enums.eligibilityStatus.ELIGIBLE',
    value: ELIGIBILITY_STATUS_VALUE[0],
  },
  {
    label: 'profile.enums.eligibilityStatus.INELIGIBLE',
    value: ELIGIBILITY_STATUS_VALUE[1],
  },
];

export const PREFERRED_LANGUAGE_OPTIONS = [
  {
    label: 'profile.enums.language.EN',
    value: SUPPORTED_MESSAGE.en,
  },
  {
    label: 'profile.enums.language.VI',
    value: SUPPORTED_MESSAGE.vi,
  },
];

export const employeeInformationRows: RowsInformation<'employeeInformation'>[] =
  [
    {
      input: {
        type: 'text',
        label: 'profile.info.employeeID',
        name: 'employeeId',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'text',
        label: 'profile.info.name',
        name: 'fullName',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'text',
        label: 'profile.info.employmentType',
        name: 'employeeType',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'date',
        label: 'profile.info.joiningDate',
        name: 'joiningDate',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'select',
        label: 'profile.info.employmentStatus',
        name: 'employeeStatus',
        options: EMPLOYMENT_STATUSES_OPTIONS,
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'date',
        label: 'profile.info.terminationDate',
        name: 'terminationDate',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'email',
        label: 'profile.info.companyEmail',
        name: 'companyEmail',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'text',
        label: 'profile.info.nationality',
        name: 'nationality',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'text',
        label: 'profile.info.dependants',
        name: 'dependants',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
  ];

export const organizationalRows: RowsInformation<'organizationalInformation'>[] =
  [
    {
      input: {
        type: 'text',
        label: 'profile.info.businessUnit',
        name: 'businessUnit',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'text',
        label: 'profile.info.departmentName',
        name: 'departmentName',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'text',
        label: 'profile.info.jobTitle',
        name: 'jobTitle',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'text',
        label: 'profile.info.costCenter',
        name: 'costCenter',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
    {
      input: {
        type: 'text',
        label: 'profile.info.workLocation',
        name: 'workLocation',
      },
      size: { xs: 12, sm: 6, md: 4 },
    },
  ];

export const paymentRows: RowsInformation<'paymentInformation'>[] = [
  {
    input: {
      type: 'text',
      label: 'profile.info.bankAccountHolder',
      name: 'bankAccountHolder',
    },
    size: { xs: 12, sm: 6, md: 4 },
  },
  {
    input: {
      type: 'number',
      label: 'profile.info.accountNumber',
      name: 'accountNumber',
    },
    size: { xs: 12, sm: 6, md: 4 },
  },
  {
    input: {
      type: 'text',
      label: 'profile.info.bankName',
      name: 'bankName',
    },
    size: { xs: 12, sm: 6, md: 4 },
  },
  {
    input: {
      type: 'number',
      label: 'profile.info.localBankCode',
      name: 'localBankCode',
    },
    size: { xs: 12, sm: 6, md: 4 },
  },
];

export const employmentStatusRows: RowsInformation<'employeeStatus'>[] = [
  {
    input: {
      type: 'select',
      label: 'profile.info.employmentStatus',
      name: 'employmentStatus',
      options: EMPLOYMENT_STATUSES_OPTIONS,
    },
    size: { xs: 12, sm: 6, md: 4 },
  },
  {
    input: {
      type: 'date',
      label: 'profile.info.activationDate',
      name: 'activationDate',
    },
    size: { xs: 12, sm: 6, md: 4 },
  },
];

export const eligibilityStatuesRows: RowsInformation<'eligibilityStatus'>[] = [
  {
    input: {
      type: 'select',
      label: 'profile.info.eligibilityStatus',
      name: 'eligibilityStatus',
      options: ELIGIBILITY_STATUSES_OPTIONS,
    },
    size: { xs: 12, sm: 6, md: 4 },
  },
];

export const passwordUpdateRows: RowsInformation<'resetPassword'>[] = [
  {
    input: {
      type: 'password',
      label: 'profile.info.currentPassword',
      name: 'currentPassword',
      showPasswordIcon: true,
    },
    size: { xs: 12, sm: 6, md: 4 },
  },
  {
    input: {
      type: 'password',
      label: 'profile.info.newPassword',
      name: 'newPassword',
      showPasswordIcon: true,
    },
    size: { xs: 12, sm: 6, md: 4 },
  },
  {
    input: {
      type: 'password',
      label: 'profile.info.confirmNewPassword',
      name: 'confirmNewPassword',
      showPasswordIcon: true,
    },
    size: { xs: 12, sm: 6, md: 4 },
    subLabel: 'profile.info.rolePassword',
  },
];

export const preferredLanguageRows: RowsInformation<'preferredLanguage'>[] = [
  {
    input: {
      type: 'select',
      label: 'profile.info.language',
      name: 'preferredLanguage',
      options: PREFERRED_LANGUAGE_OPTIONS,
    },
    size: { xs: 12, sm: 6, md: 4 },
  },
];

export const STATUS_ENROLLED_COLOR: Record<
  ENROLLMENT_STATUSES,
  ChipProps['color']
> = {
  [ENROLLMENT_STATUSES.ENROLLED]: 'primary',
  [ENROLLMENT_STATUSES.NOT_ENROLLED]: 'error',
  [ENROLLMENT_STATUSES.PENDING]: 'warning',
  [ENROLLMENT_STATUSES.WITHDRAWN]: 'secondary',
  [ENROLLMENT_STATUSES.REJECTED]: 'brand',
  [ENROLLMENT_STATUSES.PROCESSING]: 'sky',
};

export const KEY_TOKEN_CURRENT_EMAIL = 'tokenCurrentEmail';

export const KEY_QUERY_USER_DETAIL = 'user-profile';

export enum EUserManagementStatus {
  ACTIVE = 'ACTIVE',
  TERMINATED = 'TERMINATED',
  RETIRED = 'RETIRED',
  REVOKED = 'REVOKED',
  STANDBY = 'STANDBY',
}
