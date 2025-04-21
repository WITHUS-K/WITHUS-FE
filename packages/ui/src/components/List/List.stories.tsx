import type { Meta, StoryObj } from '@storybook/react';
import { List } from './List';

const meta: Meta<typeof List> = {
  title: 'Common/List',
  component: List,
  argTypes: {
    question: {
      control: 'text',
    },
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    question:
      '1. 자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
    src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    alt: '미카사',
    name: '미카사',
  },
};
