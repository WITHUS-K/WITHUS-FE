import { Text, Flex } from '../..';
import type { ReactNode } from 'react';

type ModalTextContentProps = {
  icon?: ReactNode;
  title?: string;
  description: string;
};

export function ModalTextContent({
  icon,
  title,
  description,
}: ModalTextContentProps) {
  return (
    <Flex
      direction="column"
      gap="2rem"
      justify="center"
      align="center"
      paddingTop="2rem"
      paddingBottom="2rem"
    >
      {icon}
      {title && (
        <Text
          variant="lg_subtitle_bold"
          color="grayscale90"
          style={{ textAlign: 'center', whiteSpace: 'pre-line' }}
        >
          {title}
        </Text>
      )}

      <Text
        variant="md1_text_medium"
        color="grayscale70"
        style={{ textAlign: 'center', whiteSpace: 'pre-line' }}
      >
        {description}
      </Text>
    </Flex>
  );
}
