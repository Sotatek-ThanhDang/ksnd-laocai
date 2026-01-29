import Cookies from 'js-cookie';
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import type { NavigateFunction } from 'react-router';

import { BOARD_CAST_AUTH_KEY, BOARD_CAST_AUTH_MESSAGE } from '../common';
import { COOKIE_NAMES, cookieOptions } from '../common/cookies';
import { queryClient } from '../libs';
import { clearUserPermission } from './permission';

function setAuthToken({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  Cookies.set(COOKIE_NAMES.ACCESS_TOKEN, accessToken, cookieOptions);
  Cookies.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, cookieOptions);
}

function getAuthToken() {
  const accessToken = Cookies.get(COOKIE_NAMES.ACCESS_TOKEN);
  const refreshToken = Cookies.get(COOKIE_NAMES.REFRESH_TOKEN);

  return {
    accessToken,
    refreshToken,
  };
}

function validateAuthToken() {
  const { accessToken, refreshToken } = getAuthToken();
  const hasToken = !!(accessToken && refreshToken);

  if (!hasToken) return { hasToken, isTokenExpire: null };

  const decodedAccessToken = _decodeAccessToken(accessToken);

  if (!decodedAccessToken) {
    return { hasToken: false, isTokenExpire: true };
  }

  const isTokenExpire = _isExpire(decodedAccessToken);

  return {
    accessToken,
    refreshToken,
    hasToken,
    isTokenExpire,
  };
}

export function clearAuthToken() {
  Cookies.remove(COOKIE_NAMES.ACCESS_TOKEN);
  Cookies.remove(COOKIE_NAMES.REFRESH_TOKEN);
}

function broadcastAuthMessage() {
  sessionStorage.setItem(BOARD_CAST_AUTH_KEY, 'true');
  const channel = new BroadcastChannel(BOARD_CAST_AUTH_KEY);
  channel.postMessage(BOARD_CAST_AUTH_MESSAGE);
  channel.close();
  setTimeout(() => {
    sessionStorage.removeItem(BOARD_CAST_AUTH_KEY);
  }, 100);
}

export function clearToken() {
  clearAuthToken();
  clearUserPermission();

  setTimeout(() => {
    queryClient.clear();
  }, 100);
}

function logout({
  navigate,
  logoutUrl,
  historyState,
}: {
  navigate?: NavigateFunction;
  logoutUrl?: string;
  historyState?: object;
} = {}) {
  const url = logoutUrl ?? '/';

  clearToken();

  broadcastAuthMessage();

  if (navigate) {
    navigate(url, {
      replace: true,
      state: historyState,
    });
  } else {
    historyState
      ? window.history.replaceState(historyState, '', url)
      : window.location.replace(url);
  }
}

function _decodeAccessToken(token: string) {
  if (!token) {
    console.log('No access token found in cookies.');
    return null;
  }

  try {
    const decodedPayload = jwtDecode(token);
    return decodedPayload;
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

function _isExpire(payload: JwtPayload) {
  if (!payload.exp) {
    // If 'exp' claim is missing, treat the token as unusable/invalid for expiration check
    console.warn(
      '[_isExpired] Access Token payload missing mandatory "exp" claim.'
    );
    return true;
  }

  const expirationTimeSeconds = payload.exp;
  const currentTimeSeconds = Math.floor(Date.now() / 1000);

  return expirationTimeSeconds < currentTimeSeconds;
}

function increaseLoginFailCount() {
  Cookies.set(
    COOKIE_NAMES.LOGIN_FAIL_COUNT,
    (getLoginFailCount() + 1).toString()
  );
}

function getLoginFailCount() {
  const loginFailCount = Cookies.get(COOKIE_NAMES.LOGIN_FAIL_COUNT);
  return loginFailCount ? Number(loginFailCount) : 0;
}

function clearLoginFailCount() {
  Cookies.remove(COOKIE_NAMES.LOGIN_FAIL_COUNT);
}

export {
  clearLoginFailCount,
  getAuthToken,
  getLoginFailCount,
  increaseLoginFailCount,
  logout,
  setAuthToken,
  validateAuthToken,
};
