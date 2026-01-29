import { ThemeProvider } from '@mui/material/styles';
import type { Preview } from '@storybook/react-vite';
import React from 'react';

import { theme } from '../src/libs/mui/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    options: {
      // Sorting stories.
      // ref: https://storybook.js.org/docs/react/writing-stories/naming-components-and-hierarchy#sorting-stories
      storySort: {
        method: 'alphabetical',
        order: ['Components', 'Layout', 'Forms', 'Pages', 'Feedback', 'MUI'],
        locales: 'en-US',
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
