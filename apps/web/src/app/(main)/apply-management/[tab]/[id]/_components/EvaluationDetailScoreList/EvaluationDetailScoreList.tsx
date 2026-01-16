'use client';

import React from 'react';
import { Flex, Text } from '@repo/ui';
import { AccordianList, AccordianItemType } from '@repo/ui';
import * as styles from '../EvaluationScoreCard/EvaluationScoreCard.css';
import { AvatarChip } from '@repo/ui/Avatar';
import { Evaluation } from '../EvaluationStatusCard/EvaluationStatusCard';
import { IcSearch } from '@repo/ui/icons/mono';
import { useRouter, useParams, useSearchParams } from 'next/navigation';

type Props = {
  evaluations: Evaluation[];
};

export function EvaluationDetailScoreList({ evaluations }: Props) {
  const complete = evaluations.filter((e) => e.status === 'complete');

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
              <button type='button' className={styles.iconColor} onClick={openDetailScoreModal}>
              <IcSearch width={18} height={18}/>
              </button>
             
            </Flex>
          ))}
        </Flex>
      ),
    },
  ];

  return <AccordianList items={items} isNumbering={false} width="100%" />;
}
