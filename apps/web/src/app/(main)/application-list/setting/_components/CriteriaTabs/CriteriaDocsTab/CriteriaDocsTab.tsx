'use client';

import React, { useContext, useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import * as styles from '../CriteriaTab.css';
import { IcInfo } from '@repo/ui/icons/mono';
import EvaluationSection from '../Section/EvaluationSection';
import { Text } from '@repo/ui/Text';
import { useFormContext, useWatch } from 'react-hook-form';
import type { FormValues } from '@web/types/application';
import StandardSection from '../Section/StandardSection';

export default function CriteriaDocsTab() {
  const [showHeaderInfo, setShowHeaderInfo] = useState(true);
  const { control } = useFormContext<FormValues>();

  const appParts =
    useWatch({
      control,
      name: 'applicationParts.parts',
    }) || [];

  const paperSections =
    useWatch({
      control,
      name: 'paperEvaluateItems' as const,
    }) || [];

  const renderIndices =
    appParts.length > 0
      ? paperSections.map((_, idx) => idx).filter((idx) => idx !== 0)
      : [0];

  return (
    <Flex
      direction="column"
      width="100%"
      gap="3.2rem"
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
      <Flex direction="column" width="100%" gap="1.6rem">
        <StandardSection
          label="서류 평가 기준"
          standardName="paperEvaluateStandard"
        />
      </Flex>

      <Flex direction="column" width="100%" gap="5rem" marginTop="3.2rem">
        {renderIndices.map((idx) => {
          const partName = paperSections[idx]!.positionName; // null 또는 파트명
          return (
            <Flex key={idx} direction="column" width="100%" gap="1.2rem">
              <Text variant="lg_subtitle_bold" color="primary50">
                {partName ?? '공통'}
              </Text>
              <Flex direction="column" width="100%" gap="3.8rem">
                {/* 서류 평가 */}
                <EvaluationSection
                  itemsName="paperEvaluateItems"
                  positionName={partName}
                  sectionIndex={idx}
                />
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
