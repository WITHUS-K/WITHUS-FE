import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { InputChip } from './InputChip';

const meta: Meta<typeof InputChip> = {
  title: 'Common/Chips/InputChip',
  component: InputChip,
  argTypes: {
    value: {
      control: 'text',
      description: '입력 필드의 현재 값',
    },
    onChange: { table: { disable: true } },
    onKeyDown: { table: { disable: true } },
    onDelete: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof InputChip>;
const handleChange = (v: string) => console.log('onChange');
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === 'Enter') console.log('onKeyDown');
};
const handleDelete = () => console.log('onDelete');

export const Default: Story = {
  args: {
    value: '',
    onChange: handleChange,
    onKeyDown: handleKeyDown,
    onDelete: handleDelete,
  },
};
