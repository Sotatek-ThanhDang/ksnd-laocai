import { Typography } from '@mui/material';
import { Stack } from '@mui/material';

export const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <Stack
    direction="row"
    justifyContent="space-between"
    alignItems="start"
    gap={2}
    width="100%"
  >
    <Typography variant="body_lg" color="text.quaternary">
      {label}
    </Typography>
    <Typography
      variant="body_lg"
      color="text.primary"
      fontWeight={600}
      flex={1}
      sx={{ wordBreak: 'break-word', textAlign: 'right' }}
    >
      {value}
    </Typography>
  </Stack>
);
