import { Backdrop, Box, Stack } from '@mui/material';
import Lottie from 'lottie-react';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { usePageLoading } from '../../contexts';
import { loadingAnimation } from '../../lotties';

const MIN_LOADING_TIME = 1500;

export const PageLoading: FC = () => {
  const { loading } = usePageLoading();

  const [visible, setVisible] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (loading) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }
      setVisible(true);
    } else {
      const startedAt = startTimeRef.current;
      if (!startedAt) {
        setVisible(false);
        return;
      }

      const elapsed = Date.now() - startedAt;

      if (elapsed >= MIN_LOADING_TIME) {
        setVisible(false);
        startTimeRef.current = null;
      } else {
        const remaining = MIN_LOADING_TIME - elapsed;
        const id = window.setTimeout(() => {
          setVisible(false);
          startTimeRef.current = null;
          timeoutRef.current = null;
        }, remaining);

        timeoutRef.current = id;
      }
    }

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loading]);

  return (
    <Backdrop
      open={visible}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Stack spacing={2} alignItems="center">
        <Box sx={{ width: 160, maxWidth: '60vw' }}>
          <Lottie animationData={loadingAnimation} loop autoplay />
        </Box>
      </Stack>
    </Backdrop>
  );
};
