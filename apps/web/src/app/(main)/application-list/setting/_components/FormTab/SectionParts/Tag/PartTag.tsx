'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import * as styles from '../SectionParts.css';
import { IcInviteDelete } from '@repo/ui/icons/colored';
// 개별 파트 태그 컴포넌트
export function PartTag({
  label,
  onRemove,
  onEdit,
  disabled,
}: {
  label: string;
  onRemove: () => void;
  onEdit: () => void;
  disabled: boolean;
}) {
  return (
    <Flex
      align="center"
      justify="spaceBetween"
      className={`${styles.tag} ${disabled ? styles.tagDisabled : ''}`}
      onClick={() => !disabled && onEdit()}
    >
      <span>{label}</span>
      <button
        type="button"
        disabled={disabled}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) {
            onRemove();
          }
        }}
      >
        <IcInviteDelete width={24} height={24} />
      </button>
    </Flex>
  );
}
