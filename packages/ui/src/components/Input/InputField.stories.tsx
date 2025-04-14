import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InputField from './InputField';
import { IcInputSearch } from '@/icons/src/colored';

const meta: Meta<typeof InputField> = {
  title: 'Common/Input/InputField',
  component: InputField,
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const Test: Story = {
  render: () => {
    const [search1, setSearch1] = useState('');
    const [search2, setSearch2] = useState('위더스');
    const [club1, setClub1] = useState('');
    const [club2, setClub2] = useState('위더스');

    return (
      <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
        <InputField
          placeholder="검색"
          value={search1}
          onChange={(e) => setSearch1(e.target.value)}
          icon={<IcInputSearch width={24} height={24} />}
          size="search"
          width="38.1rem"
        />
        <InputField
          placeholder="검색"
          value={search2}
          onChange={(e) => setSearch2(e.target.value)}
          icon={<IcInputSearch width={24} height={24} />}
          size="search"
          width="38.1rem"
        />
        <InputField
          placeholder="동아리명을 입력해주세요."
          value={club1}
          onChange={(e) => setClub1(e.target.value)}
          icon={<IcInputSearch width={24} height={24} />}
          size="club"
          width="38.1rem"
        />
        <InputField
          placeholder="동아리명을 입력해주세요."
          value={club2}
          onChange={(e) => setClub2(e.target.value)}
          icon={<IcInputSearch width={24} height={24} />}
          size="club"
          width="38.1rem"
        />
      </div>
    );
  },
};
