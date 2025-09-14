'use client';

import React, { MouseEvent } from 'react';
import { Flex, Text } from '@repo/ui';
import { CheckBox } from '@repo/ui/CheckBox';
import { containerStyle } from './ClubItem.css';
import { Org } from './AffiliationContent';

interface Props {
  org: Org;
  selectedId: number | null;
  onSelect: (id: number | null) => void;
}

export default function ClubItem({ org, selectedId, onSelect }: Props) {
  const isSelected = org.id === selectedId;

  const toggle = () => {
    onSelect(isSelected ? null : org.id);
  };

  return (
    <Flex
      align="center"
      justify="spaceBetween"
      className={containerStyle}
      onClick={toggle}
      role="button"
      aria-pressed={isSelected}
      tabIndex={0}
      width="100%"
    >
      <Text variant="md2_text_medium" color="grayscale80">
        {org.name}
      </Text>
      <CheckBox isChecked={isSelected} onChange={toggle} />
    </Flex>
  );
}
