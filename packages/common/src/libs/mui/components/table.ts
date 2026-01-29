import type { MuiComponent } from '../type';

export const MuiTableContainer: MuiComponent<'MuiTableContainer'> = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: '0.5rem',
      border: `1px solid ${theme.palette.border.secondary}`,
    }),
  },
};

export const MuiTable: MuiComponent<'MuiTable'> = {
  styleOverrides: {
    root: {},
  },
};

export const MuiTableHead: MuiComponent<'MuiTableHead'> = {
  styleOverrides: {
    root: ({ theme }) => ({
      '& .MuiTableCell-root': {
        backgroundColor: theme.palette.background.secondary,
        height: '3rem',
        padding: '14px 16px',
        ...theme.typography.body_md,
        fontWeight: 600,
        color: theme.palette.text.quaternary,
      },
    }),
  },
};

export const MuiTableBody: MuiComponent<'MuiTableBody'> = {
  styleOverrides: {
    root: {},
  },
};

export const MuiTableRow: MuiComponent<'MuiTableRow'> = {
  styleOverrides: {
    root: () => ({
      '&:last-child td, &:last-child th': {
        border: 0,
      },
    }),
  },
};

export const MuiTableCell: MuiComponent<'MuiTableCell'> = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body_md,
      padding: '16px 16px',
      whiteSpace: 'normal',
    }),
  },
};
