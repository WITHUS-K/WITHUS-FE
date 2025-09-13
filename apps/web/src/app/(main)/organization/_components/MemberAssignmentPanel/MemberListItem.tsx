import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { CheckBox } from '@repo/ui/CheckBox';
import { Profile } from '@repo/ui/Profile';
import { Text } from '@repo/ui/Text';
import type { UserResult } from '@web/types/organization';
import * as styles from './MemberAssignmentPanel.css';
import { highlight } from '@web/utils/highlight';

interface Props {
  user: UserResult;
  isSelected: boolean;
  onToggle: () => void;
  search: string;
}

export default function MemberListItem({
  user,
  isSelected,
  onToggle,
  search,
}: Props) {
  const nameParts = search
    ? user.name.split(new RegExp(`(${search})`, 'gi'))
    : [user.name];

  return (
    <Flex
      align="center"
      className={`${styles.item} ${isSelected ? styles.selectedItem : ''}`}
      gap="0.8rem"
    >
      <div style={{ marginRight: '0.4rem', height: '2rem', width: '2rem' }}>
        <CheckBox size={2} isChecked={isSelected} onChange={onToggle} />
      </div>
      <Profile src={user.imageUrl ?? null} alt={user.name} size={24} />
      <Text variant="sm_caption_medium" color="grayscale90">
        {highlight(user.name, search)}
      </Text>

      <Text
        variant="xs_caption_regular"
        color="grayscale50"
        style={{ marginLeft: 6 }}
      >
        {highlight(user.email ?? '', search)}
      </Text>
    </Flex>
  );
}
