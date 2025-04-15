import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import CheckBox from './CheckBox';

const meta: Meta<typeof CheckBox> = {
  title: 'Common/CheckBox',
  component: CheckBox,
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <div>
        <CheckBox
          isChecked={checked}
          onChange={() => setChecked((prev) => !prev)}
          aria-label="동의 체크박스"
        />
      </div>
    );
  },
};
