import MuiChip, { type ChipProps } from '@mui/material/Chip';
import type { Meta, StoryObj } from '@storybook/react-vite';

const Chip = (props: ChipProps) => <MuiChip {...props} />;
Chip.displayName = 'Chip';

const meta = {
  title: 'MUI/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: 'filled',
    size: 'small',
    color: 'primary',
    label: '',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined'],
      description: 'Controls the variant of the chip',
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
      description: 'Controls the size of the chip',
    },
    color: {
      control: { type: 'select' },
      options: [
        'primary',
        'secondary',
        'success',
        'info',
        'warning',
        'error',
        'sky',
        'blue',
        'brand',
        'cyan',
      ],
      description: 'Controls the color of the chip',
    },
    label: {
      control: { type: 'text' },
      description: 'Controls the label of the chip',
    },
  },
} satisfies Meta<typeof MuiChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Chip {...args} label={args.label ? args.label : args.color} />
  ),
};
