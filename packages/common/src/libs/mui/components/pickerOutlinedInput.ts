import type { MuiComponent } from '../type';

export const MuiPickersOutlinedInput: MuiComponent<'MuiPickersOutlinedInput'> =
  {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 8,
        minHeight: '2.5rem',
        '& .MuiPickersOutlinedInput-notchedOutline': {
          borderColor: theme.palette.border.secondary,
        },
        '&.Mui-disabled': {
          backgroundColor: theme.palette.background.secondary,
          cursor: 'not-allowed',

          '& .MuiPickersOutlinedInput-notchedOutline': {
            borderColor: theme.palette.border.secondary,
          },

          '& .MuiInputBase-input.Mui-disabled': {
            color: theme.palette.text.quaternary,
            WebkitTextFillColor: theme.palette.text.quaternary,
            opacity: 1,
          },
        },

        '&.Mui-disabled:hover .MuiPickersOutlinedInput-notchedOutline, &.Mui-disabled.Mui-focused .MuiPickersOutlinedInput-notchedOutline':
          {
            borderColor: theme.palette.border.secondary,
          },
      }),
    },
  };
