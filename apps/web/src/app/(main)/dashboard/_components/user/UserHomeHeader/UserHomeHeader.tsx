'use client';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import React from 'react';

export function UserHomeHeader() {
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
      </Flex>
    </Flex>
  );
}
