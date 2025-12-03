'use client';

import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcAnnotationAlert } from '@repo/ui/icons/colored';

export default function MobileOnlyPage() {
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
          PC로 다시 접근해주시길 바랍니다.
        </Text>
      </Flex>
    </Flex>
  );
}
