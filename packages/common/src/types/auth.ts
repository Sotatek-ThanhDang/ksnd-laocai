import { EMemberType } from './user';

export type TLoginResponse = {
  access_token: string;
  refresh_token: string;
  authorities: string[];
  roles: string[];
  member_type: EMemberType;
};

export type RefreshTokenRequestData = {
  refresh_token: string;
};

export type RefreshTokenResponseData = TLoginResponse;
