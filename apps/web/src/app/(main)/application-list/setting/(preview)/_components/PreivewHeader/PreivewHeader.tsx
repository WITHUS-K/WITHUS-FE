'use client';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import React from 'react';
import { useRouter } from 'next/navigation';

export function PreviewHeader() {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      gap="2.4rem"
      width="100%"
      marginBottom="1.2rem"
      marginLeft="0.5rem"
    >
      <Breadcrumb style={{ marginBottom: '2.4rem' }}>
        <Breadcrumb.Item>지원서 리스트</Breadcrumb.Item>
        <Breadcrumb.Item>지원서 생성</Breadcrumb.Item>
        <Breadcrumb.Item active>미리보기</Breadcrumb.Item>
      </Breadcrumb>
      <Flex align="center" justify="spaceBetween" width="100%">
        <Text variant="xl_title_semibold" color="black">
          미리보기
        </Text>
        <Button
          variant="main"
          size="40"
          width="10rem"
          onClick={() => router.back()}
        >
            돌아가기
        </Button>
      </Flex>
    </Flex>
  );
}
