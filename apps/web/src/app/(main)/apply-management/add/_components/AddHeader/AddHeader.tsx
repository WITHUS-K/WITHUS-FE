import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import React from 'react';
import { useRouter } from 'next/navigation';

export function AddHeader() {
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
        <Breadcrumb.Item>지원 현황 관리</Breadcrumb.Item>
        <Breadcrumb.Item active>지원자 추가</Breadcrumb.Item>
      </Breadcrumb>
      <Flex align="center" justify="spaceBetween" width="100%">
        <Text variant="xl_title_semibold" color="black">
          지원자 추가
        </Text>
        <Button
          variant="basic"
          size="40"
          width="10rem"
          onClick={() => router.push('/apply-management')}
        >
          <Text variant="md2_text_medium" color="white">
            취소
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
}
