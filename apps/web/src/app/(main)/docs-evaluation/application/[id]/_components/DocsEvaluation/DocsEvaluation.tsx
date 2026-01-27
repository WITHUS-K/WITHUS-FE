import { AccordianList, Divider } from '@repo/ui';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Stepper } from '@repo/ui/Stepper';
import { Tag } from '@repo/ui/Tag';
import { Text } from '@repo/ui/Text';
import { Option } from '@repo/ui/Option';

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
  kind?: 'DOCUMENT' | 'INTERVIEW';
}
const FIXED_FOOTER_HEIGHT = '10rem';

export const DocsEvaluation = ({
  evaluationData,
  scores,
  onScoreChange,
  onSave,
  average,
  kind
}: DocsEvaluationProps) => {
  console.log("평가방식", evaluationData)
  const levels = [
    { id: 10, name: '만족' },
    { id: 5, name: '보통' },
    { id: 0, name: '불만족' },
  ];
  const total = scores.reduce((sum, v) => sum + Math.min(v, 10), 0);
  const maxTotal = scores.length * 10;
  const averageScore =
    scores.length > 0 ? (total / scores.length).toFixed(2) : '0';

  const isLevel = evaluationData.evaluationType === 'level';
  const displayTotal = isLevel ? Math.round((total / maxTotal) * 100) : total;
  const displayMax = isLevel ? 100 : maxTotal;
  const displayAverage = isLevel
    ? ((total / maxTotal) * 100).toFixed(2)
    : averageScore;

    const title = kind === 'INTERVIEW' ? '면접 평가' : '서류 평가';

  return (
    <Flex direction="column" gap="3.2rem" width="100%">
      {/* 서류 평가 헤더 */}
      <Flex align="center" justify="spaceBetween" width="100%">
        <Flex align="center" gap="1.6rem">
          <Text variant="xl_title_semibold" color="black">
           {title}
          </Text>
          <Tag color="#2C60FF">
            평가방식 :{' '}
            {evaluationData.evaluationType === 'score'
              ? '점수제 평가'
              : '3단계 평가'}
          </Tag>
        </Flex>
      </Flex>

      <div className={styles.container}>
        {evaluationData.evaluationList.map((e, idx) => {
          const isLastItem = idx === evaluationData.evaluationList.length - 1;
          const itemMarginStyle = !isLastItem ? { marginBottom: '4rem' } : {};

          return (
            <div
              key={idx}
              className={styles.evaluationItem}
              style={itemMarginStyle}
            >
              <Flex gap="6.3rem" width="100%" justify="spaceBetween">
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

                {evaluationData.evaluationType === 'score' ? (
                  // 점수제 평가
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
                ) : (
                  // 3단계 평가
                  <Flex direction="column" gap="2rem" width="15%">
                    <Text variant="md1_text_semibold" color="grayscale90">
                      점수
                    </Text>
                    <div className={styles.levelsWrapper}>
                      {levels.map((l) => (
                        <Option
                          key={l.id}
                          type="radio"
                          label={l.name}
                          isSelected={scores[idx] === l.id}
                          onChange={() => onScoreChange(`score-${idx}`, l.id)}
                          width="100%"
                          height="4.4rem"
                        />
                      ))}
                    </div>
                  </Flex>
                )}
              </Flex>

              {!isLastItem && (
                <Divider length="100%" borderColor="grayscale10" />
              )}
            </div>
          );
        })}
      </div>
      <div style={{ height: FIXED_FOOTER_HEIGHT }} />

      <div className={styles.finalScoreWrapper}>
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
                {displayTotal}
              </Text>
              <Text variant="md1_text_semibold" color="grayscale70">
                /{displayMax}점
              </Text>
            </Flex>
            <div className={styles.tagStyle}>
              <Text variant="xs_caption_medium" color="grayscale50">
                평균 점수: {displayAverage}점
              </Text>
            </div>
          </Flex>
        </div>
        <Button variant="main" size="48" width="10rem" onClick={onSave}>
          저장
        </Button>
      </div>
    </Flex>
  );
};
