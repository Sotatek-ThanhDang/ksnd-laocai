import {
  dateValidation,
  emailValidationWithCheckDomain,
  passwordValidation,
  SUPPORTED_MESSAGE,
} from '@repo/common';
import { z } from 'zod';

import {
  ELIGIBILITY_STATUS_VALUE,
  EMPLOYMENT_STATUS_VALUE,
} from '../common/user';

export const EligibilityStatusSchema = z.enum(ELIGIBILITY_STATUS_VALUE);
export const EmploymentStatusSchema = z.enum(EMPLOYMENT_STATUS_VALUE);
export const LanguageSchema = z.enum(Object.values(SUPPORTED_MESSAGE));
export type EligibilityStatus = z.infer<typeof EligibilityStatusSchema>;
export type EmploymentStatus = z.infer<typeof EmploymentStatusSchema>;
export type PreferredLanguage = z.infer<typeof LanguageSchema>;

export const employeeInfoSchema = z.object({
  employeeId: z.string(),
  fullName: z.string(),
  employeeType: z.string(),
  joiningDate: dateValidation,
  employeeStatus: EmploymentStatusSchema,
  terminationDate: dateValidation,
  companyEmail: emailValidationWithCheckDomain,
  nationality: z.string(),
  dependants: z.string(),
});

export const organizationalSchema = z.object({
  businessUnit: z.string(),
  departmentName: z.string(),
  jobTitle: z.string(),
  costCenter: z.string(),
  workLocation: z.string(),
});

export const paymentSchema = z.object({
  bankAccountHolder: z
    .string()
    .min(1, 'profile.validation.bankAccountHolder')
    .max(250, 'profile.validation.maxLength'),
  accountNumber: z
    .string()
    .min(1, 'profile.validation.accountNumber')
    .regex(/^\d+$/, 'profile.validation.accountNumberMustBeNumber'),
  bankName: z
    .string()
    .min(1, 'profile.validation.bankName')
    .max(250, 'profile.validation.maxLength'),
  localBankCode: z
    .string()
    .min(1, 'profile.validation.localBankCode')
    .regex(/^\d+$/, 'profile.validation.localBankCodeMustBeNumber'),
});

export const resetPasswordSchema = z
  .object({
    currentPassword: passwordValidation,
    newPassword: passwordValidation,
    confirmNewPassword: passwordValidation,
  })
  .refine((data) => data.confirmNewPassword === data.newPassword, {
    path: ['confirmNewPassword'],
    message: 'common.form.errorMessage.confirmPassword',
  });

export const updateEmailSchema = z.object({
  personalEmail: emailValidationWithCheckDomain,
});

export const employeeStatusSchema = z.object({
  employmentStatus: EmploymentStatusSchema,
  activationDate: dateValidation,
});

export const eligibilityStatusSchema = z.object({
  eligibilityStatus: EligibilityStatusSchema,
});

export const adminRoleSchema = z.object({
  role: z.string(),
});

export const preferredLanguageSchema = z.object({
  preferredLanguage: LanguageSchema,
});

const informationSchema = z.object({
  employeeInformation: employeeInfoSchema,
  organizationalInformation: organizationalSchema,
  paymentInformation: paymentSchema,
  resetPassword: resetPasswordSchema,
  personalEmailUpdate: updateEmailSchema,
  preferredLanguage: preferredLanguageSchema,
  eligibilityStatus: eligibilityStatusSchema,
  employeeStatus: employeeStatusSchema,
  adminRole: adminRoleSchema,
});

type InformationFormValues = z.infer<typeof informationSchema>;

export { type InformationFormValues, informationSchema };
