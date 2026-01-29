import { paginationItemClasses } from '@mui/material';

import type { MuiComponent } from '../type';

export const MuiPagination: MuiComponent<'MuiPagination'> = {
  defaultProps: {
    color: 'primary',
    size: 'small',
  },
  styleOverrides: {
    root: ({ theme }) => ({
      [`& .${paginationItemClasses.root}`]: {
        ...theme.typography.body_md,
        height: '2rem',
        width: '2rem',
        borderRadius: '0.375rem',
        color: theme.palette.text.quaternary,
        margin: '0 0.25rem',
        '&.Mui-selected': {
          backgroundColor: theme.palette.background.secondary,
          color: theme.palette.text.primary,
        },
        '&.Mui-selected:hover': {
          color: theme.palette.common.white,
        },
      },
    }),
  },
};
