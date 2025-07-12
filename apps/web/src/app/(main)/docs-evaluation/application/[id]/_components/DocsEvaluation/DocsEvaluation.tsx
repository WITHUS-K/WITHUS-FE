import { AccordianList, Divider } from '@repo/ui';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Stepper } from '@repo/ui/Stepper';
import { Tag } from '@repo/ui/Tag';
import { Text } from '@repo/ui/Text';

import * as styles from './DocsEvaluation.css';
import { IcScore } from '@repo/ui/icons/colored';
import { Evaluation } from '@web/store/query/useApplicationDetailQuery';

export interface EvaluationData {
  evaluationType: 'score' | 'level';
  evaluationList: Evaluation[];
}

interface DocsEvaluationProps {
  evaluationData: EvaluationData;
  scores: number[];
  onScoreChange: (name: string, next: number) => void;
  onSave: () => void;
  average: string;
}

export const DocsEvaluation = ({
  evaluationData,
  scores,
  onScoreChange,
  onSave,
  average,
}: DocsEvaluationProps) => {
  const total = scores.reduce((sum, v) => sum + v, 0);
  const maxTotal = scores.length * 10;
  const averageScore =
    scores.length > 0 ? (total / scores.length).toFixed(1) : '0';

  return (
    <Flex direction="column" gap="3.2rem" width="100%">
      {/* 서류 평가 헤더 */}
      <Flex align="center" justify="spaceBetween" width="100%">
        <Flex align="center" gap="1.6rem">
          <Text variant="xl_title_semibold" color="black">
            서류 평가
          </Text>
          <Tag color="#2C60FF">
            평가방식 :{' '}
            {evaluationData.evaluationType === 'score'
              ? '점수제 평가'
              : '3단계 평가'}
          </Tag>
        </Flex>
        <Button variant="main" size="40" width="8.4rem" onClick={onSave}>
          저장
        </Button>
      </Flex>

      <div className={styles.container}>
        {evaluationData.evaluationList.map((e, idx) => (
          <div key={idx} className={styles.evaluationItem}>
            <Flex gap="6.3rem" width="100%" justify="spaceBetween">
              {/* 평가 항목 제목 + 내용 */}
              <Flex direction="column" gap="2rem" width="100%">
                <Text variant="md1_text_semibold" color="grayscale90">
                  평가 항목 {idx + 1}
                </Text>
                <AccordianList
                  items={[
                    {
                      title: e.criteria.content,
                      content: e.criteria.description,
                    },
                  ]}
                  isNumbering
                  width="100%"
                  readOnly
                />
              </Flex>

              {/* 점수 스테퍼 */}
              <Flex direction="column" gap="2rem">
                <Text variant="md1_text_semibold" color="grayscale90">
                  점수
                </Text>
                <Stepper
                  name={`score-${idx}`}
                  value={scores[idx] ?? 0}
                  onChange={onScoreChange}
                  disabled={false}
                />
              </Flex>
            </Flex>

            <Divider length="100%" borderColor="grayscale10" />
          </div>
        ))}

        {/* 최종 점수 */}
        <div className={styles.scoreContainer}>
          <Flex gap="1.2rem" align="center">
            <IcScore width={24} height={24} />
            <Text variant="md1_text_semibold" color="primary50">
              최종 점수
            </Text>
          </Flex>
          <Flex gap="1.6rem" align="center">
            <Flex gap="0" align="center">
              <Text variant="md1_text_semibold" color="primary50">
                {total}
              </Text>
              <Text variant="md1_text_semibold" color="grayscale70">
                /{maxTotal}점
              </Text>
            </Flex>
            <div className={styles.tagStyle}>
              <Text variant="xs_caption_medium" color="grayscale50">
                평균 점수: {averageScore}점
              </Text>
            </div>
          </Flex>
        </div>
      </div>
    </Flex>
  );
};
