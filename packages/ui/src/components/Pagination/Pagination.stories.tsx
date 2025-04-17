import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Common/Pagination',
  component: Pagination,
  argTypes: {
    totalItems: {
      control: 'number',
      defaultValue: 10,
    },
    itemCountPerPage: {
      control: 'number',
      defaultValue: 1,
    },
    pageCount: {
      control: 'number',
      defaultValue: 8,
    },
    currentPage: {
      control: 'number',
      defaultValue: 5,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalItems: 20,
    itemCountPerPage: 8,
    pageCount: 5,
    currentPage: 1,
  },
};
