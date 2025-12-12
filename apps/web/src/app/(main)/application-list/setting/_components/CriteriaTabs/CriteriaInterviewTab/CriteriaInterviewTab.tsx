'use client';

import React, { useContext, useMemo, useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import * as styles from '../CriteriaTab.css';
import { IcInfo } from '@repo/ui/icons/mono';
import EvaluationSection from '../Section/EvaluationSection';
import { Text } from '@repo/ui/Text';
import { useFormContext, useWatch } from 'react-hook-form';
import type { FormValues } from '@web/types/application';
import StandardSection from '../Section/StandardSection';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';
import { useOrganizationRolesQuery } from '@web/store/query/useOrganizationRolesQuery';

export default function CriteriaInterviewTab() {
  const [showHeaderInfo, setShowHeaderInfo] = useState(true);
  const { control } = useFormContext<FormValues>();


  const { organizationId } = getClientSideTokens();
  const { data: rolesData } = useOrganizationRolesQuery({ organizationId });

  const roleNameById = useMemo(() => {
    const m = new Map<number, string>();
    (rolesData?.roles ?? []).forEach((r) => m.set(r.id, r.roleName));
    return m;
  }, [rolesData]);

  
  const appParts =
    useWatch({
      control,
      name: 'applicationParts.parts',
    }) || [];

  const interviewSections =
    useWatch({
      control,
      name: 'interviewEvaluateItems' as const,
    }) || [];

  const renderIndices =
    appParts.length > 0
      ? appParts.map((_, idx) => idx) // 공통 없음
      : [0]; // 공통만

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
          label="면접 평가 기준"
          standardName="interviewEvaluateStandard"
        />
      </Flex>

      <Flex direction="column" width="100%" gap="5rem" marginTop="3.2rem">
        {renderIndices.map((idx) => {
          const section = interviewSections[idx];
          const roleId = section?.organizationRoleId ?? 0;

          const label =
            roleId === 0
              ? '공통'
              : roleNameById.get(roleId) ?? '알 수 없음';

          return (
            <Flex key={idx} direction="column" width="100%" gap="1.2rem">
              <Text variant="lg_subtitle_bold" color="primary50">
              {label}
              </Text>
              <Flex direction="column" width="100%" gap="3.8rem">
                {/* 면접 평가 */}
                <EvaluationSection
                  itemsName="interviewEvaluateItems"
                  organizationRoleId={roleId}
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
