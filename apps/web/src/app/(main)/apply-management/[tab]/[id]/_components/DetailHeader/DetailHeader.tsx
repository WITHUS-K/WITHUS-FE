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
}

export function DetailHeader({ tab, name }: DetailHeaderProps) {
  const headerMap: Record<string, string> = {
    documents: '서류 평가',
    interviews: '면접 평가',
    final: '최종 합격',
    rejected: '불합격',
  };

  const title = headerMap[tab] ?? '알 수 없는 탭';

  return (
    <Flex
      direction="column"
      gap="2.4rem"
      width="100%"
      marginBottom="1.2rem"
      marginLeft="0.5rem"
    >
      <Breadcrumb style={{ marginBottom: '2.4rem' }}>
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
            leftIcon={<IcTextMessage width={24} height={24} />}
          >
            문자
          </Button>
          <Button
            variant="sub"
            size="40"
            width="10rem"
            leftIcon={<IcMail width={24} height={24} />}
          >
            메일
          </Button>
          <Button variant="basic" size="40" width="10rem">
            불합격
          </Button>
          <Button variant="main" size="40" width="10rem">
            합격
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
