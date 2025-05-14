'use client';
import { AvatarChip } from '@repo/ui/Avatar';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Evaluation } from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationStatusCard/EvaluationStatusCard';
import {
  AccordianItemType,
  AccordianList,
} from 'node_modules/@repo/ui/dist/components/List/AccordianList/AccordianList';
import React from 'react';

const details: Evaluation[] = [
  { evaluator: '홍길동', status: 'pending', score: null },
  { evaluator: '이영희', status: 'complete', score: 88 },
  { evaluator: '김철수', status: 'pending', score: null },
  { evaluator: '박민수', status: 'complete', score: 92 },
  { evaluator: '최민지', status: 'pending', score: null },
  { evaluator: '강현우', status: 'complete', score: 95 },
  { evaluator: '유은정', status: 'pending', score: null },
  { evaluator: '서유빈', status: 'complete', score: 90 },
];

const complete = details.filter((d) => d.status === 'complete');

const items: AccordianItemType[] = [
  {
    title: '상세 점수 보기',
    content: (
      <Flex direction="column" gap="1.6rem" align="flexStart">
        {complete.map((d, i) => (
          <Flex key={i} direction="row" align="center" gap="8rem">
            <AvatarChip
              label={d.evaluator}
              index={i}
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

export const EvaluationDetailScoreList = () => (
  <AccordianList items={items} isNumbering={false} width="100%" />
);
