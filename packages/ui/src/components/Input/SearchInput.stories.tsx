import { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import SearchInput, { SearchInputProps } from './SearchInput';

const meta: Meta<SearchInputProps> = {
  title: 'Common/Input/SearchInput',
  component: SearchInput,
  parameters: {
    docs: {
      description: {
        component:
          '검색 전용 Input: 값이 없으면 돋보기, 값이 있으면 클리어(X) 버튼 표시',
      },
    },
  },
  argTypes: {
    placeholder: { control: 'text', defaultValue: '검색' },
    width: { control: 'text', defaultValue: '300px' },
  },
};

export default meta;
type Story = StoryObj<SearchInputProps>;

const Template: Story['render'] = (args) => {
  const [value, setValue] = useState('');
  return (
    <div style={{ padding: 40, display: 'flex', justifyContent: 'center' }}>
      <SearchInput
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    placeholder: '검색',
    width: '400px',
  },
};
