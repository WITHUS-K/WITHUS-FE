import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { ProfileChip } from './ProfileChip';

const meta: Meta<typeof ProfileChip> = {
  title: 'Common/Chips/ProfileChip',
  component: ProfileChip,
  argTypes: {
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    name: {
      control: 'text',
    },
    onDelete: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileChip>;

export const Default: Story = {
  args: {
    src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    alt: '미카사',
    name: '미카사',
    onDelete: () => {
      console.log('ProfileChip deleted');
    },
  },
};
