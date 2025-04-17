import type { Meta, StoryObj } from '@storybook/react';
import Sidebar from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Common/Sidebar',
  component: Sidebar,
  argTypes: {
    role: {
      control: 'select',
      options: ['user', 'admin'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const UserSidebar: Story = {
  args: {
    role: 'user',
  },
};

export const AdminSidebar: Story = {
  args: {
    role: 'admin',
  },
};
