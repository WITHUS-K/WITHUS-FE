'use client';

import React, { useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import * as styles from './CriteriaTab.css';
import { IcInfo } from '@repo/ui/icons/mono';
import EvaluationSection from './Section/EvaluationSection';

export default function CriteriaTab() {
  const [showHeaderInfo, setShowHeaderInfo] = useState(true);

  return (
    <Flex direction="column" width="100%" gap="1.6rem" paddingBottom="5rem">
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
        <EvaluationSection
          label="서류평가 기준"
          standardName="paperEvaluateStandard"
          itemsName="paperEvaluateItems"
        />
        <EvaluationSection
          label="면접평가 기준"
          standardName="interviewEvaluateStandard"
          itemsName="interviewEvaluateItems"
        />
      </Flex>
    </Flex>
  );
}
