'use client';

import React, { useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { CheckBox } from '@repo/ui/CheckBox';
import AgreementItem from './AgreementItem';
import { containerStyle } from './Step2.css';
import { buttonStyle } from '../Step1/Step1.css';

interface Step2Props {
  onBack: () => void;
  onNext: () => void;
}

export default function Step2({ onBack, onNext }: Step2Props) {
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const allAgreed = agreeTerms && agreePrivacy && agreeMarketing;

  const handleAllChange = () => {
    const next = !allAgreed;
    setAgreeTerms(next);
    setAgreePrivacy(next);
    setAgreeMarketing(next);
  };

  return (
    <Flex
      direction="column"
      gap="2rem"
      align="center"
      width="100%"
      marginTop="2.8rem"
    >
      <Text variant="md1_text_semibold" color="grayscale80">
        위더스 서비스 시작 및 가입을 위해 정보 제공에 동의해주세요.
      </Text>

      <Flex direction="column" marginTop="1.6rem" width="100%">
        <Flex align="center" gap="1.2rem" className={containerStyle}>
          <CheckBox isChecked={allAgreed} onChange={handleAllChange} />
          <Text variant="md2_text_medium" color="grayscale80">
            전체 동의
          </Text>
        </Flex>

        <AgreementItem
          isChecked={agreeTerms}
          onChange={() => setAgreeTerms((prev) => !prev)}
          label="이용 약관 동의"
        />
        <AgreementItem
          isChecked={agreePrivacy}
          onChange={() => setAgreePrivacy((prev) => !prev)}
          label="개인정보 수집 동의"
        />
        <AgreementItem
          isChecked={agreeMarketing}
          onChange={() => setAgreeMarketing((prev) => !prev)}
          label="마케팅 이용 약관 동의"
        />
      </Flex>

      <Flex gap="1rem" className={buttonStyle}>
        <Button variant="basic" size="48" width="20.7rem" onClick={onBack}>
          이전
        </Button>
        <Button
          variant="main"
          size="48"
          width="20.7rem"
          disabled={!allAgreed}
          onClick={onNext}
        >
          다음
        </Button>
      </Flex>
    </Flex>
  );
}
