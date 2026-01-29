import type { MuiComponent } from '../type';

export const MuiFormControlLabel: MuiComponent<'MuiFormControlLabel'> = {
  styleOverrides: {
    root: {},
    label: ({ theme }) => ({
      ...theme.typography.body_md,
    }),
  },
};
