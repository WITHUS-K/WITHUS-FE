import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { wrapper } from './page.css';
import { IcLoginLogo } from '@repo/ui/icons/colored';
import LoginForm from './_components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <div className={wrapper}>
      <Flex direction="column" gap="2rem" justify="center" align="center">
        <IcLoginLogo width={248.12} height={42} />
        <Text
          variant="md1_text_medium"
          color="grayscale90"
          style={{ textAlign: 'center' }}
        >
          복잡한 리크루팅을 효율적으로, 위더스
        </Text>
      </Flex>
      <LoginForm />
    </div>
  );
}
