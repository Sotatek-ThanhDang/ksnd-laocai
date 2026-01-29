const BASE_KEYS = {
  COMMON: 'common',
  USERS: 'users',
  SUBSCRIPTION: 'subscription',
  MEMBER: 'member',
  ADMIN_INFO: 'admin_info',
  ENROLLMENT_STATUS: 'enrollment_status',
  ENROLLMENT_AGREEMENT: 'enrollment_agreement',
  IMPORT_DETAILS: 'import_details',
  IMPORT_OVERVIEW: 'import_overview',
  TRANSACTION: 'transaction',
  TRANSACTION_REDEMPTION: 'transaction_redemption',
  CURRENT_MONTH_SALARY: 'current_month_salary',
  USER_IMPORT: 'user_import',
  TAX_IMPORT: 'tax_import',
  TAX_IMPORT_DETAILS: 'tax_import_details',
  ADMIN_VALIDATION_REQUEST: 'admin_validation_request',
  ADMIN_VALIDATION_SETTINGS: 'admin_validation_settings',
  ROLE: 'role',
  ADMIN: 'admin',
  WITHDRAW_STATUS: 'withdraw_status',
  WITHDRAWAL_AGREEMENT: 'withdrawal_agreement',
  PERFORMANCE_TABLE: 'performance_table',
  FUND_MATURITY: 'fund_maturity',
  FUND_VALUE_BY_YEAR: 'fund_value_by_year',
  USER_STATUS: 'user_status',
  DATA_VISUALISATION: 'data_visualisation',
  TAX: 'tax',
  EARLY_REDEMPTION_REASONS: 'early_redemption_reasons',
  VESTMENT: 'vestment',
  REDEEM_HISTORY: 'redeem_history',
  TOTAL_SAVINGS: 'total_savings',
  BANK_INFO: 'bank_info',
  REDEEM_DETAIL: 'redeem_detail',
  PIT_DEDUCTION: 'pit_deduction',
  DASHBOARD: 'dashboard',
  TXN_IN_PROGRESS: 'txn_in_progress',
  PLAN_PARTICIPATION_STATUS: 'plan_participation_status',
  TRANSACTION_DETAILS: 'transaction_details',
  HUB_FAQ: 'HUB_FAQ',
  HUB_MANUAL: 'HUB_MANUAL',
  REPORT_DOWLOAD_LIST: 'report_download_list',
  REDEEM_AVAILABILITY: 'redeem_availability',
  REDEEM_LIMIT: 'redeem_limit',
  FREEZE_PERIOD: 'freeze_period',
  CUT_OFF: 'cut_off',
} as const;

const QUERY_KEY_TYPE = {
  ALL: 'all',
  LIST: 'list',
  DETAILS: 'details',
} as const;

//
//
//

type BaseKeyTypes = keyof typeof BASE_KEYS;
type BaseKeyValues = (typeof BASE_KEYS)[BaseKeyTypes];

type QueryKeyFactory<TId = string | number> = {
  /** [baseKey] */
  all: () => readonly [BaseKeyValues];
  /** [baseKey, 'list', params] */
  list: <TParams extends object>(
    params?: TParams
  ) => readonly [
    BaseKeyValues,
    typeof QUERY_KEY_TYPE.LIST,
    TParams | undefined,
  ];
  /** [baseKey, 'details', id] */
  details: (
    id: TId
  ) => readonly [BaseKeyValues, typeof QUERY_KEY_TYPE.DETAILS, TId];
};

//
//
//

const createQueryKeys = (baseKeyType: BaseKeyTypes): QueryKeyFactory => {
  const baseKey = BASE_KEYS[baseKeyType];

  return {
    all: () => [baseKey] as const,
    list: (params) => [baseKey, QUERY_KEY_TYPE.LIST, params] as const,
    details: (id) => [baseKey, QUERY_KEY_TYPE.DETAILS, id] as const,
  };
};

