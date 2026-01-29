import type { RouteProps } from '@repo/common';

import { URL_PATH } from './url';

export const publicRoutes: RouteProps[] = [
  {
    path: URL_PATH.HOME,
    element: <></>,
  },
];

export const privateRoutes: RouteProps[] = [];
