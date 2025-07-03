'use client';

import React, { useContext, useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import * as styles from './CriteriaTab.css';
import { IcInfo } from '@repo/ui/icons/mono';
import EvaluationSection from './Section/EvaluationSection';
import { Text } from '@repo/ui/Text';
import { SettingContext } from '../../_context/SettingContext';
import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from '@web/types/application';

export default function CriteriaTab() {
  const [showHeaderInfo, setShowHeaderInfo] = useState(true);
  const { control } = useFormContext<FormValues>();
  const parts =
    useWatch({
      control,
      name: 'applicationParts.parts',
    }) ?? [];
  const sections = parts.length > 0 ? parts : [null];

  return (
    <Flex
      direction="column"
      width="100%"
      gap="1.6rem"
      paddingBottom="5rem"
      paddingTop="5rem"
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

      <Flex direction="column" width="100%" gap="5rem">
        {sections.map((partName, sectionIndex) => {
          return (
            <Flex
              key={sectionIndex}
              direction="column"
              width="100%"
              gap="1.2rem"
            >
              <Text variant="lg_subtitle_bold" color="primary50">
                {partName ?? '공통'}
              </Text>
              <Flex direction="column" width="100%" gap="3.8rem">
                <EvaluationSection
                  label="서류평가 기준"
                  standardName="paperEvaluateStandard"
                  itemsName="paperEvaluateItems"
                  positionName={partName}
                  sectionIndex={sectionIndex}
                />
                <EvaluationSection
                  label="면접평가 기준"
                  standardName="interviewEvaluateStandard"
                  itemsName="interviewEvaluateItems"
                  positionName={partName}
                  sectionIndex={sectionIndex}
                />
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
