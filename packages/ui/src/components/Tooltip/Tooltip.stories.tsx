import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tooltip } from './Tooltip';
import { IcInfo } from '../../icons/src/mono';

const meta: Meta<typeof Tooltip> = {
  title: 'Common/Tooltip',
  component: Tooltip,
  argTypes: {
    message: {
      control: 'text',
      description: '말풍선에 표시될 메시지',
    },
    position: {
      control: { type: 'select', options: ['top', 'bottom'] },
      description: '툴팁이 나타날 위치',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    message: '면접관 수는 최소 1명 이상이어야 합니다.',
    position: 'bottom',
    children: <IcInfo width={26} height={26} />,
  },
  render: (args) => (
    <div
      style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}
    >
      <Tooltip {...args} />
    </div>
  ),
};

export const Bottom: Story = {
  args: {
    ...Default.args,
    position: 'bottom',
    message: '안내자 정보는 선택사항입니다.',
  },
  render: (args) => (
    <div
      style={{ padding: '100px', display: 'flex', justifyContent: 'center' }}
    >
      <Tooltip {...args} />
    </div>
  ),
};
