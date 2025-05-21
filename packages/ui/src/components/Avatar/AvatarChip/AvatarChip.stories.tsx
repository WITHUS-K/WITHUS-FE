import type { Meta, StoryObj } from '@storybook/react';
import { AvatarChip } from './AvatarChip';
import * as styles from './AvatarChip.css';

const meta: Meta<typeof AvatarChip> = {
  title: 'Common/Avatar/AvatarChip',
  component: AvatarChip,
  argTypes: {
    label: { control: 'text' },
    index: {
      control: { type: 'number', min: 0, max: styles.colorList.length - 1 },
    },
    zIndex: { control: 'number', min: 0, max: 20 },
  },
};
export default meta;
type Story = StoryObj<typeof AvatarChip>;

export const Default: Story = {
  args: {
    label: '김이박',
    index: 0,
    zIndex: 0,
  },
};
