import {
  ScoreChip,
  ScoreChipProps,
} from '@/components/Chips/ScoreChip/ScoreChip';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta: Meta<ScoreChipProps> = {
  title: 'Common/Chips/ScoreChip',
  component: ScoreChip,
  argTypes: {
    items: {
      control: 'object',
    },
  },
};

export default meta;
type Story = StoryObj<ScoreChipProps>;

const SAMPLE_ITEMS: ScoreChipProps['items'] = [
  {
    src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    alt: '장운영',
    name: '장운영',
    score: 5,
  },
  {
    src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    alt: '윤운영',
    name: '윤운영',
    score: 5,
  },
  {
    src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    alt: '설운영',
    name: '설운영',
    score: 5,
  },
];

export const Default: Story = {
  args: {
    items: SAMPLE_ITEMS,
  },
};
