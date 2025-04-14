import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SelectDropdown from './SelectDropdown';

const meta: Meta<typeof SelectDropdown> = {
  title: 'Common/Dropdown/SelectDropdown',
  component: SelectDropdown,
};

export default meta;
type Story = StoryObj<typeof SelectDropdown>;

export const Default: Story = {
  render: () => {
    const [selectedEmail, setSelectedEmail] = useState<string | undefined>();

    return (
      <div style={{ padding: '5rem' }}>
        <SelectDropdown value={selectedEmail} onSelect={setSelectedEmail} />
      </div>
    );
  },
};
