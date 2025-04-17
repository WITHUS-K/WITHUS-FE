import type { Meta, StoryObj } from '@storybook/react';
import { Profile } from './Profile';

const meta: Meta<typeof Profile> = {
  title: 'Common/Profile',
  component: Profile,
  argTypes: {
    src: {
      control: 'text',
      defaultValue:
        'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    },
    alt: {
      control: 'text',
      defaultValue: '미카사',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const Default: Story = {
  args: {
    src: 'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
    alt: '미카사',
  },
};
