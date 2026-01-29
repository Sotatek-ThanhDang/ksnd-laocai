import {
  // AccountCircle as AccountCircleIcon,
  Menu as MenuIcon,
  // Settings as SettingsIcon,
} from '@mui/icons-material';
import {
  // Badge,
  Box,
  // Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  // Typography,
} from '@mui/material';
import React, { type FC } from 'react';

import { useUserInfo } from '../../hooks';
import type { UserProfile, UserProfileAction } from '../../types';
import { UserProfileIcon } from '../common/icons';

export interface HeaderProps {
  isTablet: boolean;
  onDrawerToggle: () => void;
  onNotificationClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onUserMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  userProfile: UserProfile;
  notificationAnchor: HTMLElement | null;
  userMenuAnchor: HTMLElement | null;
  onNotificationClose: () => void;
  onUserMenuClose: () => void;
  onUserProfileAction: (action: UserProfileAction) => void;
}

const Header: FC<HeaderProps> = ({
  isTablet,
  onDrawerToggle,
  // onNotificationClick,
  onUserMenuClick,
  // userProfile,
  notificationAnchor,
  // userMenuAnchor,
  onNotificationClose,
  // onUserMenuClose,
  // onUserProfileAction,
}) => {
  const { userInfo } = useUserInfo();
  return (
    <Toolbar
      sx={{
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        px: { xs: 2, md: 4 },
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {isTablet && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 1, color: 'primary.main' }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {/* <IconButton
          color="inherit"
          onClick={onNotificationClick}
          aria-label="notifications"
          sx={{ color: 'common.black', margin: '8px' }}
        >
          <Badge badgeContent={3} color="error">
          <BellIcon />
          </Badge>
        </IconButton> */}

        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={onNotificationClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={onNotificationClose}>
            No new notifications
          </MenuItem>
        </Menu>

        <Stack gap={0}>
          <Typography variant="body1" color="text.primary">
            {userInfo?.full_name + ' - '}
            <i>{userInfo?.fed_id}</i>
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {userInfo?.role?.role_name}
          </Typography>
        </Stack>
        <IconButton
          onClick={onUserMenuClick}
          sx={{ p: 0 }}
          aria-label="user menu"
        >
          <UserProfileIcon sx={{ cursor: 'pointer', width: 40, height: 40 }} />
        </IconButton>

        {/* <Menu
          anchorEl={userMenuAnchor}
          open={Boolean(userMenuAnchor)}
          onClose={onUserMenuClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem disabled>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {userProfile.name}
              </Typography>
              <Typography variant="caption" sx={{ color: '#999' }}>
                {userProfile.email || 'No email provided'}
              </Typography>
            </Box>
          </MenuItem>

          <Divider />

          <MenuItem onClick={() => onUserProfileAction('profile')}>
            <AccountCircleIcon sx={{ mr: 1.5 }} fontSize="small" />
            <Typography variant="body2">Profile</Typography>
          </MenuItem>

          <MenuItem onClick={() => onUserProfileAction('settings')}>
            <SettingsIcon sx={{ mr: 1.5 }} fontSize="small" />
            <Typography variant="body2">Settings</Typography>
          </MenuItem>
        </Menu> */}
      </Box>
    </Toolbar>
  );
};

export default Header;
