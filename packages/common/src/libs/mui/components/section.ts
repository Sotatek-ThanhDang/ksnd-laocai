import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MuiSection = styled(Box, {
  name: 'MuiSection',
  slot: 'Root',
})(({ theme }) => ({
  borderRadius: '10px',
  backgroundColor: theme.palette.background.paper,
  padding: '1.25rem',
  marginBottom: theme.spacing(2),
}));
