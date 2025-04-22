import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcCalendar } from '@repo/ui/icons/colored';
export default function InterviewsHomePage() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      width="100%"
      height="100%"
      gap="2rem"
    >
      <IcCalendar width={48} height={48} />
      <Text variant="lg_subtitle_medium" color="grayscale30">
        동아리와 면접 조건을 설정한 후, 타임테이블을 생성하면 이곳에 표시됩니다.
      </Text>
    </Flex>
  );
}
