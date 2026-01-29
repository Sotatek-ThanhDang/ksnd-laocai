import type { MenuItem } from '@repo/common';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export const useActiveMenuItem = (menuItems: MenuItem[]): MenuItem[] => {
  const location = useLocation();

  return useMemo(() => {
    const updateMenuItems = (items: MenuItem[]): MenuItem[] => {
      return items.map((item) => {
        const isActive = location.pathname.includes(item.path ?? '');

        return {
          ...item,
          isActive: isActive,
          children: item.children ? updateMenuItems(item.children) : undefined,
        };
      });
    };

    return updateMenuItems(menuItems);
  }, [menuItems, location.pathname]);
};

export default useActiveMenuItem;
