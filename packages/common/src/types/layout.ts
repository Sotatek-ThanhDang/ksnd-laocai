import type { ReactElement } from 'react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: ReactElement;
  isActive?: boolean;
  children?: MenuItem[];
  onClick?: () => void;
  path?: string;
  badge?: number | string;
  disabled?: boolean;
  permission?: string[];
}

export interface UserProfile {
  id?: string;
  name: string;
  email?: string;
  avatar?: string | null;
  role?: string;
}

export type UserProfileAction = 'profile' | 'settings' | string;
