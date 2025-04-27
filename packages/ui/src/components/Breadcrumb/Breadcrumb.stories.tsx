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

/**
 * 기본 예제:
 * - Home > Library > Data (마지막 아이템은 active 처리)
 */
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

/**
 * asChild 예제:
 * 외부 Link 컴포넌트(<a>)를 직접 쓰고 싶을 때 asChild를 true로 지정합니다.
 */
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
