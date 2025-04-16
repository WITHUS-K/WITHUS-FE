'use client';

import React, { useEffect, useState } from 'react';
import JoinHeader from './_components/JoinHeader/JoinHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import Step1 from './_components/Step1/Step1';
import Step2 from './_components/Step2/Step2';
import Step4 from './_components/Step4/Step4';

const stepFromQuery = (step: string | null): number => {
  const s = parseInt(step ?? '1', 10);
  return s >= 1 && s <= 4 ? s : 1;
};

export default function JoinPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStep = stepFromQuery(searchParams.get('step'));

  const [step, setStep] = useState(initialStep);
  const [memberType, setMemberType] = useState<'admin' | 'user' | null>(null);
  const [memberName, setMemberName] = useState<string>('이채원');

  // step 변경 시 URL 쿼리 갱신
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('step', step.toString());
    router.replace(`?${params.toString()}`);
  }, [step, router, searchParams]);

  useEffect(() => {
    if ((step === 3 || step === 4) && !memberType) {
      setStep(1);
    }
  }, [step, memberType]);

  const goToStep = (next: number) => setStep(next);

  return (
    <Flex direction="column" width="43.4rem" paddingTop="8.4rem">
      <JoinHeader step={step} />
      <section style={{ width: '100%' }}>
        {step === 1 && (
          <Step1
            onNext={(type) => {
              setMemberType(type);
              goToStep(2);
            }}
          />
        )}
        {step === 2 && (
          <Step2 onBack={() => goToStep(1)} onNext={() => goToStep(3)} />
        )}

        {step === 4 && (
          <Step4
            memberName={memberName}
            onLogin={() => router.push('/login')}
          />
        )}
      </section>
    </Flex>
  );
}
