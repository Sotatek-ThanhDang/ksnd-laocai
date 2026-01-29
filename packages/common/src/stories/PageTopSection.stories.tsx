import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentPropsWithoutRef } from 'react';
import { fn } from 'storybook/test';

import PageTopSection from '../components/common/PageTopSection';

type PageTopSectionStoryProps = ComponentPropsWithoutRef<typeof PageTopSection>;

const PageTopSectionStory = ({
  title = 'Page Title',
  description,
  onBack,
  rightElement,
}: PageTopSectionStoryProps) => {
  return (
    <div style={{ width: 800 }}>
      <PageTopSection
        title={title}
        description={description}
        onBack={onBack}
        rightElement={rightElement}
      />
    </div>
  );
};

PageTopSectionStory.displayName = 'PageTopSection';

const meta = {
  title: 'Layout/Page Top Section',
  component: PageTopSectionStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    title: 'Page Title',
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'The main title of the page',
    },
    description: {
      control: { type: 'text' },
      description: 'Optional description text below the title',
    },
    onBack: {
      control: { type: 'object', disable: true },
      description: 'Custom action for the back button',
    },
    rightElement: {
      control: { type: 'object', disable: true },
      description: 'Custom a right-aligned action element',
    },
  },
} satisfies Meta<typeof PageTopSectionStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: PageTopSectionStoryProps) => (
  <PageTopSectionStory {...args} />
);

export const Default: Story = {
  render: Template,
};

export const WithDescription: Story = {
  args: {
    description:
      'This page allows you to manage user settings and preferences.',
  },
  render: Template,
};

export const WithBackButton: Story = {
  args: {
    onBack: fn,
    title: 'User Details',
  },
  render: Template,
};

export const WithRightElement: Story = {
  args: {
    rightElement: (
      <Button variant="contained" size="small">
        Action
      </Button>
    ),
    title: 'Settings',
  },
  render: Template,
};

export const FullFeatured: Story = {
  args: {
    title: 'Edit Profile',
    description: 'Update your personal information and preferences',
    onBack: fn,
    rightElement: (
      <Button variant="contained" size="small">
        Action
      </Button>
    ),
  },
  render: Template,
};

export default meta;
