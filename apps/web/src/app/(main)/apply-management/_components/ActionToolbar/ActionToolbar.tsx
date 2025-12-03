'use client';

import React, { ChangeEvent, KeyboardEvent } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import {
  IcFileBtn,
  IcMailBtn,
  IcMessageBtn,
  IcChargeBtn,
  IcCharts,
  IcDownloadMono
} from '@repo/ui/icons/mono';
import { SearchInput } from '@repo/ui/InputField';
import { SimpleToggleSwitch } from '@repo/ui/SimpleToggleSwitch';

export interface ActionToolbarProps {
  hasSelection: boolean;
  onDistribute?: () => void;
  onAdd?: () => void;
  onSms: () => void;
  onMail: () => void;
  /** true일 때, 문자·메일 버튼만 렌더링*/
  communicationOnly?: boolean;
    searchValue?: string;
  onSearchChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;

  latestSort: boolean;
    onLatestSortChange: (v: boolean) => void;
}

export default function ActionToolbar({
  hasSelection,
  onDistribute,
  onAdd,
  onSms,
  onMail,
  communicationOnly = false,
  searchValue,
  onSearchChange,
  onSearchKeyDown,
    latestSort,
  onLatestSortChange,
}: ActionToolbarProps) {
  return (
    <Flex
      gap="1rem"
      align="center"
      width="100%"
    >
      {communicationOnly ? (
        <>
          <SearchInput
            width="22rem"
            placeholder="이름 검색"
            value={searchValue!}
            onChange={onSearchChange!}
            onKeyDown={onSearchKeyDown}
            keepSearchIcon
          />

          <Flex grow="grow1" />

           <Flex align="center" gap="0.8rem">
            <Text variant='sm_caption_regular' color='grayscale50'>최신순</Text>
            <SimpleToggleSwitch
              checked={latestSort}
              onChange={onLatestSortChange}
            />
          </Flex>

          <Button
            variant="sub"
            size="40"
            width="10rem"
            onClick={onSms}
            leftIcon={<IcMessageBtn />}
          >
            문자
          </Button>

          <Button
            variant="sub"
            size="40"
            width="10rem"
            onClick={onMail}
            leftIcon={<IcMailBtn />}
          >
            메일
          </Button>

           <Button
            variant="white"
            size="40"
            width="14.6rem"
            leftIcon={<IcDownloadMono />}
          >
            엑셀로 다운
          </Button>
        </>
      ) : (
        <>
          <SearchInput
            width="22rem"
            placeholder="이름 검색"
            value={searchValue!}
            onChange={onSearchChange!}
            onKeyDown={onSearchKeyDown}
            keepSearchIcon
          />

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
            
            <Flex align="center" gap="0.8rem">
            <Text variant='sm_caption_regular' color='grayscale50'>최신순</Text>
            <SimpleToggleSwitch
              checked={latestSort}
              onChange={onLatestSortChange}
            />
          </Flex>

          <Button
            variant="sub"
            size="40"
            width="10rem"
            onClick={onSms}
            leftIcon={<IcMessageBtn />}
          >
            문자
          </Button>

          <Button
            variant="sub"
            size="40"
            width="10rem"
            onClick={onMail}
            leftIcon={<IcMailBtn />}
          >
            메일
          </Button>

          <Button
            variant="white"
            size="40"
            width="14.6rem"
            leftIcon={<IcDownloadMono />}
          >
            엑셀로 다운
          </Button>
        </>
      )}
    </Flex>
  );
}