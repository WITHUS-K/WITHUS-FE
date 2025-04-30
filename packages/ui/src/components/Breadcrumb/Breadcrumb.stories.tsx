import { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Common/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: '계층 구조를 표시하는 Breadcrumb 컴포넌트입니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>Library</Breadcrumb.Item>
      <Breadcrumb.Item active>Data</Breadcrumb.Item>
    </Breadcrumb>
  ),
  args: {},
};

export const WithLinks: Story = {
  render: (args) => (
    <Breadcrumb {...args}>
      <Breadcrumb.Item asChild>
        <a href="/">Home</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item asChild>
        <a href="/library">Library</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item asChild active>
        <a href="/data">Data</a>
      </Breadcrumb.Item>
    </Breadcrumb>
  ),
  args: {},
};
