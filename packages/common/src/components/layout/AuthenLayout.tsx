import { type BoxProps } from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { validateAuthToken } from '../../utils/auth';

export function AuthenLayout({
  children,
  path,
  // ...containerStyle
}: {
  children: ReactNode;
  path: string;
} & BoxProps) {
  const { hasToken } = validateAuthToken();

  if (hasToken) {
    return <Navigate to={path} />;
  }

  return (
    <Stack
      width="100%"
      minHeight={'100vh'}
      alignItems="center"
      justifyContent="center"
    >
      {/* <Box
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        {...containerStyle}
      > */}
      {children}
      {/* </Box> */}
    </Stack>
  );
}
