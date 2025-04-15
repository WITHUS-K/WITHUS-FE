import { Text, Flex } from '@/components';

type ModalTextContentProps = {
  title: string;
  description?: string;
};

// 요거는 추후 UI 나오면 변경하기!!
export function ModalTextContent({
  title,
  description,
}: ModalTextContentProps) {
  return (
    <Flex direction="column" gap="2rem" justify="center" align="center">
      <Text variant="md1_text_bold" color="grayscale90">
        {title}
      </Text>
      {description && (
        <Text variant="md1_text_regular" color="grayscale50">
          {description}
        </Text>
      )}
    </Flex>
  );
}
