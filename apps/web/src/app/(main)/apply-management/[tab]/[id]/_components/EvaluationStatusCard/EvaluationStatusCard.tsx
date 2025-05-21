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
};

type EvaluationStatusCardProps = {
  evaluation: Evaluation[];
};

export const EvaluationStatusCard = ({
  evaluation,
}: EvaluationStatusCardProps) => {
  const pendingEvaluator = evaluation
    .filter((e) => e.status === 'pending')
    .map((e) => e.evaluator);

  const completeEvaluator = evaluation
    .filter((e) => e.status === 'complete')
    .map((e) => e.evaluator);

  const statuses = [
    { label: '대기중', items: pendingEvaluator },
    { label: '완료', items: completeEvaluator },
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
            <AvatarStack items={items} />
          </div>
        </div>
      ))}
    </div>
  );
};
