'use client';

import React from 'react';
import { Flex, Text } from '@repo/ui';
import { AccordianList, AccordianItemType } from '@repo/ui';
import * as styles from '../EvaluationScoreCard/EvaluationScoreCard.css';
import { AvatarChip } from '@repo/ui/Avatar';
import { Evaluation } from '../EvaluationStatusCard/EvaluationStatusCard';
import { IcSearch } from '@repo/ui/icons/mono';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { CompletedEvaluator } from '@web/constants/document';

type Props = {
  evaluationType: 'document' | 'interview';
  completed: CompletedEvaluator[];
};

export function EvaluationDetailScoreList({ evaluationType, completed }: Props) {

  const router = useRouter();
  const params = useParams<{ tab: string; id: string }>();
  const searchParams = useSearchParams();

  const recruitmentId = searchParams.get('recruitmentId');

  const openDetailScoreModal = () => {
    router.push(
      `/apply-management/${params.tab}/${params.id}/detail-score` +
        (recruitmentId ? `?recruitmentId=${recruitmentId}` : '')
    );
  };
  
  const items: AccordianItemType[] = [
    {
      title: '상세 점수 보기',
      content: (
        <Flex direction="column" gap="1.6rem" align="flexStart">
          {completed.map((d, i) => (
            <Flex
              key={d.evaluator.userId}
              direction="row"
              align="center"
              gap="0.8rem"
            >
              <AvatarChip
                label={d.evaluator.name}
                serverColor={d.evaluator.profileColor}
                zIndex={completed.length - i}
              />
              <Text variant="md2_text_medium" color="grayscale70">
                {d.evaluator.name}
              </Text>
              <Text variant="md2_text_medium" color="primary50">
                {d.totalScore}점
              </Text>

              <button
                type="button"
                className={styles.iconColor}
                onClick={openDetailScoreModal}
                aria-label={`${evaluationType}-detail-score`}
              >
                <IcSearch width={18} height={18} />
              </button>
            </Flex>
          ))}
        </Flex>
      ),
    },
  ];

  return <AccordianList items={items} isNumbering={false} width="100%" />;
}
