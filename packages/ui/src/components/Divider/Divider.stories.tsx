import type { Meta, StoryObj } from '@storybook/react';
import { Divider, DividerProps } from './Divider';

const meta: Meta<DividerProps> = {
  title: 'Common/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<DividerProps>;

export const Row: Story = {
  args: {
    direction: 'row',
    length: '20rem',
  },
};

export const Column: Story = {
  args: {
    direction: 'column',
    length: '5rem',
    borderColor: 'grayscale30',
  },
};
