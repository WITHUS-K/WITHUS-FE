import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Pagination, PaginationProps } from './Pagination';

const meta: Meta<PaginationProps> = {
  title: 'Common/Pagination',
  component: Pagination,
  argTypes: {
    totalItems: {
      control: { type: 'number' },
      description: '총 아이템 수',
    },
    itemCountPerPage: {
      control: { type: 'number' },
      description: '한 페이지에 표시할 아이템 수',
    },
    pageCount: {
      control: { type: 'number' },
      description: '한 그룹에 표시할 페이지 버튼 수',
    },
    currentPage: { table: { disable: true } },
    onPageChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<PaginationProps>;

export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalItems: 95,
    itemCountPerPage: 10,
    pageCount: 8,
  },
};

export const FewPages: Story = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return <Pagination {...args} currentPage={page} onPageChange={setPage} />;
  },
  args: {
    totalItems: 25,
    itemCountPerPage: 10,
    pageCount: 8,
  },
};
