import { Flex } from '@repo/ui/Flex';
import { Text } from '@repo/ui/Text';
import { wrapper, dividerStyle, textStyle } from './page.css';
import { IcLoginLogo } from '@repo/ui/icons/colored';
import LoginForm from './_components/LoginForm/LoginForm';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className={wrapper}>
      <Flex
        direction="column"
        gap="2rem"
        justify="center"
        align="center"
        marginBottom="3.6rem"
      >
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
      <Flex gap="1.6rem" marginTop="1.9rem">
        <Link href="/join" passHref>
          <Text
            variant="md2_text_regular"
            color="grayscale60"
            className={textStyle}
            style={{ cursor: 'pointer' }}
          >
            회원가입
          </Text>
        </Link>
        <span className={dividerStyle} />
        <Link href="/password/find" passHref>
          <Text
            variant="md2_text_regular"
            color="grayscale60"
            style={{ cursor: 'pointer' }}
          >
            비밀번호 찾기
          </Text>
        </Link>
      </Flex>
    </div>
  );
}
