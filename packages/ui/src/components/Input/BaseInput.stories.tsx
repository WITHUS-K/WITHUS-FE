import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BaseInput from './BaseInput';

const meta: Meta<typeof BaseInput> = {
  title: 'Common/Input/BaseInput',
  component: BaseInput,
  parameters: {
    controls: { exclude: ['inputProps', 'onClear', 'onTogglePassword'] },
  },
  argTypes: {
    size: { control: 'radio', options: ['search', 'club', 'auth'] },
  },
};
export default meta;

type Story = StoryObj<typeof BaseInput>;

export const Clearable: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <BaseInput
        inputProps={{
          value,
          onChange: (e) => setValue(e.target.value),
          placeholder: '검색어를 입력하세요',
        }}
        showClear
        onClear={() => setValue('')}
        size="auth"
        width="300px"
      />
    );
  },
};
