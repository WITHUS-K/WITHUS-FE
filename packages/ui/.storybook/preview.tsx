import React from 'react';
import '@repo/theme';
import '@repo/theme/dist/styles/global.css.css';
import '@repo/theme/dist/themes/theme.css.css';
import type { Preview } from '@storybook/react';
import { themeClass } from '@repo/theme';
console.log(themeClass);

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => {
      return (
        <div className={themeClass}>
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
