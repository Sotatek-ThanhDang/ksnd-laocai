import { type PropsWithChildren, type ReactNode } from 'react';

import { usePermissionContext } from '../../contexts/PermissionContext';
import { checkPermission } from '../../utils/permission';

type AccessControlProps = PropsWithChildren<{
  allowedPermissions: string[];
  renderFallback?: boolean;
  fallBack?: ReactNode;
}>;

export function AccessControl({
  allowedPermissions,
  children,
  renderFallback,
  fallBack,
}: AccessControlProps) {
  const { permissions: userPermissions } = usePermissionContext() ?? {
    userPermissions: [],
  };

  const hasPermission = checkPermission(allowedPermissions, userPermissions);

  if (hasPermission) return children;

  if (renderFallback && fallBack) return fallBack;

  return null;
}
