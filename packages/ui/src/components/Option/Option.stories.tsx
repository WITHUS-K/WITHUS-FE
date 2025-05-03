import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Option } from './Option';

const meta: Meta<typeof Option> = {
  title: 'Common/Option',
  component: Option,
  parameters: {
    controls: {
      exclude: ['isChecked', 'isSelected', 'onChange', 'type'],
    },
  },
  argTypes: {
    label: { control: 'text' },
    width: { control: 'text' },
    height: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Option>;

export const Checkbox: Story = {
  args: {
    label: '성별',
    width: '21.2rem',
    height: '5.6rem',
  },
  render: ({ label, width, height }) => {
    const [checked, setChecked] = useState(false);
    return (
      <Option
        type="checkbox"
        label={label}
        width={width}
        height={height}
        isChecked={checked}
        onChange={() => setChecked((prev) => !prev)}
      />
    );
  },
};

export const Radio: Story = {
  args: {
    label: '파트명',
    width: 'auto',
    height: '4.4rem',
  },
  render: ({ label, width, height }) => {
    const [selected, setSelected] = useState(false);
    return (
      <Option
        type="radio"
        label={label}
        width={width}
        height={height}
        isSelected={selected}
        onChange={() => setSelected((prev) => !prev)}
      />
    );
  },
};

export const Highlight: Story = {
  args: {
    label: '전화번호 (필수)',
    width: '21.2rem',
    height: '5.6rem',
  },
  render: ({ label, width, height }) => (
    <Option type="highlight" label={label} width={width} height={height} />
  ),
};
