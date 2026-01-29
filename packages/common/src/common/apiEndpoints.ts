const PUBLIC_API_ENDPOINTS = {
  REFRESH_TOKEN: '/api/auth/token',
  LOGIN: '/api/auth/email-login',
  FORGOT_PASSWORD: '/api/member/forgot-password',
  RESET_PASSWORD: '/api/member/reset-password',
  GET_MEMBER_DEPARTMENTS: '/api/member/departments',
  GET_MEMBER_LOCATIONS: '/api/member/locations',
  VERIFY_EMAIL: '/api/member/confirm-email',
  CREATE_ACCOUNT: '/api/member/register',
  CHECK_REGISTRATION: '/api/member/check-registration',
} as const;

const ADMIN_API_ENDPOINTS = {
  PROFILES_SEARCH: '/api/admin/profiles/search',
} as const;

const USER_API_ENDPOINTS = {
  CHANGE_EMAIL_STATUS: 'api/member/my-profile/change-email/status',
  GET_MEMBER_INFO: '/api/member/get-me',
};

export { ADMIN_API_ENDPOINTS, PUBLIC_API_ENDPOINTS, USER_API_ENDPOINTS };
