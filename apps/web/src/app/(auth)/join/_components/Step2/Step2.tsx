'use client';

import React, { useState } from 'react';
import { Flex } from '@repo/ui/Flex';
import { Button } from '@repo/ui/Button';
import { Text } from '@repo/ui/Text';
import { CheckBox } from '@repo/ui/CheckBox';
import { containerStyle } from './Step2.css';

interface Step2Props {
  onBack: () => void;
  onNext: () => void;
}

export default function Step2({ onBack, onNext }: Step2Props) {
  // 개별 동의 상태
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  // 전체 동의 상태 (세 가지가 모두 true여야 전체동의가 true)
  const allAgreed = agreeTerms && agreePrivacy && agreeMarketing;

  // 전체동의 토글 핸들러
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

      {/* 체크박스 그룹 */}
      <Flex direction="column" marginTop="1.6rem" width="100%">
        {/* 전체 동의 */}
        <Flex align="center" gap="1.2rem" className={containerStyle}>
          <CheckBox isChecked={allAgreed} onChange={handleAllChange} />
          <Text variant="md2_text_medium" color="grayscale80">
            전체 동의
          </Text>
        </Flex>

        <Flex align="center" gap="1.2rem">
          <CheckBox
            isChecked={agreeTerms}
            onChange={() => setAgreeTerms((prev) => !prev)}
          />
          <Flex align="center" gap="0.3rem">
            <Text variant="md2_text_medium" color="primary50">
              (필수)
            </Text>
            <Text variant="md2_text_medium" color="grayscale80">
              이용 약관 동의
            </Text>
          </Flex>
        </Flex>

        <Flex align="center" gap="1.2rem">
          <CheckBox
            isChecked={agreePrivacy}
            onChange={() => setAgreePrivacy((prev) => !prev)}
          />
          <Flex align="center" gap="0.3rem">
            <Text variant="md2_text_medium" color="primary50">
              (필수)
            </Text>
            <Text variant="md2_text_medium" color="grayscale80">
              개인정보 수집 동의
            </Text>
          </Flex>
        </Flex>

        <Flex align="center" gap="1.2rem">
          <CheckBox
            isChecked={agreeMarketing}
            onChange={() => setAgreeMarketing((prev) => !prev)}
          />
          <Flex align="center" gap="0.3rem">
            <Text variant="md2_text_medium" color="primary50">
              (필수)
            </Text>
            <Text variant="md2_text_medium" color="grayscale80">
              마케팅 이용 약관 동의
            </Text>
          </Flex>
        </Flex>
      </Flex>

      {/* 이전/다음 버튼 */}
      <Flex gap="1rem" marginTop="2rem">
        <Button variant="sub" size="48" onClick={onBack}>
          이전
        </Button>
        <Button variant="main" size="48" disabled={!allAgreed} onClick={onNext}>
          다음
        </Button>
      </Flex>
    </Flex>
  );
}
