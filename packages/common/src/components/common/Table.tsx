import { Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import {
  DataGrid,
  type DataGridProps,
  type GridColDef,
  type GridRowsProp,
} from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';

export type TypedGridColDef<T extends object> = Omit<GridColDef<T>, 'field'> & {
  field: keyof T;
};

interface TableProps extends DataGridProps {
  rows: GridRowsProp;
  columns: GridColDef[];
  pageCount?: number;
  page?: number;
  onPageChange?: (page: number) => void;
}

const Table = ({
  rows,
  columns,
  pageCount = 0,
  page = 0,
  onPageChange,
  ...rest
}: TableProps) => {
  const { t } = useTranslation();

  return (
    <Stack width="100%" gap={2.5}>
      <DataGrid
        {...rest}
        autoHeight
        rows={rows}
        columns={columns}
        hideFooter={true}
        getRowHeight={() => 'auto'}
        sx={{
          '& .MuiDataGrid-cell': {
            py: 1,
          },
          ...rest.sx,
        }}
        slots={{
          noRowsOverlay: () => (
            <Stack height="100%" justifyContent="center" alignItems="center">
              <Typography
                variant="body_lg"
                color="text.primary"
                sx={{ transform: 'translateY(-50%)' }}
              >
                {t('common.noDataTable', 'No data available in table')}
              </Typography>
            </Stack>
          ),
        }}
      />
      {pageCount > 1 && (
        <Stack flexDirection="row" alignSelf="flex-end">
          <PaginationItem
            type="first"
            disabled={page - 10 < 0}
            onClick={() => {
              onPageChange?.(Math.max(page - 10, 0));
            }}
          />
          <Pagination
            color="primary"
            count={pageCount}
            page={page + 1}
            onChange={(_, value) => onPageChange?.(value - 1)}
            size="medium"
          />
          <PaginationItem
            type="last"
            disabled={page + 10 >= pageCount}
            onClick={() => {
              onPageChange?.(Math.min(page + 10, pageCount));
            }}
          />
        </Stack>
      )}
    </Stack>
  );
};

export { Table };
