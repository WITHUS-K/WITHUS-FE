import React, { ReactElement } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { CheckBox } from '@repo/ui/CheckBox';
import { Button } from '@repo/ui/Button';
import type { UserResult } from '@web/types/organization';
import MemberListItem from './MemberListItem';
import * as styles from './MemberAssignmentPanel.css';

interface MemberPanelProps {
  title: string;
  count: number;
  items: UserResult[];
  selected: Set<number>;
  allSelected: boolean;
  onToggleAll: () => void;
  onAction: () => void;
  actionLabel: string;
  actionIcon: ReactElement;
  onToggleItem: (id: number) => void;
  search: string;
}

export default function MemberPanel({
  title,
  count,
  items,
  selected,
  allSelected,
  onToggleAll,
  onAction,
  actionLabel,
  actionIcon,
  onToggleItem,
  search,
}: MemberPanelProps) {
  return (
    <div className={styles.panel}>
      <Flex align="center" gap="0.8rem">
        <Text variant="md2_text_semibold" color="grayscale70">
          {title}
        </Text>
        <Text variant="md2_text_medium" color="grayscale30">
          {count}
        </Text>
      </Flex>

      <Flex align="center" width="100%" gap="0.8rem" paddingLeft="0.6rem">
        <div style={{ width: '2rem', height: '2rem' }}>
          <CheckBox size={2} isChecked={allSelected} onChange={onToggleAll} />
        </div>
        <Button
          disabled={selected.size === 0}
          onClick={onAction}
          variant="stroke"
          size="32"
          leftIcon={actionIcon}
        >
          {actionLabel}
        </Button>
      </Flex>

      <div className={styles.list}>
        {items.map((u) => (
          <MemberListItem
            key={u.userId}
            user={u}
            isSelected={selected.has(u.userId)}
            onToggle={() => onToggleItem(u.userId)}
            search={search}
          />
        ))}
      </div>
    </div>
  );
}
