import { chipClasses } from '@mui/material/Chip';

import {
  blue,
  brand,
  cyan,
  error,
  gray,
  sky,
  success,
  warning,
} from '../../../common';
import { type MuiComponent } from '../type';

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    brand: true;
    sky: true;
    blue: true;
    cyan: true;
  }
}

export const MuiChip: MuiComponent<'MuiChip'> = {
  defaultProps: {
    size: 'small',
    color: 'primary',
    variant: 'filled',
  },
  styleOverrides: {
    root: ({ theme }) => ({
      textTransform: 'capitalize',
      border: '1px solid transparent',

      [`&.${chipClasses.filledPrimary}`]: {
        borderColor: blue[200],
        color: blue[700],
        background: blue[50],
      },
      [`&.${chipClasses.filledSecondary}`]: {
        borderColor: gray[200],
        color: gray[700],
        background: gray[50],
      },
      [`&.${chipClasses.outlinedPrimary}`]: {
        borderColor: theme.palette.primary.main,
        color: theme.palette.primary.main,
        background: 'transparent',
      },
    }),
    sizeSmall: ({ theme }) => ({
      ...theme.typography.body_sm,
      borderRadius: '6px',
      fontWeight: 400,
    }),
    sizeMedium: ({ theme }) => ({
      ...theme.typography.body_md,
      padding: '0.25rem 0rem',
      borderRadius: '8px',
      fontWeight: 600,
    }),
  },
  variants: [
    {
      props: { color: 'secondary', variant: 'filled' },
      style: {
        backgroundColor: gray[50],
        color: gray[700],
        borderColor: gray[200],
      },
    },
    {
      props: { color: 'secondary', variant: 'outlined' },
      style: {
        borderColor: gray[300],
        color: gray[700],
        backgroundColor: 'transparent',
      },
    },
    {
      props: { color: 'success', variant: 'filled' },
      style: {
        backgroundColor: success[50],
        color: success[700],
        borderColor: success[200],
      },
    },
    {
      props: { color: 'success', variant: 'outlined' },
      style: {
        color: success[500],
        borderColor: success[700],
        background: 'transparent',
      },
    },
    {
      props: { color: 'error', variant: 'filled' },
      style: {
        backgroundColor: error[50],
        color: error[700],
        borderColor: error[200],
      },
    },
    {
      props: { color: 'error', variant: 'outlined' },
      style: {
        backgroundColor: error[500],
        borderColor: error[700],
        background: 'transparent',
      },
    },
    {
      props: { color: 'warning', variant: 'filled' },
      style: {
        backgroundColor: warning[50],
        color: warning[700],
        borderColor: warning[200],
      },
    },
    {
      props: { color: 'warning', variant: 'outlined' },
      style: {
        color: warning[500],
        borderColor: warning[700],
        background: 'transparent',
      },
    },
    {
      props: { color: 'sky', variant: 'filled' },
      style: {
        backgroundColor: sky[50],
        color: sky[700],
        borderColor: sky[200],
      },
    },
    {
      props: { color: 'sky', variant: 'outlined' },
      style: {
        backgroundColor: 'transparent',
        color: sky[500],
        borderColor: sky[700],
      },
    },
    {
      props: { color: 'blue', variant: 'filled' },
      style: {
        backgroundColor: blue[50],
        color: blue[700],
        borderColor: sky[200],
      },
    },
    {
      props: { color: 'brand', variant: 'filled' },
      style: {
        backgroundColor: brand[50],
        color: brand[700],
        borderColor: brand[200],
      },
    },
    {
      props: { color: 'brand', variant: 'outlined' },
      style: {
        backgroundColor: 'transparent',
        color: brand[500],
        borderColor: brand[700],
      },
    },
    {
      props: { color: 'cyan', variant: 'filled' },
      style: {
        backgroundColor: cyan[50],
        color: cyan[700],
        borderColor: cyan[200],
      },
    },
    {
      props: { color: 'cyan', variant: 'outlined' },
      style: {
        backgroundColor: 'transparent',
        color: cyan[500],
        borderColor: cyan[700],
      },
    },
  ],
};
