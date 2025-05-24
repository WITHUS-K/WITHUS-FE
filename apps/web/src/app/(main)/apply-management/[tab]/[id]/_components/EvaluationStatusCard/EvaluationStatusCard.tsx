'use client';

import React from 'react';
import { AvatarStack } from '@repo/ui/Avatar';
import { Flex, Text } from '@repo/ui';
import * as styles from './EvaluationStatusCard.css';
import clsx from 'clsx';

export type Evaluation = {
  evaluator: string;
  status: 'pending' | 'complete';
  score: number | null;
  color: string; // 서버에서 온 색 이름(e.g. "red")
};

type EvaluationStatusCardProps = {
  evaluation: Evaluation[];
};

export function EvaluationStatusCard({
  evaluation,
}: EvaluationStatusCardProps) {
  // pending, complete 각각 Name+Color 객체 배열로 변환
  const pendingItems = evaluation
    .filter((e) => e.status === 'pending')
    .map((e) => ({ name: e.evaluator, serverColor: e.color }));

  const completeItems = evaluation
    .filter((e) => e.status === 'complete')
    .map((e) => ({ name: e.evaluator, serverColor: e.color }));

  const statuses = [
    { label: '대기중', items: pendingItems },
    { label: '완료', items: completeItems },
  ] as const;

  return (
    <div className={styles.card}>
      {statuses.map(({ label, items }) => (
        <div
          key={label}
          className={clsx(
            styles.row,
            label === '완료' ? styles.complete : styles.waiting
          )}
        >
          <div className={styles.rowLeftSide}>
            <Text variant="md2_text_medium" color="grayscale70">
              {label}
            </Text>
            <Text
              variant="md2_text_medium"
              color={label === '완료' ? 'primary50' : 'grayscale40'}
            >
              {items.length}
            </Text>
          </div>

          <div className={styles.stack}>
            {/* AvatarStack에 {name, serverColor} 배열을 넘깁니다 */}
            <AvatarStack items={items} />
          </div>
        </div>
      ))}
    </div>
  );
}
