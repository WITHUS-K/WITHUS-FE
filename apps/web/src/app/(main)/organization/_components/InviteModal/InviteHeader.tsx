'use client';

import React from 'react';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcLink } from '@repo/ui/icons/mono';

export type InviteHeaderProps = {
  count: number;
  onCopyLink: () => void;
};

export default function InviteHeader({ count, onCopyLink }: InviteHeaderProps) {
  return (
    <Flex align="center" justify="spaceBetween" width="100%">
      <Flex align="flexEnd" gap="0.8rem">
        <Text variant="md1_text_bold" color="grayscale90">
          계정 초대
        </Text>
        <Text variant="sm_caption_medium" color="grayscale60">
          {count}명
        </Text>
      </Flex>
      <Button
        variant="sub"
        size="32"
        width="9.7rem"
        leftIcon={<IcLink />}
        onClick={onCopyLink}
      >
        링크복사
      </Button>
    </Flex>
  );
}
