import { Box, Button, Container, Stack, Typography } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { type ComponentPropsWithoutRef } from 'react';

import Tabs from '../components/common/Tabs';

const getTabs = (length: number) =>
  Array.from({ length }, (_, index) => ({
    label: `Tab ${index + 1}`,
    component: (
      <Box display="flex" flexDirection="column">
        <Typography variant="body_lg" mb={2}>
          Content for Tab {index + 1}
        </Typography>
        <Typography variant="body_md" color="text.secondary">
          This is the content displayed when Tab {index + 1} is selected.
        </Typography>
      </Box>
    ),
  }));

type TabsStoryProps = ComponentPropsWithoutRef<typeof Tabs>;

const TabsStory = ({
  defaultValue,
  tabs = getTabs(3),
  actions,
}: TabsStoryProps) => {
  return (
    <Container maxWidth="md">
      <Tabs defaultValue={defaultValue} tabs={tabs} actions={actions} />
    </Container>
  );
};

TabsStory.displayName = 'Tabs';

const meta = {
  title: 'Components/Tabs',
  component: TabsStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    tabs: getTabs(3),
  },
  argTypes: {
    defaultValue: {
      control: { type: 'number', min: 0 },
      description: 'The default selected tab index',
    },
    tabs: {
      control: 'object',
      description: 'Config number of tabs to display',
    },
    actions: {
      control: 'object',
      description: 'Config the right action of tabs',
    },
  },
} satisfies Meta<typeof TabsStory>;

type Story = StoryObj<typeof meta>;

const Template = (args: TabsStoryProps) => <TabsStory {...args} />;

export const Default: Story = {
  render: Template,
};

export const DefaultTabTwo: Story = {
  args: {
    defaultValue: 1,
  },
  render: Template,
};

export const WithAction: Story = {
  args: {
    actions: (
      <Stack direction="row" gap={1} alignItems="center">
        <Button size="small" variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button size="small">Submit</Button>
      </Stack>
    ),
  },
  render: Template,
};

export default meta;
