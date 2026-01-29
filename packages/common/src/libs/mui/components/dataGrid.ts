import type { MuiComponent } from '../type';

export const MuiDataGrid: MuiComponent<'MuiDataGrid'> = {
  defaultProps: {
    disableColumnMenu: true,
    disableRowSelectionOnClick: true,
    showColumnVerticalBorder: false,
    // initialState: {
    //   pagination: {
    //     paginationModel: { pageSize: 10, page: 0 },
    //   },
    // },
  },
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: '0.5rem',
      borderColor: theme.palette.border.secondary,
      '& .MuiDataGrid-columnHeaders': {
        height: '3rem',
      },
      '& .MuiDataGrid-columnHeader': {
        backgroundColor: theme.palette.background.secondary,
        height: '3rem',
        padding: '14px 16px',
      },
      '& .MuiDataGrid-columnHeaderTitle': {
        ...theme.typography.body_md,
        fontWeight: 600,
        color: theme.palette.text.quaternary,
      },
      '& .MuiDataGrid-columnSeparator': {
        display: 'none',
      },
      '& .MuiDataGrid-cell': {
        ...theme.typography.body_md,
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'normal',
      },
      // '& .MuiDataGrid-row': {
      //   maxHeight: 'unset !important',
      //   height: 'min(52px, fit-content) !important',
      //   '--height': 'min(52px, fit-content) !important',
      // },
    }),
  },
};
