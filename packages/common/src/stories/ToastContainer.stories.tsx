import { Button, Container } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { toast } from 'react-toastify';

import { ToastContainer } from '../components/common/ToastContainer';

const ToastContainerStory = (_: unknown) => {
  const showSuccessToast = () => {
    toast.success('This is a success message!');
  };

  const showErrorToast = () => {
    toast.error('This is an error message!');
  };

  const showInfoToast = () => {
    toast.info('This is an info message!');
  };

  const showWarningToast = () => {
    toast.warning('This is a warning message!');
  };

  return (
    <Container
      maxWidth="md"
      sx={{ display: 'flex', gap: 2, height: '50vh', alignItems: 'center' }}
    >
      <Button onClick={showSuccessToast} variant="outlined" color="success">
        Show Success Toast
      </Button>
      <Button onClick={showErrorToast} variant="outlined" color="error">
        Show Error Toast
      </Button>
      <Button onClick={showInfoToast} variant="outlined" color="info">
        Show Info Toast
      </Button>
      <Button onClick={showWarningToast} variant="outlined" color="warning">
        Show Warning Toast
      </Button>
      <ToastContainer />
    </Container>
  );
};

ToastContainerStory.displayName = 'ToastContainer';

const meta = {
  title: 'Feedback/Toast',
  component: ToastContainerStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ToastContainerStory>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ToastContainerStory,
};

export default meta;
