import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';

export default function SubmittedPage() {
  return (
    <Flex
      direction="column"
      height="100%"
      width="100%"
      align="center"
      justify="center"
    >
      <Text variant="xl_title_semibold">
        지원서가 성공적으로 제출되었습니다!
      </Text>
      <Text variant="md1_text_regular" color="grayscale70">
        추가 문의 사항이 있다면 지원팀에 연락해주세요.
      </Text>
    </Flex>
  );
}
