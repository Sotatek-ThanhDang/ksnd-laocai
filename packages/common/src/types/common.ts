import { AxiosError } from 'axios';
import type { RouteProps as RouterDomProps } from 'react-router-dom';

import { LOGOUT_REASON } from '../common/navagation';

type Option<TValue extends string | number = string> = {
  label: string;
  value: TValue;
  disabled?: boolean;
};

type ApiErrorResponse = {
  status: number;
  message: string;
  error_code: number;
  invalid_data?: string[];
};

type AxiosApiErrorResponse = AxiosError<ApiErrorResponse>;

interface IListResponse<T> {
  total_pages: number;
  total_elements: number;
  first: boolean;
  last: boolean;
  size: number;
  content: T[];
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  number_of_elements: number;
  pageable: {
    offset: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    paged: boolean;
    page_size: number;
    page_number: number;
    unpaged: boolean;
  };
  empty: boolean;
}

export interface LogoutNavigateState {
  reason?: LOGOUT_REASON;
}

type RouteProps = RouterDomProps & {
  permission?: string[];
};

export type {
  ApiErrorResponse,
  AxiosApiErrorResponse,
  IListResponse,
  Option,
  RouteProps,
};
