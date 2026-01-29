import Cookies from 'js-cookie';

import { SYSTEM_ROLES } from '../common';
import { COOKIE_NAMES, cookieOptions } from '../common/cookies';

function cacAccessAdminPortal(member_type: string) {
  return member_type === 'ADMIN';
}

function canAccessUserPortal(member_type: string) {
  return member_type === SYSTEM_ROLES.USER;
}

function getUserPermission() {
  try {
    const authorities = Cookies.get(COOKIE_NAMES.USER_PERMISSION);
    const role = Cookies.get(COOKIE_NAMES.USER_ROLE);

    const userAuthorities = authorities ? JSON.parse(authorities) : [];
    const userRoles = role ? JSON.parse(role) : [];
    return {
      authorities: userAuthorities,
      roles: userRoles,
    };
  } catch (error) {
    console.log('Error when parse cookies', error);

    return { authorities: [], roles: [] };
  }
}

function setUserPermission({
  authorities,
  roles,
}: {
  authorities: string[];
  roles: string[];
}): void {
  Cookies.set(
    COOKIE_NAMES.USER_PERMISSION,
    JSON.stringify(authorities),
    cookieOptions
  );
  Cookies.set(COOKIE_NAMES.USER_ROLE, JSON.stringify(roles), cookieOptions);
}

function clearUserPermission(): void {
  Cookies.remove(COOKIE_NAMES.USER_PERMISSION);
  Cookies.remove(COOKIE_NAMES.USER_ROLE);
}

function checkPermission(
  allowedPermission: string[],
  userPermissions: string[]
) {
  if (allowedPermission.length === 0) return true;

  return userPermissions.some((userPermission) =>
    allowedPermission.includes(userPermission)
  );
}

export {
  cacAccessAdminPortal,
  canAccessUserPortal,
  checkPermission,
  clearUserPermission,
  getUserPermission,
  setUserPermission,
};
