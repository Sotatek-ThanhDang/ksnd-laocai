import { Container, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Section } from '../components/common/Section';

type SectionStoryProps = {
  withBorder?: boolean;
  children?: string;
};

const SectionStory = ({
  withBorder = false,
  children = 'This is a section with some content. You can place any content here.',
}: SectionStoryProps) => {
  return (
    <Container
      maxWidth="md"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: (theme) => theme.palette.background.secondary,
        height: '500px',
      }}
    >
      <Section withBorder={withBorder}>
        <Typography variant="body_lg" color="text.primary">
          {children}
        </Typography>
      </Section>
    </Container>
  );
};

SectionStory.displayName = 'Section';

const meta = {
  title: 'Layout/Section',
  component: SectionStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    withBorder: false,
    children:
      'This is a section with some content. You can place any content here.',
  },
  argTypes: {
    withBorder: {
      control: { type: 'boolean' },
      description: 'Show border around the section',
    },
    children: {
      control: { type: 'text' },
      description: 'Content to display inside the section',
    },
  },
} satisfies Meta<typeof SectionStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: SectionStoryProps) => <SectionStory {...args} />;

export const Default: Story = {
  render: Template,
};

export default meta;
