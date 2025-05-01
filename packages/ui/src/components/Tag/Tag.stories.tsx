import { Meta, StoryObj } from '@storybook/react';
import Tag from './Tag';
import { tagColorMap, TagColor } from '@repo/utils';

const colors = Object.keys(tagColorMap) as TagColor[];

const meta: Meta<typeof Tag> = {
  title: 'Common/Tag',
  component: Tag,
  argTypes: {
    color: {
      control: { type: 'select' },
      options: colors,
      description: '텍스트 및 배경색을 결정하는 컬러 코드',
    },
    withCircle: {
      control: { type: 'boolean' },
      description: '앞에 ● 표시할지 여부',
    },
    children: {
      control: { type: 'text' },
      description: '태그 안에 들어갈 텍스트',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: colors[0],
    withCircle: false,
    children: '파트명',
  },
  name: 'Default',
};

export const WithCircle: Story = {
  args: {
    color: colors[0],
    withCircle: true,
    children: '파트명 태그',
  },
  name: 'With ●',
};

export const Playground: Story = {
  args: {
    color: colors[2],
    withCircle: true,
    children: '플레이그라운드',
  },
  name: 'Playground (Controls Enabled)',
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* ● 있는 버전 */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {colors.map((c) => (
          <Tag key={c} color={c} withCircle>
            {c}
          </Tag>
        ))}
      </div>
      {/* ● 없는 버전 */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {colors.map((c) => (
          <Tag key={c} color={c}>
            {c}
          </Tag>
        ))}
      </div>
    </div>
  ),
  name: 'All Colors / Both Styles',
};
