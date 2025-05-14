'use client';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import {
  Evaluation,
  EvaluationStatusCard,
} from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationStatusCard/EvaluationStatusCard';
import * as styles from './EvaluationScoreCard.css';

interface EvaluationScoreCardProps {
  evaluationType: 'document' | 'interview';
  evaluation: Evaluation[];
}

export const EvaluationScoreCard = ({
  evaluationType,
  evaluation,
}: EvaluationScoreCardProps) => {
  const completed = evaluation.filter((e) => e.status === 'complete');

  const sum = completed.reduce((acc, cur) => acc + (cur.score ?? 0), 0);

  const average =
    completed.length > 0 ? parseFloat((sum / completed.length).toFixed(1)) : 0;

  return (
    <div className={styles.container}>
      <Flex gap="1.2rem" align="center">
        <Text variant="xl_title_bold" color="grayscale90">
          {evaluationType === 'document' ? '서류평가 점수' : '면접평가 점수'}
        </Text>
        <Text
          variant="xl_title_bold"
          color="primary50"
        >{`평균: ${average}점`}</Text>
      </Flex>
      <Flex direction="column" align="center" gap="1rem">
        <EvaluationStatusCard evaluation={evaluation} />
        <EvaluationScoreCard
          evaluation={evaluation}
          evaluationType={evaluationType}
        />
      </Flex>
    </div>
  );
};
