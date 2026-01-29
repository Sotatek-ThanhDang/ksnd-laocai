import type { SxProps, Theme } from '@mui/material/styles';
import MuiTypography, { type TypographyProps } from '@mui/material/Typography';
import type { Meta, StoryObj } from '@storybook/react-vite';

const Typography = (props: TypographyProps) => <MuiTypography {...props} />;
Typography.displayName = 'Typography';

const meta = {
  title: 'MUI/Typography',
  component: Typography,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    variant: 'body_md',
    color: 'text.primary',
    children: 'Example text for typography',
    fontWeight: 400,
    sx: {} as SxProps<Theme>,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'display_xl',
        'display_lg',
        'display_md',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'h7',
        'body_xl',
        'body_lg',
        'body_md',
        'body_sm',
        'body_xs',
      ],
      description: 'The variant of the typography',
    },
    color: {
      control: 'select',
      options: [
        'text.primary',
        'text.secondary',
        'text.tertiary',
        'text.quaternary',
        'text.senary',
        'text.brand',
        'text.link',
        'text.success',
        'text.warning',
        'text.error',
        'text.inverse',
      ],
      description: 'Pick any `palette.text` color token',
    },
    children: {
      control: { type: 'text' },
      description: 'The children of the typography',
    },
    fontWeight: {
      control: { type: 'select' },
      options: [300, 400, 500, 600, 700],
      description: 'Standard font-weight values (light → bold)',
    },
    sx: {
      control: 'object',
      description: 'The MUI sx prop for custom styling',
      table: {
        type: { summary: 'SxProps<Theme>' },
      },
    },
  },
} satisfies Meta<typeof MuiTypography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <Typography {...args} sx={args.sx} />,
};
