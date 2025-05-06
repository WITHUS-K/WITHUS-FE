// Radio.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Radio } from './Radio';

const meta: Meta<typeof Radio> = {
  title: 'Common/Radio',
  component: Radio,
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div style={{ padding: '1rem' }}>
        <Radio
          isChecked={checked}
          onChange={() => setChecked((prev) => !prev)}
          size={1.8}
        />
      </div>
    );
  },
};
