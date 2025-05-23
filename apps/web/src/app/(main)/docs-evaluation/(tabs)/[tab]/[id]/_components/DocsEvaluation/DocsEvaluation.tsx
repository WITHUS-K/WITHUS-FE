import { AccordianList, Divider } from '@repo/ui';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Stepper } from '@repo/ui/Stepper';
import { Tag } from '@repo/ui/Tag';
import { Text } from '@repo/ui/Text';
import { Evaluation } from '@web/types/document-evaluation';
import * as styles from './DocsEvaluation.css';
import { IcScore } from '@repo/ui/icons/colored';

interface DocsEvaluationProps {
  evaluationList: Evaluation;
  scores: number[];
  onScoreChange: (idx: string, next: number) => void;
}

export const DocsEvaluation = ({
  evaluationList,
  scores,
  onScoreChange,
}: DocsEvaluationProps) => {
  const total = scores.reduce((sum, v) => sum + v, 0);
  const maxTotal = scores.length * 10;
  const average = scores.length > 0 ? Math.round((total / maxTotal) * 100) : 0; // 소수점 없이 반올림

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
            {evaluationList.evaluationType === 'score'
              ? '점수제 평가'
              : '3단계 평가'}
          </Tag>
        </Flex>
        <Button variant="main" size="40" width="8.4rem">
          <Text variant="md2_text_medium" color="white">
            저장
          </Text>
        </Button>
      </Flex>

      <div className={styles.container}>
        {evaluationList.evaluationList.map((e, idx) => (
          <div key={idx} className={styles.evaluationItem}>
            <Flex gap="6.3rem" width="100%" justify="spaceBetween">
              {/* 평가 항목 제목 + 내용 */}
              <Flex direction="column" gap="2rem" width="100%">
                <Text variant="md1_text_semibold" color="grayscale90">
                  평가 항목 {idx + 1}
                </Text>
                <AccordianList
                  items={[{ title: e.evaluation, content: e.evaluationDetail }]}
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
                {average}
              </Text>
              <Text variant="md1_text_semibold" color="grayscale70">
                /100점
              </Text>
            </Flex>
            <div className={styles.tagStyle}>
              <Text variant="xs_caption_medium" color="grayscale50">
                평균 점수: n점
              </Text>
            </div>
          </Flex>
        </div>
      </div>
    </Flex>
  );
};
