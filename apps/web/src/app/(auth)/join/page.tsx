'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Flex } from '@repo/ui/Flex';
import JoinHeader from './_components/JoinHeader/JoinHeader';
import Step1 from './_components/Step1/Step1';
import Step2 from './_components/Step2/Step2';
import Step3User from './_components/Step3/Step3User';
import Step3Admin from './_components/Step3/Step3Admin';
import Step4 from './_components/Step4/Step4';

const stepFromQuery = (step: string | null): number => {
  const s = parseInt(step ?? '1', 10);
  return s >= 1 && s <= 4 ? s : 1;
};
const typeFromQuery = (t: string | null): 'user' | 'admin' | null => {
  return t === 'user' || t === 'admin' ? t : null;
};

export default function JoinPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // URL 쿼리로부터 초기 상태
  const initialStep = stepFromQuery(searchParams.get('step'));
  const initialType = typeFromQuery(searchParams.get('type'));

  const [step, setStep] = useState(initialStep);
  const [memberType, setMemberType] = useState<'admin' | 'user' | null>(
    initialType
  );
  const [memberName, setMemberName] = useState<string>('');

  // step 혹은 memberType 변경 시 URL 에 반영
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('step', String(step));
    if (memberType) params.set('type', memberType);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [step, memberType, pathname, router]);

  // memberType 이 없으면 3·4단계 접근 금지
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
        {step === 3 && memberType === 'user' && (
          <Step3User
            onBack={() => goToStep(2)}
            onNext={(name) => {
              setMemberName(name);
              goToStep(4);
            }}
          />
        )}
        {step === 3 && memberType === 'admin' && (
          <Step3Admin
            onBack={() => goToStep(2)}
            onNext={(name) => {
              setMemberName(name);
              goToStep(4);
            }}
          />
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
