'use client';

import React from 'react';
import { Flex, Text } from '@repo/ui';
import { CheckBox } from '@repo/ui/CheckBox';
import type { Org } from '@web/types/auth';
import { containerStyle } from './ClubItem.css';

interface Props {
  org: Org;
  selectedId: number | null;
  onSelect: (id: number | null, name?: string) => void;
}

export default function ClubItem({ org, selectedId, onSelect }: Props) {
  const isSelected = org.id === selectedId;

  const handleClick = () => {
    if (isSelected) {
      onSelect(null);
    } else {
      onSelect(org.id, org.name);
    }
  };

  return (
    <Flex
      align="center"
      justify="spaceBetween"
      width="100%"
      className={containerStyle}
      onClick={handleClick}
    >
      <Text variant="md2_text_medium" color="grayscale80">
        {org.name}
      </Text>
      <CheckBox isChecked={isSelected} onChange={handleClick} />
    </Flex>
  );
}
