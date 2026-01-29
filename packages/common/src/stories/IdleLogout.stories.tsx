import { Alert, Box, Button, Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentPropsWithoutRef } from 'react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';

import { IdleLogout } from '../components/layout/IdleLogout';

type IdleLogoutStoryProps = ComponentPropsWithoutRef<typeof IdleLogout>;

const DashboardDemo = (props: IdleLogoutStoryProps) => {
  const seconds = Math.round(props.timeout / 1000);

  return (
    <Stack spacing={2}>
      <Alert severity={props.enabled ? 'info' : 'warning'}>
        {props.enabled
          ? `Remain idle for ${seconds}s to trigger logout. Interact with the page to reset the timer.`
          : 'Idle logout is disabled. Toggle it on with the controls panel.'}
      </Alert>
      <Typography variant="body1">Current Route: /dashboard</Typography>
      <Typography variant="body2" color="text.secondary">
        This view simulates a dashboard page. When the idle timer fires, you
        will be redirected to the logged-out screen below.
      </Typography>
      <IdleLogout {...props} />
    </Stack>
  );
};

const LoggedOutDemo = () => {
  const navigate = useNavigate();

  return (
    <Stack spacing={2}>
      <Alert severity="success">Idle logout callback executed</Alert>
      <Typography>
        You have been redirected to this page via <code>logout()</code>. Click
        below to return to the dashboard route and test again.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/dashboard')}>
        Back to dashboard
      </Button>
    </Stack>
  );
};

const IdleLogoutStory = (props: IdleLogoutStoryProps) => (
  <MemoryRouter initialEntries={['/dashboard']}>
    <Box sx={{ p: 4, maxWidth: 640, mx: 'auto' }}>
      <Routes>
        <Route path="/" element={<LoggedOutDemo />} />
        <Route path="/dashboard" element={<DashboardDemo {...props} />} />
      </Routes>
    </Box>
  </MemoryRouter>
);

IdleLogoutStory.displayName = 'IdleLogout';

const meta = {
  title: 'Components/Idle Logout',
  component: IdleLogoutStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    enabled: true,
    timeout: 5000,
    name: 'storybook-idle-logout',
  },
  argTypes: {
    enabled: {
      control: { type: 'boolean' },
      description: 'Turns the idle detection on or off.',
    },
    timeout: {
      control: { type: 'number', min: 1000, step: 1000 },
      description:
        'Idle timeout in milliseconds before triggering logout (default 5s).',
    },
    name: {
      control: { type: 'text' },
      description: 'Identifier shared across tabs for leader election.',
    },
  },
} satisfies Meta<typeof IdleLogoutStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: IdleLogoutStoryProps) => <IdleLogoutStory {...args} />;

export const Default: Story = {
  render: Template,
};

export default meta;
