'use client';

import { useState, ChangeEvent } from 'react';
import { InputField } from '@repo/ui/InputField';
import { IcInputSearch } from '@repo/ui/icons/colored';
import { Flex } from '@repo/ui/Flex';

export default function ClubSearchContent() {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Flex direction="column" height="45.1rem">
      <InputField
        placeholder="동아리명을 입력해주세요."
        value={inputValue}
        onChange={handleChange}
        icon={<IcInputSearch width={24} height={24} />}
        size="club"
      />
    </Flex>
  );
}
