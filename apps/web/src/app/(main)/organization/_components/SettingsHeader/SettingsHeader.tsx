import { Breadcrumb } from '@repo/ui/Breadcrumb';
import { Button } from '@repo/ui/Button';
import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { IcSave } from '@repo/ui/icons/colored';

export default function SettingsHeader({ onSave }: { onSave: () => void }) {
  return (
    <Flex direction="column" width="100%" gap="0.4rem">
      <Breadcrumb>
        <Breadcrumb.Item>조직 관리</Breadcrumb.Item>
        <Breadcrumb.Item active>역할 세부 설정</Breadcrumb.Item>
      </Breadcrumb>

      <Flex align="center" justify="spaceBetween" width="100%">
        <Text variant="xl_title_semibold" color="black">
          파트 세부 설정
        </Text>
        <Button
          variant="main"
          size="40"
          leftIcon={<IcSave width={24} height={24} />}
          onClick={onSave}
          width="10rem"
        >
          저장
        </Button>
      </Flex>
    </Flex>
  );
}
