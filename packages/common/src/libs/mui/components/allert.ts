import { blue, error, success, warning } from '../../../common';
import type { MuiComponent } from '../type';

export const MuiAlert: MuiComponent<'MuiAlert'> = {
  defaultProps: {
    variant: 'filled',
  },
  styleOverrides: {
    root: () => ({
      border: '1px solid',
      borderRadius: '10px',
      alignItems: 'center',
      '& .MuiAlert-icon': {
        display: 'flex',
        alignItems: 'center',
      },
    }),
  },
  variants: [
    // Success
    {
      props: { severity: 'success', variant: 'filled' },
      style: {
        backgroundColor: success[50],
        color: success[500],
        borderColor: success[100],
      },
    },
    {
      props: { severity: 'success', variant: 'outlined' },
      style: {
        backgroundColor: 'transparent',
        color: success[600],
        borderColor: success[700],
      },
    },

    // Error
    {
      props: { severity: 'error', variant: 'filled' },
      style: {
        backgroundColor: error[50],
        color: error[500],
        borderColor: error[200],
      },
    },
    {
      props: { severity: 'error', variant: 'outlined' },
      style: {
        backgroundColor: 'transparent',
        color: error[600],
        borderColor: error[700],
      },
    },

    // Warning
    {
      props: { severity: 'warning', variant: 'filled' },
      style: {
        backgroundColor: warning[50],
        color: warning[700],
        borderColor: warning[200],
      },
    },
    {
      props: { severity: 'warning', variant: 'outlined' },
      style: {
        backgroundColor: 'transparent',
        color: warning[600],
        borderColor: warning[700],
      },
    },

    // Info
    {
      props: { severity: 'info', variant: 'filled' },
      style: {
        backgroundColor: blue[50],
        color: blue[700],
        borderColor: blue[200],
      },
    },
    {
      props: { severity: 'info', variant: 'outlined' },
      style: {
        backgroundColor: 'transparent',
        color: blue[600],
        borderColor: blue[700],
      },
    },
  ],
};
