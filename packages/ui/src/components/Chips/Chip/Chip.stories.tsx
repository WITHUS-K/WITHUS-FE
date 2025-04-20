import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from '@/components/Chips/Chip/Chip';

const BG_COLORS = [
  'primary5',
  'primary50',
  'grayscale5',
  'grayscale30',
] as const;
const COLORS = ['primary50', 'white', 'grayscale70', 'white'] as const;

const meta: Meta<typeof Chip> = {
  title: 'Common/Chips/Chip',
  component: Chip,
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const ChipVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
      }}
    >
      {BG_COLORS.map((bg, idx) => (
        <div
          key={bg}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Chip bg={bg} color={COLORS[idx]}>
            {`${bg}`}
          </Chip>
        </div>
      ))}
    </div>
  ),
};
