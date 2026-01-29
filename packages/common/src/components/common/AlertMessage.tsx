import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import type { SxProps } from '@mui/material';
import Alert from '@mui/material/Alert';
import React, { type FC } from 'react';

interface AlertMessageProps {
  message: string | React.ReactNode;
  type: 'success' | 'error' | 'warning' | 'info';
  icon?: React.ReactNode;
  sx?: SxProps;
  children?: React.ReactNode;
  button?: React.ReactNode;
}

const iconMap = {
  success: <CheckCircleOutlineIcon fontSize="inherit" />,
  error: <HighlightOffIcon fontSize="inherit" />,
  warning: <ReportProblemOutlinedIcon fontSize="inherit" />,
  info: <InfoOutlinedIcon fontSize="inherit" />,
};

export const AlertMessage: FC<AlertMessageProps> = ({
  message,
  type,
  icon,
  sx,
  children,
  button,
}) => {
  const defaultIcon = iconMap[type as keyof typeof iconMap] ?? (
    <InfoOutlinedIcon fontSize="inherit" />
  );
  return (
    <Alert
      icon={icon || defaultIcon}
      severity={type}
      sx={{ ...sx }}
      action={button}
    >
      {message || children}
    </Alert>
  );
};
