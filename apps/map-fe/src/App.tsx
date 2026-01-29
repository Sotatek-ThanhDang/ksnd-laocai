import { AuthenLayout } from '@repo/common';
import {
  ErrorBoundaryProvider,
  NotFoundPage,
} from '@repo/common/src/components/pages';
import { Route, Routes } from 'react-router-dom';

import { publicRoutes } from '@/common/routes';

import { isDevMode } from './common/mode';
import { URL_PATH } from './common/url';

function App() {
  return (
    <Routes>
      {publicRoutes.map((route) => (
        <Route
          key={route.path as string}
          {...route}
          element={
            <ErrorBoundaryProvider isDevelopment={isDevMode}>
              <AuthenLayout path={URL_PATH.HOME}>{route.element}</AuthenLayout>
            </ErrorBoundaryProvider>
          }
        />
      ))}

      {/* <Route element={<PrivateLayout />}>
        {privateRoutes.map((route) => (
          <Route
            key={route.path as string}
            path={route.path}
            element={
              <ErrorBoundaryProvider embed isDevelopment={isDevMode}>
                <PrivateRoute
                  permission={route.permission}
                  element={route.element}
                />
              </ErrorBoundaryProvider>
            }
          />
        ))}
        <Route
          key="not-found-page"
          path="*"
          element={<NotFoundPage path={URL_PATH.HOME} embed />}
        />
      </Route> */}

      <Route path="*" element={<NotFoundPage path={URL_PATH.HOME} />} />
    </Routes>
  );
}

export default App;
