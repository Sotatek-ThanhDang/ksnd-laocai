import { styled } from '@mui/material';
import Container from '@mui/material/Container';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { InfoRow } from '../components/common/InfoRow';

type InfoRowStoryProps = {
  label?: string;
  value?: string;
};

const InfoRowStory = ({
  label = 'Label',
  value = 'Value',
}: InfoRowStoryProps) => {
  return (
    <StyledContainer>
      <InfoRow label={label} value={value} />
    </StyledContainer>
  );
};

InfoRowStory.displayName = 'InfoRow';

const meta = {
  title: 'Components/Info Row',
  component: InfoRowStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: 'Label',
    value: 'Value',
  },
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The label text displayed on the left',
    },
    value: {
      control: { type: 'text' },
      description: 'The value text displayed on the right',
    },
  },
} satisfies Meta<typeof InfoRowStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: InfoRowStoryProps) => <InfoRowStory {...args} />;

export const Default: Story = {
  render: Template,
};

export const MultipleRows: Story = {
  render: () => (
    <StyledContainer>
      <InfoRow label="Employee ID" value="EMP-001" />
      <InfoRow label="Full Name" value="John Doe" />
      <InfoRow label="Email" value="john.doe@example.com" />
      <InfoRow label="Department" value="Engineering" />
    </StyledContainer>
  ),
};

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 500px;
  max-width: 400px !important;
`;

export default meta;
