import Container from '@mui/material/Container';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SanitizedHTML } from '../components/common/SanitizedHTML';

type SanitizedHTMLStoryProps = {
  htmlString?: string;
};

const SanitizedHTMLStory = ({
  htmlString = '<p>This is a <strong>sanitized</strong> HTML string with <em>formatting</em>.</p>',
}: SanitizedHTMLStoryProps) => {
  return (
    <Container maxWidth="md">
      <SanitizedHTML htmlString={htmlString} />
    </Container>
  );
};

SanitizedHTMLStory.displayName = 'SanitizedHTML';

const meta = {
  title: 'Components/Sanitized HTML',
  component: SanitizedHTMLStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    htmlString:
      '<p>This is a <strong>sanitized</strong> HTML string with <em>formatting</em>.</p>',
  },
  argTypes: {
    htmlString: {
      control: { type: 'text' },
      description: 'The HTML string to sanitize and display',
    },
  },
} satisfies Meta<typeof SanitizedHTMLStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: SanitizedHTMLStoryProps) => (
  <SanitizedHTMLStory {...args} />
);

export const Default: Story = {
  render: Template,
};

export const WithLinks: Story = {
  args: {
    htmlString:
      '<p>Visit <a href="https://example.com">Example.com</a> for more information.</p>',
  },
  render: Template,
};

export const ComplexHTML: Story = {
  args: {
    htmlString:
      '<div><h2>Title</h2><p>Paragraph with <strong>bold</strong> and <em>italic</em> text.</p><ul><li>Item 1</li><li>Item 2</li></ul></div>',
  },
  render: Template,
};

export default meta;
