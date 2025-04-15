import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Common/Header',
  component: Header,
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'admin'],
    },
    username: {
      control: 'text',
    },
    position: {
      control: 'text',
    },
    part: {
      control: 'text',
    },
    onNotificationClick: {
      action: 'clicked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const UserHeader: Story = {
  args: {
    username: '사용자',
    role: 'user',
  },
};

export const AdminHeader: Story = {
  args: {
    username: '운영진',
    role: 'admin',
    position: '회장',
    part: '기획',
  },
};
