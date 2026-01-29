import type { MuiComponent } from '../type';

export const MuiTextField: MuiComponent<'MuiTextField'> = {
  defaultProps: {
    size: 'small',
  },
  styleOverrides: {
    root: ({ theme }) => ({
      // padding: '0.5rem 0.75rem',
      borderRadius: 8,
      '& input:-webkit-autofill': {
        WebkitBoxShadow: '0 0 0 100px transparent inset',
        WebkitTextFillColor: theme.palette.text.primary,
        transition: 'background-color 9999s ease-in-out 0s',
        caretColor: theme.palette.text.primary,
      },
    }),
  },
};
