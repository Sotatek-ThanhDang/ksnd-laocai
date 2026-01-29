import type { MuiComponent } from '../type';

export const MuiOutlinedInput: MuiComponent<'MuiOutlinedInput'> = {
  styleOverrides: {
    root: ({ theme }) => ({
      boxSizing: 'border-box',
      borderRadius: 8,
      minHeight: '3rem',

      '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
        {
          WebkitAppearance: 'none',
          margin: 0,
        },

      '& input[type=number]': {
        MozAppearance: 'textfield',
      },

      '& .MuiOutlinedInput-input': {
        padding: '0.75rem',
        boxSizing: 'border-box',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },

      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.border.secondary,
      },

      '&.Mui-disabled': {
        background: theme.palette.background.secondary,
        '& .MuiOutlinedInput-input': {
          color: theme.palette.text.quaternary,
          cursor: 'not-allowed',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: theme.palette.border.secondary,
        },
      },
    }),
    sizeSmall: () => ({
      minHeight: '2.5rem',
      '& .MuiOutlinedInput-input': {
        padding: '0.5rem 0.75rem',
      },
    }),
  },
};
