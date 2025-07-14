'use client';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import React from 'react';
import { IcMail, IcTextMessage } from '@repo/ui/icons/mono';

interface DetailHeaderProps {
  tab: string;
  name: string;
  status : string;
  onAccept: () => void;
  onReject: () => void;
}

export function DetailHeader({ tab, name, status,  onAccept,
  onReject, }: DetailHeaderProps) {
  const headerMap: Record<string, string> = {
    documents: '서류 평가',
    interviews: '면접 평가',
    final: '최종 합격',
    rejected: '불합격',
  };

  const title = headerMap[tab] ?? '알 수 없는 탭';

  // 버튼 disabled 로직
  let disableAccept = false;
  let disableReject = false;

  if (tab === 'documents') {
    disableAccept = status === 'DOX_PASS';
    disableReject = status === 'DOX_FAIL';
  } else if (tab === 'interviews') {
    disableAccept = status === 'INTERVIEW_PASS';
    disableReject = status === 'INTERVIEW_FAIL';
  } else if (tab === 'final' || tab === 'rejected') {
    // 최종 합격/불합격 탭에선 둘 다 disabled
    disableAccept = true;
    disableReject = true;
  }


  return (
    <Flex direction="column" gap="0.4rem" width="100%" marginBottom="1.2rem">
      <Breadcrumb>
        <Breadcrumb.Item>{title}</Breadcrumb.Item>
        <Breadcrumb.Item active>{name} 상세 정보</Breadcrumb.Item>
      </Breadcrumb>
      <Flex align="center" justify="spaceBetween" width="100%">
        <Text variant="xl_title_semibold" color="black">
          {name} 상세 정보
        </Text>
        <Flex align="center" gap="0.8rem">
          <Button
            variant="sub"
            size="40"
            width="10rem"
            disabled={true}
            leftIcon={<IcTextMessage width={24} height={24} />}
          >
            문자
          </Button>
          <Button
            variant="sub"
            size="40"
            width="10rem"
            disabled={true}
            leftIcon={<IcMail width={24} height={24} />}
          >
            메일
          </Button>
          <Button variant="basic" size="40" width="10rem"  disabled={disableReject} onClick={onReject}>
            불합격
          </Button>
          <Button variant="main" size="40" width="10rem"  disabled={disableAccept} onClick={onAccept}>
            합격
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
