import { stepConnectorClasses, stepLabelClasses } from '@mui/material';
import { stepClasses } from '@mui/material/Step';

import type { MuiComponent } from '../type';

export const MuiStepper: MuiComponent<'MuiStepper'> = {
  styleOverrides: {
    root: {
      [`& .${stepClasses.root}`]: {
        padding: '0 10px',
      },
    },
    alternativeLabel: ({ theme }) => ({
      [`& .${stepConnectorClasses.line}`]: {
        borderTopWidth: 4,
        borderTopStyle: 'dotted',
        borderTopColor: theme.palette.grey[300],
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        minHeight: 2,
        borderRadius: 0,
        borderImage: 'none',
      },

      [`& .${stepConnectorClasses.root}.Mui-active .${stepConnectorClasses.line}`]:
        {
          borderTopColor: theme.palette.primary.main,
        },

      [`& .${stepConnectorClasses.root}.Mui-completed .${stepConnectorClasses.line}`]:
        {
          borderTopColor: theme.palette.primary.main,
        },
    }),
  },
};

export const MuiStepIcon: MuiComponent<'MuiStepIcon'> = {
  styleOverrides: {
    root: ({ theme }) => ({
      width: 32,
      height: 32,
      color: theme.palette.primary.main,
      fontSize: 32,
    }),
    text: ({ theme }) => ({
      fill: theme.palette.primary.contrastText,
    }),
  },
};

export const MuiStepLabel: MuiComponent<'MuiStepLabel'> = {
  styleOverrides: {
    root: ({ theme }) => ({
      [`& .${stepLabelClasses.labelContainer} > span`]: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        color: theme.palette.grey[700],
      },
      [`& .${stepLabelClasses.label}`]: {
        marginTop: theme.spacing(2),
        fontSize: '1rem',
        fontWeight: 400,
        color: theme.palette.text.primary,
      },
      [`& .${stepLabelClasses.label}.${stepLabelClasses.active}`]: {
        color: theme.palette.primary.main,
        fontWeight: 600,
      },
      [`& .${stepLabelClasses.label}.${stepLabelClasses.completed}`]: {
        color: theme.palette.text.primary,
        fontWeight: 600,
      },
      '& .MuiStepLabel-optional': {
        color: `${theme.palette.text.secondary} !important`,
      },
    }),
  },
};
