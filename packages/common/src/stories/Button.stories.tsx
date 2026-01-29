import MuiButton, { ButtonProps } from '@mui/material/Button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const Button = (props: ButtonProps) => <MuiButton {...props} />;
Button.displayName = 'Button';

const meta = {
  title: 'MUI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: 'contained',
    size: 'medium',
    color: 'primary',
    children: 'Submit',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['outlined', 'contained', 'text'],
      description: 'Controls the variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Controls the size of the button',
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
      description: 'Controls the color of the button',
    },
    children: {
      control: { type: 'text' },
      description: 'The text of the button',
    },
  },
} satisfies Meta<typeof MuiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
