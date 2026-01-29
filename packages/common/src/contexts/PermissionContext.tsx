import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  checkPermission,
  getUserPermission,
  setUserPermission,
} from '../utils/permission';

type SetPermissionFn = (
  params: Parameters<typeof setUserPermission>[0]
) => void;

type PermissionContextValue = {
  permissions: string[];
  savePermissions: SetPermissionFn;
  hasPermission: (allowedPermission: string[]) => boolean;
};

const PermissionContext = createContext<PermissionContextValue | undefined>(
  undefined
);

export function PermissionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorities } = getUserPermission();

  const [permissions, setPermissions] = useState<string[]>(authorities);

  const savePermissions: SetPermissionFn = useCallback((params) => {
    setUserPermission(params);
    setPermissions(params.authorities);
  }, []);

  const hasPermission = useCallback(
    (allowedPermissions: string[]) =>
      checkPermission(allowedPermissions, permissions),
    [permissions]
  );

  const memoContextValue = useMemo(
    () => ({
      hasPermission,
      permissions,
      savePermissions,
    }),
    [hasPermission, permissions, savePermissions]
  );

  return (
    <PermissionContext.Provider value={memoContextValue}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermissionContext() {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error(
      'usePermission must be used within a PermissionContextProvider'
    );
  }
  return context;
}
