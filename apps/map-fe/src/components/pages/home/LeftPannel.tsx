import { Box, Divider, Paper, TextField, Typography } from '@mui/material';
import { Table, type TypedGridColDef } from '@repo/common';
import { useMemo, useState } from 'react';

import {
  useHomeDispatchContext,
  useHomeStateContext,
} from '@/context/HomeContextProvider';
import type { Ward } from '@/types/home';

const wardColumns: TypedGridColDef<Ward>[] = [
  {
    field: 'order',
    headerName: 'TT',
    width: 60,
  },
  {
    field: 'name',
    headerName: 'Phường/Xã mới',
    flex: 1,
    minWidth: 160,
  },
  {
    field: 'previous',
    headerName: 'Phường/Xã trước sáp nhập',
    flex: 2,
    minWidth: 240,
  },
];

export const LeftPanel = () => {
  const { data, selectedWard } = useHomeStateContext();
  const { setSelectedWard } = useHomeDispatchContext();
  const [searchText, setSearchText] = useState('');

  const filteredRows = useMemo(() => {
    const value = searchText.trim().toLowerCase();
    if (!value) return data;

    return data.filter((row) => row.name.toLowerCase().includes(value));
  }, [searchText, data]);

  return (
    <Paper
      elevation={3}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'grey.50',
      }}
    >
      <Box
        sx={{
          px: 2,
          py: 1.5,
          bgcolor: 'primary.main',
          color: 'common.white',
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold">
          DANH MỤC TRA CỨU
        </Typography>
        <Typography variant="body2">Đơn vị hành chính cấp xã</Typography>
      </Box>

      <Box
        sx={{
          p: 2,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 'bold', mb: 1, color: 'text.primary' }}
        >
          Phường/Xã mới
        </Typography>
        <TextField
          fullWidth
          placeholder="nhập tên cần tìm"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
        }}
      >
        <Table
          getRowId={(row) => row.order}
          onRowClick={({ row }) => {
            setSelectedWard((pre) => (pre?.id === row.id ? undefined : row));
          }}
          getRowClassName={(params) =>
            params.row.id === selectedWard?.id ? 'Mui-selected' : ''
          }
          rows={filteredRows}
          columns={wardColumns}
        />
      </Box>

      <Divider />
      <Box sx={{ p: 1.5, bgcolor: 'grey.100' }}>
        <Typography variant="caption" color="text.secondary">
          Chọn phường/xã để xem thông tin chi tiết trên bản đồ bên phải.
        </Typography>
      </Box>
    </Paper>
  );
};
