import { ExpandLess, ExpandMore } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import {
  Box,
  Button,
  Chip,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  svgIconClasses,
  Typography,
} from '@mui/material';
import React, { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { HEADER_HEIGHT } from '../../libs/mui/constants';
import type { MenuItem } from '../../types';
import { logout } from '../../utils';
import { AccessControl } from './AccessControl';

interface SidebarProps {
  menuItems: MenuItem[];
  onMenuItemClick?: (item: MenuItem) => void;
  enrolled?: boolean;
}

interface ExpandedItemsState {
  [key: string]: boolean;
}

const Sidebar: FC<SidebarProps> = ({
  menuItems = [],
  onMenuItemClick,
  enrolled = false,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [expandedItems, setExpandedItems] = useState<ExpandedItemsState>({});
  const handleItemClick = (item: MenuItem): void => {
    if (item.children && item.children.length > 0) {
      setExpandedItems((prev) => ({
        ...prev,
        [item.id]: !prev[item.id],
      }));
    } else {
      onMenuItemClick?.(item);
    }
  };

  const renderMenuItems = (
    items: MenuItem[],
    level: number = 0
  ): React.ReactNode => {
    return items.map((item) => {
      const hasChildren = item.children && item.children.length > 0;
      const isExpanded = expandedItems[item.id];
      const isDisabled = item.disabled ?? false;
      const hasPath = !!item.path;
      const textColor = item.isActive ? 'text.brand' : 'text.quaternary';
      // TODO: remove this after enrollment is implemented
      const isEnrollmentItem = item.id === 'enrollment';
      const buttonContent = (
        <>
          {item.icon && (
            <ListItemIcon
              sx={{
                minWidth: 'unset',
                mr: '0.625rem',
                color: textColor,
                [`.${svgIconClasses.root}`]: {
                  width: '20px',
                  height: '20px',
                },
              }}
            >
              {item.icon}
            </ListItemIcon>
          )}

          <ListItemText
            primary={
              <Typography
                variant="body_md"
                fontWeight="bold"
                color={textColor}
                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
              >
                {item.label}{' '}
                {isEnrollmentItem && (
                  <Chip
                    color={enrolled ? 'success' : 'secondary'}
                    label={enrolled ? 'Active' : 'Inactive'}
                    size="small"
                    sx={{
                      color: enrolled ? 'success.main' : 'text.secondary',
                      borderColor: enrolled ? 'success.main' : 'text.secondary',
                      backgroundColor: enrolled ? 'success.50' : 'grey.50',
                      borderRadius: 3,
                      borderWidth: 0.5,
                    }}
                  />
                )}
              </Typography>
            }
          />

          {hasChildren && (
            <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
              {isExpanded ? (
                <ExpandLess fontSize="small" />
              ) : (
                <ExpandMore fontSize="small" />
              )}
            </Box>
          )}
        </>
      );

      return (
        <Box
          key={item.id}
          component={AccessControl}
          allowedPermissions={item.permission ?? []}
        >
          <ListItem
            disablePadding
            sx={{
              opacity: isDisabled ? 0.6 : 1,
            }}
          >
            {hasPath && !hasChildren ? (
              <ListItemButton
                component={RouterLink}
                to={item.path as string}
                onClick={() => onMenuItemClick?.(item)}
                disabled={isDisabled}
                sx={{
                  borderRadius: '6px',
                  padding: '0.75rem 1rem',
                  backgroundColor: (theme) =>
                    item.isActive
                      ? theme.palette.background['brand-subtle']
                      : theme.palette.common.white,
                }}
              >
                {buttonContent}
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => handleItemClick(item)}
                disabled={isDisabled}
              >
                {buttonContent}
              </ListItemButton>
            )}
          </ListItem>

          {hasChildren && (
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {renderMenuItems(item.children!, level + 1)}
              </List>
            </Collapse>
          )}
        </Box>
      );
    });
  };

  return (
    <Stack
      sx={{
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        borderBottom={(theme) => `1px solid ${theme.palette.border.tertiary}`}
        height={HEADER_HEIGHT + 1}
      >
        LOGO
      </Stack>

      <List
        sx={{
          flex: 1,
          overflow: 'auto',
          padding: '1.2rem 1rem',
          borderBottom: (theme) => `1px solid ${theme.palette.border.tertiary}`,
        }}
      >
        {menuItems.length > 0 ? (
          renderMenuItems(menuItems)
        ) : (
          <Box sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: 'primary.main' }}>
              No menu items available
            </Typography>
          </Box>
        )}
      </List>

      <Button
        variant="outlined"
        color="error"
        sx={{
          border: 0,
        }}
        startIcon={<LogoutIcon sx={{ rotate: '180deg' }} />}
        onClick={() => logout({ navigate })}
      >
        {t('common.logout', 'Logout')}
      </Button>
    </Stack>
  );
};

export default Sidebar;
