import type { MuiComponent } from '../type';

export const MuiTab: MuiComponent<'MuiTab'> = {
  defaultProps: {},
  styleOverrides: {
    root: {
      height: '2rem',
      minHeight: '2rem',
      paddingTop: '10px',
      paddingBottom: '10px',
      paddingLeft: '6px',
      paddingRight: '6px',
      borderRadius: 0,
      textTransform: 'none',
    },
  },
};
