import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentPropsWithoutRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { NotFoundPage } from '../components/pages/NotFound';

type NotFoundStoryProps = ComponentPropsWithoutRef<typeof NotFoundPage>;

const NotFoundStory = (props: NotFoundStoryProps) => (
  <MemoryRouter initialEntries={['/missing']}>
    <Routes>
      <Route path="*" element={<NotFoundPage {...props} />} />
    </Routes>
  </MemoryRouter>
);

NotFoundStory.displayName = 'NotFoundPage';

const meta = {
  title: 'Pages/Not Found',
  component: NotFoundStory,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    path: '/',
    embed: false,
  },
  argTypes: {
    path: {
      control: 'text',
      description: 'Destination path for the "Back to home" button',
    },
    embed: {
      control: 'boolean',
      description:
        'When true, the page stretches to the parent container height',
    },
  },
} satisfies Meta<typeof NotFoundStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <NotFoundStory {...args} />,
};
