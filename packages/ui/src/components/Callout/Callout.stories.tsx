import type { Meta, StoryObj } from '@storybook/react';
import { Callout, CalloutProps } from './Callout';

const meta: Meta<CalloutProps> = {
  title: 'Common/Callout',
  component: Callout,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    position: {
      control: { type: 'radio' },
      options: ['top', 'bottom'],
    },
    offsetX: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<CalloutProps>;

export const Default: Story = {
  args: {
    trigger: <button>추가</button>,
    texts: 'Tooltip text',
    position: 'bottom',
  },
};

export const Bottom: Story = {
  args: {
    trigger: <button>추가</button>,
    texts: 'Tooltip below',
    position: 'bottom',
  },
};

export const MultipleTexts: Story = {
  args: {
    trigger: <button>추가</button>,
    texts: ['First line', 'Second line', 'Third line'],
  },
};

export const OffsetExample: Story = {
  args: {
    trigger: <button>추가</button>,
    texts: 'Offset tooltip',
    offsetX: 16,
  },
};
