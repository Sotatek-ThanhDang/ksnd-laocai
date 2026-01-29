import type { ExtractSectionValues } from '../types';
import { fromSnakeToCamel } from './camelToSnake';

export function mapProfileToEmployeeInformationSection<
  T extends {
    employee_id: string;
    full_name: string;
    employee_type: string;
    employee_status: string;
    company_email: string;
    joining_date: string | null;
    termination_date: string | null;
    nationality: string;
    dependants: string;
  },
>(userProfile: T): ExtractSectionValues<'employeeInformation'> {
  return fromSnakeToCamel<ExtractSectionValues<'employeeInformation'>>(
    userProfile,
    [
      'employeeId',
      'fullName',
      'employeeType',
      'employeeStatus',
      'companyEmail',
      'joiningDate',
      'terminationDate',
      'nationality',
      'dependants',
    ]
  );
}

export function mapProfileToOrganizationalInformationSection<
  T extends {
    business_unit: string;
    department_name: string;
    job_title: string;
    cost_center: string;
    work_location: string;
  },
>(userProfile: T): ExtractSectionValues<'organizationalInformation'> {
  return fromSnakeToCamel<ExtractSectionValues<'organizationalInformation'>>(
    userProfile,
    ['businessUnit', 'departmentName', 'jobTitle', 'costCenter', 'workLocation']
  );
}

export function mapProfileToPaymentInformationSection<
  T extends {
    bank_account_holder: string | null;
    account_number: string | null;
    bank_name: string | null;
    local_bank_code: string | null;
  },
>(userProfile: T): ExtractSectionValues<'paymentInformation'> {
  return fromSnakeToCamel<ExtractSectionValues<'paymentInformation'>>(
    userProfile,
    ['bankAccountHolder', 'accountNumber', 'bankName', 'localBankCode']
  );
}

export function mapProfileToPersonalEmailInformationSection<
  T extends {
    personal_email: string;
  },
>(userProfile: T): ExtractSectionValues<'personalEmailUpdate'> {
  return fromSnakeToCamel<ExtractSectionValues<'personalEmailUpdate'>>(
    userProfile,
    ['personalEmail']
  );
}
