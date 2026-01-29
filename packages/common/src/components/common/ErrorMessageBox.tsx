import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, useTheme } from '@mui/material';
import type { ReactNode } from 'react';

interface ErrorMessageBoxProps {
  message: string;
  icon?: ReactNode;
}

export const ErrorMessageBox = ({
  message,
  icon = <CloseIcon sx={{ fontSize: '1.5rem' }} />,
}: ErrorMessageBoxProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.error[500]}`,
        borderColor: theme.palette.error[500],
        borderRadius: 1,
        p: 2,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        backgroundColor: theme.palette.error[50],
      }}
    >
      <Box
        sx={{
          width: 24,
          height: 24,
          borderRadius: '50%',
          border: `2px solid ${theme.palette.error[500]}`,
          borderColor: theme.palette.error[500],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: theme.palette.error.main,
          backgroundColor: theme.palette.error[50],
        }}
      >
        {icon}
      </Box>

      <Typography variant="body2" color={theme.palette.error.main}>
        {message}
      </Typography>
    </Box>
  );
};

export default ErrorMessageBox;
