import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { DatePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Common/DatePicker',
  component: DatePicker,
  argTypes: {
    selectedDate: { table: { disable: true } },
    onSelect: { table: { disable: true } },
  },
};
export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    selectedDate: new Date(),
  },
  render: (args) => {
    const [date, setDate] = useState<Date>(args.selectedDate);
    const handleSelect = (d: Date) => {
      action('onSelect')(d);
      setDate(d);
    };
    return <DatePicker {...args} selectedDate={date} onSelect={handleSelect} />;
  },
};

export const Preselected: Story = {
  args: {
    selectedDate: new Date(2025, 4, 15),
  },
  render: (args) => {
    const [date, setDate] = useState<Date>(args.selectedDate);
    const handleSelect = (d: Date) => {
      action('onSelect')(d);
      setDate(d);
    };
    return <DatePicker {...args} selectedDate={date} onSelect={handleSelect} />;
  },
};
