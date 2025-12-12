'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Profile } from '@repo/ui/Profile';
import { Text } from '@repo/ui/Text';
import { IcDelete } from '@repo/ui/icons/mono';
import * as styles from './InviteRecipientsModalContent.css'
import { User } from '@web/types/organization';

interface Props {
  user: User;
  onRemove: (id: string) => void;
  onSelect?: (user: User) => void;
  disabled?: boolean;
}

export default function SelectedUserItem({
  user,
  onRemove,
  onSelect,
  disabled = false,
}: Props) {
  return (
    <Flex
      align="center"
      justify="spaceBetween"
      width="100%"
      className={styles.item}
      style={{
        cursor: onSelect && !disabled ? 'pointer' : 'default',
        opacity: disabled ? 0.5 : 1,
      }}
      onClick={() => {
        if (!onSelect || disabled) return;
        onSelect(user);
      }}
    >
      <Flex align="center" gap="1.8rem" paddingLeft="0.8rem">
        <Profile size={32} src={user.profileUrl || ''} alt={user.name} />
        <Flex direction="column">
          <Text variant="sm_caption_medium" color="grayscale70">
            {user.name}
          </Text>
          <Text variant="xs_caption_medium" color="grayscale50">
            {user.email}
          </Text>
        </Flex>
      </Flex>

 
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(user.id);
        }}
        className={styles.button}
        aria-label="삭제"
      >
        <IcDelete width={24} height={24} />
      </button>
    </Flex>
  );
}
