import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import ClubDropdown from './ClubDropdwon';

const meta: Meta<typeof ClubDropdown> = {
  title: 'Common/Dropdown/ClubDropdown',
  component: ClubDropdown,
};

export default meta;
type Story = StoryObj<typeof ClubDropdown>;

export const Default: Story = {
  render: () => {
    const [selectedClub, setSelectedClub] = useState<string | undefined>();

    return (
      <div style={{ padding: '5rem' }}>
        <ClubDropdown value={selectedClub} onSelect={setSelectedClub} />
      </div>
    );
  },
};
