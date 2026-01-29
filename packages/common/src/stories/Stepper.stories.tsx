import { Meta, StoryObj } from '@storybook/react-vite';

import { Stepper } from '../components';

const steps = [
  {
    title: 'Step 1',
    subtitle: 'Pending',
  },
  {
    title: 'Step 2',
    subtitle: 'Processing',
  },
  {
    title: 'Step 3',
    subtitle: 'Completed',
  },
];

const DEFAULT_INIT_STEP = 0;

const meta = {
  title: 'MUI/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  args: {
    activeStep: DEFAULT_INIT_STEP,
    steps: steps,
  },
  argTypes: {
    activeStep: {
      control: { type: 'select' },
      options: ['Initiate', 'Pending', 'Processing', 'Completed'],
      mapping: {
        Initiate: 0,
        Pending: 1,
        Processing: 2,
        Completed: 3,
      },
    },
  },
} satisfies Meta<typeof Stepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
