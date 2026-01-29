import { Container } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentPropsWithoutRef } from 'react';

import { ErrorMessageBox } from '../components/common/ErrorMessageBox';
import { MinusIcon } from '../components/common/icons';

type ErrorMessageBoxStoryProps = ComponentPropsWithoutRef<
  typeof ErrorMessageBox
>;

const ErrorMessageBoxStory = ({
  message = 'This is an error message that needs attention.',
  icon,
}: ErrorMessageBoxStoryProps) => {
  return (
    <Container maxWidth="md">
      <ErrorMessageBox message={message} icon={icon} />
    </Container>
  );
};

ErrorMessageBoxStory.displayName = 'ErrorMessageBox';

const meta = {
  title: 'Feedback/Error Message Box',
  component: ErrorMessageBoxStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    message: 'This is an error message that needs attention.',
  },
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'The error message to display',
    },
    icon: {
      control: { type: 'boolean' },
      description: 'Use a custom icon instead of the default close icon',
    },
  },
} satisfies Meta<typeof ErrorMessageBoxStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: ErrorMessageBoxStoryProps) => (
  <ErrorMessageBoxStory {...args} />
);

export const Default: Story = {
  render: Template,
};

export const WithCustomIcon: Story = {
  args: {
    message: 'Error with custom icon',
    icon: <MinusIcon sx={{ fontSize: '1.5rem' }} />,
  },
  render: Template,
};

export default meta;
