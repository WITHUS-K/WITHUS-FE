// app/(main)/application-list/setting/_components/CriteriaTab/CriteriaTab.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcBtnPlusCircle } from '@repo/ui/icons/colored';
import type { FormValues, EvaluationItem } from '@web/types/application';
import * as styles from './CriteriaTab.css';
import StandardSection from './Section/StandardSection';
import EvaluationItemCard from './Section/EvaluationItemCard';
import { IcInfo } from '@repo/ui/icons/mono';

export default function CriteriaTab() {
  const { control } = useFormContext<FormValues>();
  const [showHeaderInfo, setShowHeaderInfo] = useState(true);
  const {
    fields: paperFields,
    append: appendPaper,
    remove: removePaper,
  } = useFieldArray<FormValues, 'paperEvaluateItems'>({
    control,
    name: 'paperEvaluateItems',
  });

  const {
    fields: interviewFields,
    append: appendInterview,
    remove: removeInterview,
  } = useFieldArray<FormValues, 'interviewEvaluateItems'>({
    control,
    name: 'interviewEvaluateItems',
  });

  useEffect(() => {
    if (paperFields.length === 0) {
      appendPaper({ evaluate: '', evaluateDetail: '' });
    }
    if (interviewFields.length === 0) {
      appendInterview({ evaluate: '', evaluateDetail: '' });
    }
  }, []);

  return (
    <Flex
      direction="column"
      width="100%"
      marginTop="4rem"
      gap="1.6rem"
      paddingBottom="5rem"
    >
      {showHeaderInfo && (
        <div className={styles.headerInfo}>
          <div className={styles.headerInfoDetail}>
            <IcInfo width={18} height={18} />
            해당 부분은 지원자에게는 노출되지 않는 페이지입니다.
          </div>
          <div
            className={styles.headerInfoBtn}
            onClick={() => setShowHeaderInfo(false)}
          >
            닫기
          </div>
        </div>
      )}

      <Flex direction="column" width="100%" gap="10rem">
        <Flex width="100%" direction="column">
          {/* 1) 서류평가 기준 */}
          <StandardSection
            label="서류평가 기준"
            standardName="paperEvaluateStandard"
          />
          <Flex
            direction="column"
            gap="2.4rem"
            width="100%"
            marginTop="5rem"
            align="center"
          >
            {paperFields.map((f, idx) => (
              <EvaluationItemCard
                key={f.id}
                index={idx}
                prefix="paperEvaluateItems"
                onRemove={() => removePaper(idx)}
              />
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={() => appendPaper({ evaluate: '', evaluateDetail: '' })}
            >
              <IcBtnPlusCircle width={24} height={24} />
              <Text variant="md2_text_semibold" color="grayscale40">
                추가
              </Text>
            </button>
          </Flex>
        </Flex>

        <Flex width="100%" direction="column">
          {/* 2) 면접평가 기준 */}
          <StandardSection
            label="면접평가 기준"
            standardName="interviewEvaluateStandard"
          />
          <Flex
            direction="column"
            gap="2.4rem"
            width="100%"
            marginTop="5rem"
            align="center"
          >
            {interviewFields.map((f, idx) => (
              <EvaluationItemCard
                key={f.id}
                index={idx}
                prefix="interviewEvaluateItems"
                onRemove={() => removeInterview(idx)}
              />
            ))}
            <button
              type="button"
              className={styles.addButton}
              onClick={() =>
                appendInterview({ evaluate: '', evaluateDetail: '' })
              }
            >
              <IcBtnPlusCircle width={24} height={24} />
              <Text variant="md2_text_semibold" color="grayscale40">
                추가
              </Text>
            </button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
