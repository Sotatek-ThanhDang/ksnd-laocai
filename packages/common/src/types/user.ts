import Grid from '@mui/material/Grid';

import type { InformationFormValues } from '../schema/information';
import {
  adminRoleSchema,
  eligibilityStatusSchema,
  employeeInfoSchema,
  employeeStatusSchema,
  organizationalSchema,
  paymentSchema,
  preferredLanguageSchema,
  resetPasswordSchema,
  updateEmailSchema,
} from '../schema/information';

type GridSizeProp = React.ComponentProps<typeof Grid>['size'];

export type TypeInput =
  | 'text'
  | 'number'
  | 'date'
  | 'email'
  | 'password'
  | 'select'
  | 'phone';

export type InformationKey = keyof InformationFormValues;

export type RowsInformation<K extends InformationKey> = {
  input: {
    type: TypeInput;
    label: string;
    name: Extract<keyof InformationFormValues[K], string>;
    options?: { label: string; value: string | number }[];
    showPasswordIcon?: boolean;
    placeholder?: string;
  };
  size: GridSizeProp; //{ sm: 6, md: 4 } or 6
  subLabel?: string;
  actionRows?: string | ReactNode;
};

export type SectionConfig<K extends InformationKey> = {
  section: K;
  rows: RowsInformation<K>[];
};

export type FormSectionValues<K extends InformationKey> = Pick<
  InformationFormValues,
  K
>;

export type ExtractSectionValues<K extends InformationKey> =
  InformationFormValues[K];

export const SCHEMA_BY_SECTION = {
  employeeInformation: employeeInfoSchema,
  organizationalInformation: organizationalSchema,
  paymentInformation: paymentSchema,
  resetPassword: resetPasswordSchema,
  personalEmailUpdate: updateEmailSchema,
  preferredLanguage: preferredLanguageSchema,
  eligibilityStatus: eligibilityStatusSchema,
  employeeStatus: employeeStatusSchema,
  adminRole: adminRoleSchema,
} as const;

export type SectionKey = keyof typeof SCHEMA_BY_SECTION;

import type {
  EligibilityStatus,
  EmploymentStatus,
  PreferredLanguage,
} from '@repo/common/src/schema';
import type { ReactNode } from 'react';

// Admin user profile
export type MonthDetail = {
  month: number;
  subscription_base_salary: number;
  insurance_salary: number;
  taxable_income: number;
};

export type PaymentDetail = {
  year: number;
  months: MonthDetail[];
};

export type AdminUserProfile = {
  employee_id: string;
  full_name: string;
  employee_type: string;
  joining_date: string;
  termination_date: string | null;
  company_email: string;
  business_unit: string;
  department_name: string;
  job_title: string;
  cost_center: string;
  work_location: string;
  bank_account_holder: string | null;
  account_number: string | null;
  bank_name: string | null;
  local_bank_code: string | null;
  pay_details: PaymentDetail[];
  personal_email: string;
  enrollment_status: string;
  employee_status: EmploymentStatus;
  activation_date: string;
  eligibility_status: EligibilityStatus;
  role: string;
  can_change_eligibility_status: boolean;
  member_status: EMemberStatus;
  nationality: string;
  dependants: string;
  total_savings: number;
};

// Employee User profile
export type EmploymentUserProfile = Omit<
  AdminUserProfile,
  'role' | 'can_change_eligibility_status' | 'member_status'
> & {
  preferred_language: PreferredLanguage;
  withdrawal_confirmation_required: boolean;
  withdrawal_available: boolean;
};

export enum EStatusEmailUpdate {
  SUBMITTED = 'SUBMITTED',
  CONFIRMED = 'CONFIRMED',
  PENDING_VERIFICATION = 'PENDING_VERIFICATION',
  COMPLETED = 'COMPLETED',
  REJECTED = 'REJECTED',
}

export type UserInfo = {
  account_locked_until: string | null;
  account_name: string;
  activation_date: string | null;
  bank_code: string;
  bank_name: string;
  bank_number: string;
  business_unit: string;
  company_email: string;
  cost_center: string;
  date_of_birth: string;
  date_of_joining: string;
  department_id: number;
  department_name: string;
  eligibility_status: string;
  email: string;
  employment_status: string;
  employment_type_id: number;
  employment_type_name: string;
  enrollment_status: string;
  failed_login_attempt: number;
  fed_id: string;
  full_name: string;
  job_title: string;
  last_login_at: string | null;
  legal_representative: string;
  legal_representative_date_of_birth: string | null;
  legal_representative_relationship: string | null;
  location_city: string;
  location_country: string;
  location_id: number;
  location_name: string;
  member_created_at: string;
  member_id: number;
  member_type: 'ADMIN';
  member_updated_at: string;
  mobile_number: string;
  nationality: string;
  nominee: string;
  preferred_language: string;
  profile_created_at: string;
  profile_created_by: string;
  profile_fed_id: string;
  profile_id: number;
  profile_image_url: string;
  profile_updated_at: string;
  profile_updated_by: string;
  registration_email_sent_at: string | null;
  relationship: string;
  status: 'ACTIVE';
  tax_id: string;
  termination_date: string;
  work_location: string | null;
  role: UserRole;
};

export type UserRole = {
  assigned_at: string;
  description: string;
  is_system_role: boolean;
  role_created_at: string;
  role_id: number;
  role_name: string;
  role_updated_at: string;
};

export enum EMemberType {
  ADMIN = 'ADMIN',
  USER = 'USER',
  EMPLOYEE = 'EMPLOYEE',
}

export enum EMemberStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum EEligibilityStatus {
  ELIGIBLE = 'ELIGIBLE',
  INELIGIBLE = 'INELIGIBLE',
}
