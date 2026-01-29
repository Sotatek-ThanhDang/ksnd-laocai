import { chartsGridClasses } from '@mui/x-charts';

import type { MuiComponent } from '../type';

export const MuiChartsGrid: MuiComponent<'MuiChartsGrid'> = {
  styleOverrides: {
    root: ({ theme }) => ({
      [`.${chartsGridClasses.horizontalLine}`]: {
        stroke: theme.palette.grey[200],
        strokeDasharray: '2, 5',
      },
    }),
  },
};
