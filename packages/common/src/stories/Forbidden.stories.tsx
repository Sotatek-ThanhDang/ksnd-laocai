import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentPropsWithoutRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { ForbiddenPage } from '../components/pages/Forbidden';

type ForbiddenStoryProps = ComponentPropsWithoutRef<typeof ForbiddenPage>;

const ForbiddenStory = (props: ForbiddenStoryProps) => (
  <MemoryRouter initialEntries={['/restricted']}>
    <Routes>
      <Route path="*" element={<ForbiddenPage {...props} />} />
    </Routes>
  </MemoryRouter>
);

ForbiddenStory.displayName = 'ForbiddenPage';

const meta = {
  title: 'Pages/Forbidden',
  component: ForbiddenStory,
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
      description: 'Destination path for the call-to-action button',
    },
    embed: {
      control: 'boolean',
      description: 'Match parent container height instead of full viewport',
    },
  },
} satisfies Meta<typeof ForbiddenStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <ForbiddenStory {...args} />,
};