const commonKeys = createQueryKeys('COMMON');
const userKeys = createQueryKeys('USERS');
const subscriptionKeys = createQueryKeys('SUBSCRIPTION');
const enrollmentStatusKeys = createQueryKeys('ENROLLMENT_STATUS');
const withdrawalStatusKeys = createQueryKeys('WITHDRAW_STATUS');
const memberKeys = createQueryKeys('MEMBER');
const enrollmentAgreementKeys = createQueryKeys('ENROLLMENT_AGREEMENT');
const withdrawalAgreementKeys = createQueryKeys('WITHDRAWAL_AGREEMENT');
const importDetailsKeys = createQueryKeys('IMPORT_DETAILS');
const importOverviewKeys = createQueryKeys('IMPORT_OVERVIEW');
const transactionKeys = createQueryKeys('TRANSACTION');
const transactionRedemptionKeys = createQueryKeys('TRANSACTION_REDEMPTION');
const currentMonthSalaryKeys = createQueryKeys('CURRENT_MONTH_SALARY');
const userImportKeys = createQueryKeys('USER_IMPORT');
const taxImportKeys = createQueryKeys('TAX_IMPORT');
const taxImportDetailsKeys = createQueryKeys('TAX_IMPORT_DETAILS');
const adminValidationRequestKeys = createQueryKeys('ADMIN_VALIDATION_REQUEST');
const adminValidationSettingKeys = createQueryKeys('ADMIN_VALIDATION_SETTINGS');
const adminInfoKeys = createQueryKeys('ADMIN_INFO');
const roleKeys = createQueryKeys('ROLE');
const adminKeys = createQueryKeys('ADMIN');
const performanceTableKeys = createQueryKeys('PERFORMANCE_TABLE');
const fundMaturityKeys = createQueryKeys('FUND_MATURITY');
const fundValueByYearKeys = createQueryKeys('FUND_VALUE_BY_YEAR');
const userStatusKey = createQueryKeys('USER_STATUS');
const dataVisualisationKeys = createQueryKeys('DATA_VISUALISATION');
const taxKeys = createQueryKeys('TAX');
const earlyRedemptionReasonsKey = createQueryKeys('EARLY_REDEMPTION_REASONS');
const vestmentKey = createQueryKeys('VESTMENT');
const redeemHistoryKey = createQueryKeys('REDEEM_HISTORY');
const totalSavingsKey = createQueryKeys('TOTAL_SAVINGS');
const bankInfoKey = createQueryKeys('BANK_INFO');
const redeemDetailKey = createQueryKeys('REDEEM_DETAIL');
const pitDeductionKey = createQueryKeys('PIT_DEDUCTION');
const dashboardKeys = createQueryKeys('DASHBOARD');
const txnInProgressKeys = createQueryKeys('TXN_IN_PROGRESS');
const planParticipationStatusKeys = createQueryKeys(
  'PLAN_PARTICIPATION_STATUS'
);
const transactionDetailsKeys = createQueryKeys('TRANSACTION_DETAILS');
const hubFaqKeys = createQueryKeys('HUB_FAQ');
const hubManualKeys = createQueryKeys('HUB_MANUAL');
const reportDownloadListKeys = createQueryKeys('REPORT_DOWLOAD_LIST');
const redeemAvailabilityKeys = createQueryKeys('REDEEM_AVAILABILITY');
const redeemLimitKeys = createQueryKeys('REDEEM_LIMIT');
const freezePeriodKeys = createQueryKeys('FREEZE_PERIOD');
const cutOffKeys = createQueryKeys('CUT_OFF');

export {
  adminInfoKeys,
  adminKeys,
  adminValidationRequestKeys,
  adminValidationSettingKeys,
  bankInfoKey,
  commonKeys,
  currentMonthSalaryKeys,
  cutOffKeys,
  dashboardKeys,
  dataVisualisationKeys,
  earlyRedemptionReasonsKey,
  enrollmentAgreementKeys,
  enrollmentStatusKeys,
  freezePeriodKeys,
  fundMaturityKeys,
  fundValueByYearKeys,
  hubFaqKeys,
  hubManualKeys,
  importDetailsKeys,
  importOverviewKeys,
  memberKeys,
  performanceTableKeys,
  pitDeductionKey,
  planParticipationStatusKeys,
  redeemAvailabilityKeys,
  redeemDetailKey,
  redeemHistoryKey,
  redeemLimitKeys,
  reportDownloadListKeys,
  roleKeys,
  subscriptionKeys,
  taxImportDetailsKeys,
  taxImportKeys,
  taxKeys,
  totalSavingsKey,
  transactionDetailsKeys,
  transactionKeys,
  transactionRedemptionKeys,
  txnInProgressKeys,
  userImportKeys,
  userKeys,
  userStatusKey,
  vestmentKey,
  withdrawalAgreementKeys,
  withdrawalStatusKeys,
};
