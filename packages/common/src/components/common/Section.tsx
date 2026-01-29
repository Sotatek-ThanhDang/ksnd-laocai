import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Section = styled(Box, {
  name: 'MuiSection',
  slot: 'Root',
  shouldForwardProp: (props) => props !== 'withBorder',
})<{ withBorder?: boolean }>(({ theme, withBorder }) => ({
  borderRadius: '10px',
  backgroundColor: theme.palette.background.primary,
  padding: '1.25rem',
  ...(withBorder && {
    border: `1px solid ${theme.palette.border.secondary}`,
  }),
}));
