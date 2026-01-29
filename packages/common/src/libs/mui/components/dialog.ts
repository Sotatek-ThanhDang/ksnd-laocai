import {
  dialogActionsClasses,
  dialogContentClasses,
  dialogTitleClasses,
} from '@mui/material';

import type { MuiComponent } from '../type';

export const MuiDialog: MuiComponent<'MuiDialog'> = {
  defaultProps: {
    fullWidth: true,
    maxWidth: 'sm',
  },
  styleOverrides: {
    paper: ({ theme }) => ({
      borderRadius: '1rem',
      padding: '1.5rem',
      gap: '1.5rem',
      [`& .${dialogTitleClasses.root}`]: {
        ...theme.typography.h7,
        padding: 0,
        fontWeight: 600,
        textAlign: 'center',
        textTransform: 'capitalize',
      },
      [`& .${dialogContentClasses.root}`]: {
        padding: '0',
      },
      [`& .${dialogActionsClasses.root}`]: {
        padding: '0',
        gap: '0.25rem',
      },
    }),
  },
};
