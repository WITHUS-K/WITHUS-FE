import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import CommonDropdown, { CommonDropdownProps } from './CommonDropdowm';

const meta: Meta<typeof CommonDropdown<string>> = {
  title: 'Common/Dropdown/CommonDropdown',
  component: CommonDropdown,
  parameters: {
    controls: {
      exclude: ['style', 'onSelect'],
    },
  },
  argTypes: {
    listWidth: { control: 'text' },
    itemHeight: { control: 'text' },
    itemSize: {
      control: { type: 'select' },
      options: ['small', 'large'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CommonDropdown<string>>;

const OPTIONS = ['Option A', 'Option B', 'Option C'];

export const Default: Story = {
  render: (args: Omit<CommonDropdownProps<string>, 'options' | 'onSelect'>) => {
    const [value, setValue] = useState<string>(OPTIONS[0]!);
    return (
      <CommonDropdown
        {...args}
        options={OPTIONS}
        value={value}
        onSelect={setValue}
      />
    );
  },
  args: {
    listWidth: '16rem',
    itemHeight: '3.2rem',
    itemSize: 'small',
  },
};

export const CustomSizes: Story = {
  render: (args: Omit<CommonDropdownProps<string>, 'options' | 'onSelect'>) => {
    const [value, setValue] = useState<string>(OPTIONS[1]!);
    return (
      <CommonDropdown
        {...args}
        options={OPTIONS}
        value={value}
        onSelect={setValue}
      />
    );
  },
  args: {
    listWidth: '33.1rem',
    itemHeight: '3.4rem',
    itemSize: 'large',
    triggerHeight: '5.6rem',
  },
};
