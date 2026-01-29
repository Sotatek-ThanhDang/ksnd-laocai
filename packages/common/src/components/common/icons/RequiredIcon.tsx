import { Typography } from '@mui/material';

export const RequiredIcon = () => {
  return (
    <Typography
      variant="body_md"
      color="error"
      sx={{ display: 'inline-block', transform: 'translate(4px, -1px)' }}
    >
      *
    </Typography>
  );
};
