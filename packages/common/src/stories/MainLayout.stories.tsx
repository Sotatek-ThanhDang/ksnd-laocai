import { Box, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentPropsWithoutRef } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { fn } from 'storybook/test';

import { MainLayout } from '../components/layout/MainLayout';
import type { MenuItem, UserProfile } from '../types';

const sampleMenuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', path: '/dashboard' },
  { id: 'users', label: 'Users', path: '/users' },
  { id: 'settings', label: 'Settings', path: '/settings' },
  { id: 'reports', label: 'Reports', path: '/reports' },
];

const sampleUserProfile: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: undefined,
};

type MainLayoutStoryProps = Partial<
  ComponentPropsWithoutRef<typeof MainLayout>
>;

const MainLayoutStory = ({
  sidebarMenuItems,
  userProfile,
  children,
}: MainLayoutStoryProps) => {
  return (
    <BrowserRouter>
      <MainLayout
        sidebarMenuItems={sidebarMenuItems}
        onMenuItemClick={fn()}
        onUserProfileClick={fn()}
        userProfile={userProfile}
      >
        {children}
      </MainLayout>
    </BrowserRouter>
  );
};

MainLayoutStory.displayName = 'MainLayout';

const meta = {
  title: 'Layout/Main Layout',
  component: MainLayoutStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    sidebarMenuItems: sampleMenuItems,
    userProfile: sampleUserProfile,
    children: (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Main Content Area
        </Typography>
        <Typography variant="body1" color="text.secondary">
          This is the main content area of the layout. You can place any content
          here.
        </Typography>
      </Box>
    ),
  },
  argTypes: {
    sidebarMenuItems: {
      control: { type: 'object' },
      description: 'Control the sidebar menu',
    },
    userProfile: {
      control: { type: 'object' },
      description: 'Control the user profile in the header',
    },
    children: {
      control: { type: 'object', disable: true },
      description: 'Control the main content of the page',
    },
  },
} satisfies Meta<typeof MainLayoutStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: MainLayoutStoryProps) => <MainLayoutStory {...args} />;

export const Default: Story = {
  render: Template,
};

export const WithoutSidebar: Story = {
  args: {
    sidebarMenuItems: [],
  },
  render: Template,
};

export default meta;
