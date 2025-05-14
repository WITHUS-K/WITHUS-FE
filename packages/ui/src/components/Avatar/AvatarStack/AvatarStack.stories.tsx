import type { Meta, StoryObj } from '@storybook/react';
import { AvatarStack } from './AvatarStack';

const meta: Meta<typeof AvatarStack> = {
  title: 'Common/Avatar/AvatarStack',
  component: AvatarStack,
};
export default meta;
type Story = StoryObj<typeof AvatarStack>;

export const FewItems: Story = {
  args: {
    items: [
      '장수정',
      '김현호',
      '김재관',
      '이채원',
      '서유빈',
      '설정원',
      '우은진',
      '윤수빈',
    ],
  },
};

export const OverflowItems: Story = {
  args: {
    items: [
      '장수정',
      '김현호',
      '김재관',
      '이채원',
      '서유빈',
      '설정원',
      '우은진',
      '윤수빈',
      '김도영',
      '윤영철',
      '이의리',
    ],
  },
};
