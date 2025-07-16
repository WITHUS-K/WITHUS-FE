'use client';

import { Flex, Text } from '@repo/ui';
import Spinner from 'node_modules/@repo/ui/dist/components/Spinner/Spinner';
import React from 'react';

export default function Loading() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.3)',
        zIndex: 9999,
      }}
    >
      <Flex direction="column" gap="2rem" align="center" justify="center">
        <Spinner size={64} strokeWidth={4} color="rgba(44, 96, 255, 0.7)" />
        <Text variant="md1_text_bold" color="grayscale70">
          잠시만 기다려주세요..
        </Text>
      </Flex>
    </div>
  );
}
