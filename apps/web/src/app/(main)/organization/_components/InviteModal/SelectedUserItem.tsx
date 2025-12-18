'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Profile } from '@repo/ui/Profile';
import { Text } from '@repo/ui/Text';
import { IcDelete } from '@repo/ui/icons/mono';
import * as styles from './InviteModal.css';
import { User } from '@web/types/organization';
import { CheckBox } from '@repo/ui/CheckBox';

interface Props {
  user: User;
  onRemove: (id: string) => void;
  showCheckbox?: boolean;
  isChecked?: boolean;
  onToggle?: () => void;
}

export default function SelectedUserItem({
  user,
  onRemove,
  showCheckbox = false,
  isChecked = false,
  onToggle,
}: Props) {
  return (
    <Flex
      align="center"
      justify="spaceBetween"
      width="100%"
      className={styles.item}
    >
      <Flex align="center" gap="1.2rem" paddingLeft="0.8rem">
        {showCheckbox && (
          <CheckBox
            isChecked={isChecked}
            onChange={() => onToggle?.()}
            size={2}
          />
        )}

        <Profile
          size={32}
          src={user.profileUrl || ''}
          alt={user.name || 'User'}
        />

        <Flex direction="column">
          {user.name && (
            <Text variant="sm_caption_medium" color="grayscale70">
              {user.name}
            </Text>
          )}
          <Text variant="xs_caption_medium" color="grayscale50">
            {user.email}
          </Text>
        </Flex>
      </Flex>

      {!showCheckbox && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(user.id);
          }}
          className={styles.button}
        >
          <IcDelete width={24} height={24} />
        </button>
      )}
    </Flex>
  );
}
