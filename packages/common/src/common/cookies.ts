import Cookies from 'js-cookie';

const COOKIE_NAMES = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_ROLE: 'user_role',
  USER_PERMISSION: 'user_permission',
  LOGIN_FAIL_COUNT: 'login_fail_count',
} as const;

const cookieOptions: Parameters<typeof Cookies.set>[2] = {
  secure: true,
  sameSite: 'Lax',
};

export { COOKIE_NAMES, cookieOptions };
