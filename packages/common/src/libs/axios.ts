import axios from 'axios';

import { PUBLIC_API_ENDPOINTS } from '../common/apiEndpoints';
import type {
  AxiosApiErrorResponse,
  RefreshTokenRequestData,
  RefreshTokenResponseData,
} from '../types';
import { handleErrorMessage, setUserPermission } from '../utils';
import { logout, setAuthToken, validateAuthToken } from '../utils/auth';
import { getInitialLang } from './react-i18n';

const refreshTokenAPI = async (refreshToken: string) => {
  const response = await apis.post<
    RefreshTokenRequestData,
    RefreshTokenResponseData
  >(PUBLIC_API_ENDPOINTS.REFRESH_TOKEN, {
    refresh_token: refreshToken,
  });

  const { refresh_token, access_token, roles, authorities } = response;

  setAuthToken({ refreshToken: refresh_token, accessToken: access_token });
  setUserPermission({ roles, authorities });

  return access_token;
};

let refreshTokenRequest: Promise<string> | null = null;

const isPublicApi = (url: string | undefined): boolean => {
  if (!url) return false;
  const PUBLIC_API_PREFIXES = Object.values(PUBLIC_API_ENDPOINTS);
  return PUBLIC_API_PREFIXES.some((prefix) => url.startsWith(prefix));
};

const apis = axios.create({
  baseURL: '',
  timeout: 60_1000,
});

apis.interceptors.request.use(
  async (config) => {
    config.headers['Accept-Language'] = getInitialLang();
    if (isPublicApi(config.url)) {
      return config;
    }

    const { accessToken, refreshToken, isTokenExpire, hasToken } =
      validateAuthToken();

    if (hasToken) {
      let currentAccessToken = accessToken!;

      if (isTokenExpire) {
        if (refreshTokenRequest == null) {
          refreshTokenRequest = refreshTokenAPI(refreshToken!);
        }

        try {
          const accessToken = await refreshTokenRequest;
          currentAccessToken = accessToken;
        } catch (error) {
          handleErrorMessage(error as AxiosApiErrorResponse);
          logout();
        } finally {
          refreshTokenRequest = null;
        }
      }

      config.headers.Authorization = `Bearer ${currentAccessToken}`;
    }

    return config;
  },
  (err) => Promise.reject(err)
);

apis.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export { apis };
