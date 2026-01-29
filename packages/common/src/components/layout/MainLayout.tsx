import {
  AppBar,
  Box,
  Drawer,
  paperClasses,
  Stack,
  useTheme,
} from '@mui/material';
import { useThemeBreakpoints } from '@repo/common/src/hooks';
import { HEADER_HEIGHT } from '@repo/common/src/libs/mui/constants';
import React, { type FC, type ReactNode, useState } from 'react';

import type { MenuItem, UserProfile, UserProfileAction } from '../../types';
import Header from './Header';
import Sidebar from './Sidebar';

export interface MainLayoutProps {
  children: ReactNode;
  sidebarMenuItems?: MenuItem[];
  onMenuItemClick?: (item: MenuItem) => void;
  onUserProfileClick?: (action: UserProfileAction) => void;
  userProfile?: UserProfile;
  drawerWidth?: number;
  mobileDrawerWidth?: number;
  enrolled?: boolean;
}

export const MainLayout: FC<MainLayoutProps> = ({
  children,
  sidebarMenuItems = [],
  onMenuItemClick = () => {},
  onUserProfileClick = () => {},
  userProfile = { name: 'User' },
  drawerWidth = 260,
  mobileDrawerWidth = 280,
  enrolled = false,
}) => {
  const { isTablet } = useThemeBreakpoints();
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [notificationAnchor, setNotificationAnchor] =
    useState<HTMLElement | null>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<HTMLElement | null>(
    null
  );

  const muiTheme = useTheme();

  const currentDrawerWidth = isTablet ? drawerWidth * 0.8 : drawerWidth;

  const handleDrawerToggle = (): void => {
    setMobileOpen(!mobileOpen);
  };

  const handleNotificationClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = (): void => {
    setNotificationAnchor(null);
  };

  const handleUserMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = (): void => {
    setUserMenuAnchor(null);
  };

  const handleUserProfileAction = (action: string): void => {
    handleUserMenuClose();
    onUserProfileClick(action);
  };

  const handleMenuItemClick = (item: MenuItem): void => {
    onMenuItemClick(item);
    if (isTablet) {
      setMobileOpen(false);
    }
  };

  function renderHeader() {
    return (
      <AppBar
        elevation={1}
        sx={{
          height: `${HEADER_HEIGHT}px`,
          bgcolor: (theme) => theme.palette.common.white,
          zIndex: muiTheme.zIndex.drawer + (isTablet ? 1 : -1),
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <Header
          isTablet={isTablet}
          onDrawerToggle={handleDrawerToggle}
          onNotificationClick={handleNotificationClick}
          onUserMenuClick={handleUserMenuClick}
          userProfile={userProfile}
          notificationAnchor={notificationAnchor}
          userMenuAnchor={userMenuAnchor}
          onNotificationClose={handleNotificationClose}
          onUserMenuClose={handleUserMenuClose}
          onUserProfileAction={handleUserProfileAction}
        />
      </AppBar>
    );
  }

  const renderSideBar = () => {
    const sidebarContent = (
      <Sidebar
        menuItems={sidebarMenuItems}
        onMenuItemClick={handleMenuItemClick}
        enrolled={enrolled}
      />
    );

    return (
      <>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            width: currentDrawerWidth,
            [`& .${paperClasses.root}`]: {
              width: currentDrawerWidth,
              boxSizing: 'border-box',
              borderRight: (theme) =>
                `1px solid ${theme.palette.border.tertiary}`,
              transition: 'all 0.3s ease-in-out',
            },
          }}
        >
          {sidebarContent}
        </Drawer>

        {/* Sidebar - Mobile/Tablet */}
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          sx={{
            display: { xs: 'block', md: 'none' },
            [`& .${paperClasses.root}`]: {
              top: `${HEADER_HEIGHT}px`,
              height: `calc(100% - ${HEADER_HEIGHT}px)`,
              width: mobileDrawerWidth,
            },
          }}
        >
          {sidebarContent}
        </Drawer>
      </>
    );
  };

  return (
    <Stack direction="row" width="100%" height="100vh" overflow="hidden">
      <Box height="100%" flexShrink={0}>
        {renderSideBar()}
      </Box>
      <Stack flex={1} position="relative" minWidth={0}>
        {renderHeader()}

        <Stack
          component="main"
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'auto',
            background: (theme) => theme.palette.background.secondary,
            pt: `${HEADER_HEIGHT}px`,
          }}
        >
          <Box sx={{ flex: 1, p: { xs: 2, sm: 3, md: 2.5 } }}>{children}</Box>
        </Stack>
      </Stack>
    </Stack>
  );
};
