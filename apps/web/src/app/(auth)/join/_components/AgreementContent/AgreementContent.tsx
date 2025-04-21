'use client';

import { Text } from '@repo/ui/Text';
import { Flex } from '@repo/ui/Flex';
import { dividerStyle } from '../JoinHeader/JoinHeader.css';

export default function AgreementContent() {
  return (
    <Flex direction="column" gap="2rem">
      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          제 1조 [목적]
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...
        </Text>
      </Flex>

      <div className={dividerStyle} />

      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          제 2조 [정의]
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...
        </Text>
      </Flex>

      <div className={dividerStyle} />

      <Flex direction="column" gap="1.2rem">
        <Text variant="md2_text_semibold" color="grayscale90">
          제 3조 [약관의 효력]
        </Text>
        <Text variant="sm_caption_medium" color="grayscale80">
          더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트더미텍스트...
        </Text>
      </Flex>
    </Flex>
  );
}
