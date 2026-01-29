import { axisClasses } from '@mui/x-charts';

import type { MuiComponent } from '../type';
export const MuiChartsAxis: MuiComponent<'MuiChartsAxis'> = {
  styleOverrides: {
    root: ({ theme }) => ({
      [`.${axisClasses.tickLabel}`]: {
        ...theme.typography.body_sm,
        fill: theme.palette.text.senary,
      },
    }),
  },
};
