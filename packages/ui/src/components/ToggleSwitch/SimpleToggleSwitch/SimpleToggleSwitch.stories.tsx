import type { Meta, StoryObj } from '@storybook/react';
import {
  SimpleToggleSwitch,
  SimpleToggleSwitchProps,
} from './SimpleToggleSwitch';

const meta: Meta<SimpleToggleSwitchProps> = {
  title: 'Common/ToggleSwitch/SimpleToggleSwitch',
  component: SimpleToggleSwitch,
  argTypes: {
    onChange: { action: 'changed' },
  },
  args: {
    checked: false,
    disabled: false,
  },
};
export default meta;
type Story = StoryObj<SimpleToggleSwitchProps>;

export const Off: Story = {
  args: {
    checked: false,
  },
};

export const On: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    checked: false,
    disabled: true,
  },
};
