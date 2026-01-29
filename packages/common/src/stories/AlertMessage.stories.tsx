import { Container, IconButton } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentPropsWithoutRef } from 'react';

import { CloseIcon } from '../components';
import { AlertMessage } from '../components/common/AlertMessage';

type AlertMessageStoryProps = ComponentPropsWithoutRef<typeof AlertMessage>;
const AlertMessageStory = ({
  message = 'This is an alert message',
  type = 'info',
  button,
}: AlertMessageStoryProps) => {
  return (
    <Container maxWidth="md">
      <AlertMessage message={message} type={type} button={button} />
    </Container>
  );
};

AlertMessageStory.displayName = 'AlertMessage';

const meta = {
  title: 'Feedback/Alert Message',
  component: AlertMessageStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    message: 'This is an alert message',
    type: 'info',
  },
  argTypes: {
    message: {
      control: { type: 'text' },
      description: 'The alert message to display',
    },
    type: {
      control: { type: 'select' },
      options: ['success', 'error', 'warning', 'info'],
      description: 'The type/severity of the alert',
    },
    button: {
      control: { type: 'object', disable: true },
      description: 'Custom an action button in the alert',
    },
  },
} satisfies Meta<typeof AlertMessageStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: AlertMessageStoryProps) => (
  <AlertMessageStory {...args} />
);

export const Default: Story = {
  render: Template,
};

export const WithActionButton: Story = {
  args: {
    type: 'success',
    message: 'Changes saved successfully!',
    button: (
      <IconButton size="small">
        <CloseIcon fontSize="small" />
      </IconButton>
    ),
  },
  render: Template,
};

export default meta;
