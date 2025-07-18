'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcAnnotationAlert } from '@repo/ui/icons/colored';

export default function EndPage() {
  return (
    <Flex
      direction="column"
      height="100%"
      width="100%"
      align="center"
      justify="center"
    >
      <Flex direction="column" align="center" justify="center" gap="2.4rem">
        <IcAnnotationAlert width={48} height={48} />
        <Text variant="lg_subtitle_bold" color="grayscale80">
          지원 기간이 아닙니다.
        </Text>
      </Flex>
    </Flex>
  );
}
