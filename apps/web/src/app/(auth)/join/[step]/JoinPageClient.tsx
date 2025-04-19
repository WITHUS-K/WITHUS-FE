'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Step1 from '../_components/Step1/Step1';
import Step2 from '../_components/Step2/Step2';
import Step3User from '../_components/Step3/Step3User';
import Step3Admin from '../_components/Step3/Step3Admin';
import Step4 from '../_components/Step4/Step4';

const stepFromParam = (s: string | undefined): number => {
  const n = parseInt(s ?? '1', 10);
  return n >= 1 && n <= 4 ? n : 1;
};
const typeFromQuery = (t: string | null): 'user' | 'admin' | null =>
  t === 'user' || t === 'admin' ? t : null;

export default function JoinPageClient() {
  const params = useParams() as { step?: string };
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialStep = stepFromParam(params.step);
  const initialType = typeFromQuery(searchParams.get('type'));

  const [step, setStep] = useState(initialStep);
  const [memberType, setMemberType] = useState<'user' | 'admin' | null>(
    initialType
  );
  const [memberName, setMemberName] = useState('');

  // step/type 변경 시 URL 동기화
  useEffect(() => {
    const q = new URLSearchParams();
    if (memberType) q.set('type', memberType);
    router.replace(`/join/${step}?${q.toString()}`, { scroll: false });
  }, [step, memberType, router]);

  // memberType 없을 때 3·4단계 접근 방지
  useEffect(() => {
    if ((step === 3 || step === 4) && !memberType) {
      setStep(1);
    }
  }, [step, memberType]);

  const goToStep = (n: number) => setStep(n);

  // 각 단계별 컴포넌트 렌더링
  switch (step) {
    case 1:
      return (
        <Step1
          onNext={(type) => {
            setMemberType(type);
            goToStep(2);
          }}
        />
      );
    case 2:
      return <Step2 onBack={() => goToStep(1)} onNext={() => goToStep(3)} />;
    case 3:
      return memberType === 'user' ? (
        <Step3User
          onBack={() => goToStep(2)}
          onNext={(name) => {
            setMemberName(name);
            goToStep(4);
          }}
        />
      ) : (
        <Step3Admin
          onBack={() => goToStep(2)}
          onNext={(name) => {
            setMemberName(name);
            goToStep(4);
          }}
        />
      );
    case 4:
      return (
        <Step4 memberName={memberName} onLogin={() => router.push('/login')} />
      );
    default:
      return null;
  }
}
