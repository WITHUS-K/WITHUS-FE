import React, { useState } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Stepper, StepperProps } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Common/Stepper',
  component: Stepper,
  argTypes: {
    name: { control: 'text' },
    value: { control: { type: 'number', min: 0, max: 10, step: 1 } },
    onChange: { action: 'onChange' },
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    name: 'interviewers',
    value: 1,
    onChange: action('onChange'),
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [val, setVal] = useState(args.value);
    return (
      <Stepper
        {...args}
        value={val}
        onChange={(name, next) => {
          setVal(next);
          action('onChange')(name, next);
        }}
      />
    );
  },
  args: {
    name: 'applicants',
    value: 1,
  },
};
