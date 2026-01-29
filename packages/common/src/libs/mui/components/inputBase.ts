import type { MuiComponent } from '../type';

export const MuiInputBase: MuiComponent<'MuiInputBase'> = {
  styleOverrides: {
    root: () => ({
      borderRadius: 8,
      boxSizing: 'border-box',
    }),
  },
};
