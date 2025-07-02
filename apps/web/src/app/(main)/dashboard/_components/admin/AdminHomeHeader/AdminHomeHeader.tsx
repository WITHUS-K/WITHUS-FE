'use client';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import React from 'react';
import { useRouter } from 'next/navigation';
import { IcFileUpload } from '@repo/ui/icons/mono';

export function AdminHomeHeader() {
  const router = useRouter();
  return (
    <Flex
      direction="column"
      gap="2.4rem"
      width="100%"
      marginBottom="1.2rem"
      marginLeft="0.5rem"
    >
      <Flex align="center" justify="spaceBetween" width="100%">
        <Text variant="xl_title_semibold" color="black">
          홈
        </Text>
        <Button
          variant="main"
          size="48"
          width="14.6rem"
          leftIcon={<IcFileUpload width={24} height={24} />}
          onClick={() => router.push(`/application-list/setting/new`)}
        >
          지원서 생성
        </Button>
      </Flex>
    </Flex>
  );
}
