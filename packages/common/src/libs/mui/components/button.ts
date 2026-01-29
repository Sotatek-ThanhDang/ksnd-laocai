import { type MuiComponent } from '../type';

export const MuiButton: MuiComponent<'MuiButton'> = {
  defaultProps: {
    variant: 'contained',
    size: 'medium',
    color: 'primary',
    disableElevation: true,
    disableRipple: true,
    disableFocusRipple: true,
    disableTouchRipple: true,
  },
  variants: [],
  styleOverrides: {
    root: ({ theme }) => ({
      textTransform: 'capitalize',
      fontWeight: 600,
      borderRadius: '8px',

      ':disabled': {
        backgroundColor: theme.palette.grey[100],
        color: theme.palette.grey[400],
        cursor: 'not-allowed',
      },
    }),
    sizeLarge: ({ theme }) => ({
      ...theme.typography.body_lg,
      minHeight: '3rem',
      paddingInline: '1.375rem',
    }),
    sizeMedium: ({ theme }) => ({
      ...theme.typography.body_lg,
      minHeight: '2.5rem',
      paddingInline: '1rem',
    }),
    sizeSmall: ({ theme }) => ({
      ...theme.typography.body_sm,
      minHeight: '2rem',
      paddingInline: '0.75rem',
    }),
  },
};
