import { Button, Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { PageLoading as CustomPageLoading } from '../components/layout/PageLoading';
import { PageLoadingProvider } from '../contexts';
import { usePageLoading } from '../contexts/PageLoadingContext';

const PageLoading = () => {
  const { loading, setLoading } = usePageLoading();

  return (
    <Stack justifyContent="center" alignItems="center" height="50vh">
      <Stack justifyContent="center" spacing={3} alignItems="center">
        <Typography variant="h6">Page loading overlay</Typography>

        <Button
          variant="contained"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
            }, 1000);
          }}
        >
          Show loading
        </Button>

        <Typography variant="body1">
          Current state: {loading ? 'Loading… (visible for min 1.5s)' : 'Idle'}
        </Typography>
      </Stack>

      <CustomPageLoading />
    </Stack>
  );
};

const meta = {
  title: 'Feedback/Page Loading',
  component: CustomPageLoading,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CustomPageLoading>;

type Story = StoryObj<typeof meta>;

const Template = (_: unknown) => {
  return (
    <PageLoadingProvider>
      <PageLoading />
    </PageLoadingProvider>
  );
};

export const Default: Story = {
  render: Template,
};

export default meta;
