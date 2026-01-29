import { Box, IconButton, Stack, Typography } from '@mui/material';
import type { FC } from 'react';

import { ChevronLeftIcon } from './icons/ChevronLeftIcon';

interface PageTopSectionProps {
  title: string;
  description?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

const PageTopSection: FC<PageTopSectionProps> = (props) => {
  const { title, description, onBack, rightElement = <></> } = props;
  return (
    <Stack
      direction="row"
      height="fit-content"
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      gap={4}
    >
      <Stack gap={1} flexGrow={1}>
        <Stack
          direction="row"
          gap={1.5}
          color="text.primary"
          alignItems="center"
        >
          {onBack && (
            <IconButton
              onClick={onBack}
              size="medium"
              color="inherit"
              sx={{
                height: '2rem',
                width: '2rem',
              }}
            >
              <ChevronLeftIcon fontSize="small" />
            </IconButton>
          )}
          <Typography variant="h5" fontWeight="600" color="text.primary">
            {title}
          </Typography>
        </Stack>
        {description && (
          <Typography
            variant="body_lg"
            color="text.quaternary"
            sx={{
              marginLeft: onBack ? '2.625rem' : 0,
            }}
          >
            {description}
          </Typography>
        )}
      </Stack>
      <Box flexShrink={0}>{rightElement}</Box>
    </Stack>
  );
};

export default PageTopSection;
