import type { Meta, StoryObj } from '@storybook/react';
import TabBar from './TabBar';
import { useState } from 'react';

const meta: Meta<typeof TabBar> = {
  title: 'Common/TabBar',
  component: TabBar,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof TabBar>;

export const Default: Story = {
  render: () => {
    const tabs = ['all', 'interviewer', 'applicant', 'guide'];
    const [active, setActive] = useState<string>('all');

    return (
      <div style={{ width: '115.3rem' }}>
        <TabBar tabs={tabs} active={active} onChange={setActive} />
      </div>
    );
  },
};
