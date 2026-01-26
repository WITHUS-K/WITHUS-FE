'use client';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import {
  Evaluation,
  EvaluationStatusCard,
} from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationStatusCard/EvaluationStatusCard';
import * as styles from './EvaluationScoreCard.css';
import { EvaluationDetailScoreList } from '@web/app/(main)/apply-management/[tab]/[id]/_components/EvaluationDetailScoreList/EvaluationDetailScoreList';
import { CompletedEvaluator } from '@web/constants/document';

interface EvaluationScoreCardProps {
  evaluationType: 'document' | 'interview';

  /** data.documentAverageScore / data.interviewAverageScore (문자열이어도 OK) */
  averageScore: string | number;

  /** 상태카드(대기/완료 카운트+아바타)용 */
  evaluation: Evaluation[];

  /** 상세 점수(완료자 리스트, totalScore 사용)용 */
  completed: CompletedEvaluator[];
}

export const EvaluationScoreCard = ({
  evaluationType,
  evaluation,
  averageScore,
  completed,
}: EvaluationScoreCardProps) => {
  const avgText = Number.isNaN(Number(averageScore))
  ? String(averageScore)
  : Number(averageScore);
  //const sum = completed.reduce((acc, cur) => acc + (cur.score ?? 0), 0);

  //const average =
    //completed.length > 0 ? parseFloat((sum / completed.length).toFixed(1)) : 0;

  return (
    <div className={styles.container}>
      <Flex gap="1.2rem" align="center">
        <Text variant="xl_title_bold" color="grayscale90">
          {evaluationType === 'document' ? '서류평가 점수' : '면접평가 점수'}
        </Text>
        <Text
          variant="xl_title_bold"
          color="primary50"
        >{`평균: ${avgText}점`}</Text>
      </Flex>
      <Flex direction="column" align="center" gap="1rem">
        <EvaluationStatusCard evaluation={evaluation} />
        <EvaluationDetailScoreList evaluationType={evaluationType} completed={completed}/>
      </Flex>
    </div>
  );
};
