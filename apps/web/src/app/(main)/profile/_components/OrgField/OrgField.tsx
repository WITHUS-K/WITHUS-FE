// components/OrgField/OrgField.tsx
'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcBin } from '@repo/ui/icons/mono';
import * as styles from './OrgField.css';
import { useModal } from '@repo/ui/hooks';

type OrgItem = { id: number | string; name: string };

interface OrgFieldProps {
  label: string;
  orgs: OrgItem[];
  onDelete?: (id: OrgItem['id']) => void;
  columns?: number;
}

export default function OrgField({
  label,
  orgs,
  onDelete,
  columns = 2,
}: OrgFieldProps) {
  const isMulti = orgs.length > 1;
  const { confirm } = useModal();

  const handleAskDelete = (org: OrgItem) => {
    if (!onDelete) return;
    confirm({
      type: 'warning',
      description: '해당 항목을 삭제하시겠습니까?',
      cancelText: '취소',
      confirmText: '삭제',
      onConfirm: () => onDelete(org.id),
    });
  };

  return (
    <Flex gap="2rem" width="100%" align="flexStart">
      {/* 좌측 라벨 고정 */}
      <Text
        variant="md1_text_semibold"
        color="grayscale70"
        style={{ width: '16rem', marginTop: '1.2rem' }}
      >
        {label}
      </Text>

      {/* 우측 영역: 단일이면 그대로, 여러 개면 그리드 */}
      <div
        className={isMulti ? styles.list : undefined}
        style={
          isMulti
            ? {
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
                gap: '1.6rem',
                width: '100%',
              }
            : { width: '100%' }
        }
      >
        {orgs.map((o) => (
          <div key={o.id} className={styles.wrapper}>
            <Text variant="md2_text_regular" color="grayscale90">
              {o.name}
            </Text>
            <button
              type="button"
              className={styles.button}
              onClick={() => handleAskDelete(o)}
            >
              <IcBin width={24} height={24} />
            </button>
          </div>
        ))}
      </div>
    </Flex>
  );
}
