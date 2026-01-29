import type { RouteProps } from '@repo/common';

import Home from '@/pages/home';

import { URL_PATH } from './url';

export const publicRoutes: RouteProps[] = [
  {
    path: URL_PATH.HOME,
    element: <Home />,
  },
];

export const privateRoutes: RouteProps[] = [];
