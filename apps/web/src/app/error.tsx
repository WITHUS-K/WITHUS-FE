'use client';
import { useEffect } from 'react';
import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';

export default function RootError({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Flex
      width="100%"
      height="100vh"
      align="center"
      justify="center"
      direction="column"
    >
      <Text variant="md1_text_bold">앗, 문제가 생겼습니다.</Text>
      <Text variant="md1_text_bold">{error.message}</Text>
    </Flex>
  );
}
