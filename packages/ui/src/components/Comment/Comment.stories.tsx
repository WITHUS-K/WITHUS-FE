import type { Meta, StoryObj } from '@storybook/react';
import { Comment } from './Comment';

const meta: Meta<typeof Comment> = {
  title: 'Common/Comment',
  component: Comment,
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
  args: {
    user: {
      name: '미카사',
      src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      alt: '미카사',
    },
    comment:
      '{어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게} {어쩌구저쩌구 서류평가때 메모했던 내용 자동으로 뜨게}',
  },
};
