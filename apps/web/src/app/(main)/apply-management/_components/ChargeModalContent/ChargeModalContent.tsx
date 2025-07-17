'use client';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { IcInputSearch } from '@repo/ui/icons/colored';
import { InputField } from '@repo/ui/InputField';
import ProfileChip from './ProfileChip/ProfileChip';
import ProfileListItem from './ProfileListItem/ProfileListItem';
import * as styles from './ChargeModalContent.css';
import { Evaluator } from '../EvalBubbles/EvalBubbles';
import { useParams, useSearchParams } from 'next/navigation';
import { stageMap } from '../../[tab]/TabClient';
import { useAdminApplicationsQuery } from '@web/store/query/useAdminApplicationsQuery';
import { useOrganizationUsersQuery } from '@web/store/query/useOrganizationUsersQuery';
import { useUpdateEvaluators } from '@web/store/mutation/useUpdateEvaluators';
import { useEvaluatorStore } from '@web/store/state/evaluatorStore';
import { getClientSideTokens } from '@web/utils/getClientSideTokens';

export interface ChargeModalContentRef {
  handleConfirm: () => void;
}

interface Props {
  onClose: () => void;
}

export const ChargeModalContent = forwardRef<ChargeModalContentRef, Props>(
  ({ onClose }, ref) => {
    const params = useParams();
    const [inputKeyword, setInputKeyword] = useState('');
    const [searchKeyword, setSearchKeyword] = useState('');

    const searchParams = useSearchParams();

    const tab = Array.isArray(params.tab) ? params.tab[0] : params.tab!;

    const applicationId = Number(searchParams.get('applicationId'));
    const recruitmentId = Number(searchParams.get('recruitmentId'));
    const evaluationType = stageMap[tab!] as 'DOCUMENT' | 'INTERVIEW';

    const assigned = useEvaluatorStore((s) => s.selectedEvaluators);
    const setAssigned = useEvaluatorStore((s) => s.setSelectedEvaluators);

    useEffect(() => {
      if (inputKeyword.trim() === '') {
        setSearchKeyword('');
      }
    }, [inputKeyword]);

    const { organizationId } = getClientSideTokens();

    console.log('조직id', organizationId);
    const { data: candidates = [] } = useOrganizationUsersQuery({
      organizationId,
      keyword: searchKeyword,
    });

    console.log('모달 - 배정', assigned);
    console.log('모달 - 리스트', candidates);

    const update = useUpdateEvaluators(recruitmentId, evaluationType);

    const handleAdd = (p: (typeof assigned)[0]) => {
      if (!assigned.find((a) => a.userId === p.userId)) {
        setAssigned([...assigned, p]);
      }
    };

    const handleRemove = (p: (typeof assigned)[0]) => {
      setAssigned(assigned.filter((a) => a.userId !== p.userId));
    };

    useImperativeHandle(ref, () => ({
      handleConfirm: () => {
        const evaluatorIds = assigned.map((a) => a.userId);
        update.mutate(
          { applicationId, evaluationType, evaluatorIds },
          { onSuccess: onClose }
        );
      },
    }));
    return (
      <Flex direction="column" gap="1.5rem">
        {/* 배정 현황 */}
        <Flex
          direction="column"
          gap="1.2rem"
          width="100%"
          className={styles.gridContainer}
        >
          <Text variant="sm_caption_semibold" color="grayscale90">
            배정 현황
          </Text>
          <div className={styles.assignedGrid}>
            {assigned.map((p, idx) => (
              <ProfileChip
                key={p.name}
                person={p}
                index={idx}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </Flex>

        {/* 검색 */}
        <Flex gap="1.2rem" width="100%" align="center">
          <InputField
            placeholder="검색"
            value={inputKeyword}
            onChange={(e) => setInputKeyword(e.currentTarget.value)}
            icon={<IcInputSearch width={22} height={22} />}
            size="search"
            width="100%"
          />
          <Button
            size="40"
            variant="sub"
            width="6.8rem"
            onClick={() => setSearchKeyword(inputKeyword.trim())}
            disabled={!inputKeyword.trim()}
          >
            검색
          </Button>
        </Flex>

        {/* 결과 리스트 */}
        <Flex direction="column" width="100%" style={{ height: '33rem' }}>
          {candidates.map((p, idx) => (
            <ProfileListItem
              key={`${p.userId}-${p.name}`}
              person={p}
              onAdd={handleAdd}
              index={idx}
              added={!!assigned.find((a) => a.userId === p.userId)}
            />
          ))}
        </Flex>
      </Flex>
    );
  }
);
