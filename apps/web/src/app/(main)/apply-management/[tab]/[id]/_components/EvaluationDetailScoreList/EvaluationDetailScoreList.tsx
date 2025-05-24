'use client';

import React from 'react';
import { Flex, Text } from '@repo/ui';
import { AccordianList, AccordianItemType } from '@repo/ui';

import { AvatarChip } from '@repo/ui/Avatar';
import { Evaluation } from '../EvaluationStatusCard/EvaluationStatusCard';

type Props = {
  evaluations: Evaluation[];
};

export function EvaluationDetailScoreList({ evaluations }: Props) {
  const complete = evaluations.filter((e) => e.status === 'complete');

  const items: AccordianItemType[] = [
    {
      title: '상세 점수 보기',
      content: (
        <Flex direction="column" gap="1.6rem" align="flexStart">
          {complete.map((d, i) => (
            <Flex key={d.evaluator} direction="row" align="center" gap="0.8rem">
              <AvatarChip
                label={d.evaluator}
                serverColor={d.color}
                zIndex={complete.length - i}
              />
              <Text variant="md2_text_medium" color="grayscale70">
                {d.evaluator}
              </Text>
              <Text variant="md2_text_medium" color="primary50">
                {d.score}점
              </Text>
            </Flex>
          ))}
        </Flex>
      ),
    },
  ];

  return <AccordianList items={items} isNumbering={false} width="100%" />;
}
