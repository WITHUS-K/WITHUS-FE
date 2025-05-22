'use client';

import React from 'react';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import {
  IcFileBtn,
  IcMailBtn,
  IcMessageBtn,
  IcChargeBtn,
  IcCharts,
} from '@repo/ui/icons/mono';

export interface ActionToolbarProps {
  hasSelection: boolean;
  onDistribute?: () => void;
  onAdd?: () => void;
  onSms: () => void;
  onMail: () => void;
  onFail?: () => void;
  onPass?: () => void;
  /** true일 때, 문자·메일 버튼만 렌더링합니다 */
  communicationOnly?: boolean;
}

export default function ActionToolbar({
  hasSelection,
  onDistribute,
  onAdd,
  onSms,
  onMail,
  onFail,
  onPass,
  communicationOnly = false,
}: ActionToolbarProps) {
  return (
    <Flex
      gap="1rem"
      align="center"
      width="100%"
      justify={communicationOnly ? 'flexEnd' : undefined}
    >
      {!communicationOnly && (
        <>
          <Button
            variant="white"
            size="40"
            width="14.6rem"
            leftIcon={<IcChargeBtn />}
            onClick={onDistribute}
          >
            담당자 분배
          </Button>
          <Button
            variant="white"
            size="40"
            width="14.6rem"
            leftIcon={<IcFileBtn />}
            onClick={onAdd}
          >
            지원자 추가
          </Button>
          <Flex grow="grow1" />
        </>
      )}

      <Button
        variant="sub"
        size="40"
        width="10rem"
        onClick={onSms}
        disabled={!hasSelection}
        leftIcon={<IcMessageBtn />}
      >
        문자
      </Button>
      <Button
        variant="sub"
        size="40"
        width="10rem"
        onClick={onMail}
        disabled={!hasSelection}
        leftIcon={<IcMailBtn />}
      >
        메일
      </Button>

      <Button variant="main" size="40" width="16.3rem" leftIcon={<IcCharts />}>
        평가 기준 설정
      </Button>
    </Flex>
  );
}
