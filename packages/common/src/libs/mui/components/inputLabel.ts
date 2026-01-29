import { selectClasses } from '@mui/material/Select';
import type { Theme } from '@mui/material/styles';
import { textFieldClasses } from '@mui/material/TextField';
import { pickersTextFieldClasses } from '@mui/x-date-pickers';

import type { MuiComponent } from '../type';

const commonSpacing = (theme: Omit<Theme, 'components'>) => ({
  marginTop: theme.spacing(3),
});

export const MuiInputLabel: MuiComponent<'MuiInputLabel'> = {
  defaultProps: { shrink: true },
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body_md,
      translate: 0,
      transform: 'none',
      padding: 0,
      color: theme.palette.text.primary,

      [`+ .${selectClasses.root}`]: {
        ...commonSpacing(theme),
      },
      [`+ .${textFieldClasses.root}`]: {
        ...commonSpacing(theme),
      },
      [`+ .${pickersTextFieldClasses.root}`]: {
        ...commonSpacing(theme),
      },
      '+ textarea': {
        ...commonSpacing(theme),
      },
    }),
  },
};
