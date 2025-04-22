import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { AccordianList, AccordianItemType } from './AccordianList';

const meta: Meta<typeof AccordianList> = {
  title: 'Common/List/AccordionList',
  component: AccordianList,
};

export default meta;
type Story = StoryObj<typeof AccordianList>;

const sampleItem: AccordianItemType = {
  title:
    '자소서문항 자소서문항 자소서문항 자소서문항 자소서문항자소서문항자소서문항',
  content:
    '자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명자소서 문항에 대한 자세한 설명',
  reviewers: [
    {
      name: '장윤영',
      avatar:
        'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      score: 5,
    },
    {
      name: '윤윤영',
      avatar:
        'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      score: 4,
    },
    {
      name: '설윤영',
      avatar:
        'https://image.zeta-ai.io/profile-image/396e44e5-a40d-4896-a4a4-fe230f955148/1bb4e857-0110-4c45-8277-5ecbbb232c87.jpeg?w=828&q=90&f=webp',
      score: 3,
    },
  ],
};

export const Closed: Story = {
  args: {
    item: sampleItem,
    index: 0,
    isOpen: false,
    width: '1101px',
    onToggle: () => {},
  },
};

export const Opened: Story = {
  args: {
    item: sampleItem,
    index: 0,
    isOpen: true,
    width: '1101px',
    onToggle: () => {},
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: '2rem' }}>
        <AccordianList
          {...args}
          isOpen={isOpen}
          onToggle={() => setIsOpen((prev) => !prev)}
        />
      </div>
    );
  },
  args: {
    item: sampleItem,
    index: 0,
    width: '1101px',
  },
};
