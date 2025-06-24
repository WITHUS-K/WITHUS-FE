'use client';

import LabeledField from "../LabeledField/LabeledField";
import { Text } from "@repo/ui/Text";
import { Flex } from "@repo/ui/Flex";



export default function PasswordSection() {
  return (
    <Flex direction="column" width="100%" gap="2rem" align='flexStart'>
      <Text variant='lg_subtitle_semibold' color='grayscale90'>비밀번호 변경</Text>

      <Flex direction="column" width="100%" gap="3.2rem">
      <LabeledField
        label="현재 비밀번호"
        inputProps={{
          type: 'password',
          placeholder: '현재 비밀번호를 입력해주세요',
        }}
      />

      <LabeledField
        label="새 비밀번호"
        inputProps={{
          type: 'password',
          placeholder: '새 비밀번호를 입력해주세요',
        }}
      />

      <LabeledField
        label="새 비밀번호 확인"
        inputProps={{
          type: 'password',
          placeholder: '새 비밀번호를 다시 입력해주세요',
        }}
      />
        </Flex>
     
    </Flex>
  );
}
