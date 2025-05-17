'use client';
import { ReactNode } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui';

export default function ApplicantDetailLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Text variant="md2_text_medium" color="grayscale50">
        면접 관리 &gt; 지원자 정보
      </Text>
      <Flex
        direction="column"
        width="100%"
        height="100%"
        align="center"
        marginTop="0.4rem"
      >
        {children}
      </Flex>
    </>
  );
}
