'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Step1 from '../_components/Step1/Step1';
import Step2 from '../_components/Step2/Step2';
import Step3User from '../_components/Step3/Step3User';
import Step3Admin from '../_components/Step3/Step3Admin';
import Step4 from '../_components/Step4/Step4';

const typeFromQuery = (t: string | null): 'user' | 'admin' | null =>
  t === 'user' || t === 'admin' ? t : null;

const buildJoinPath = (step: number, type?: 'user' | 'admin'): string => {
  const q = new URLSearchParams();
  if (type) q.set('type', type);
  const qs = q.toString();
  return `/join/${step}${qs ? `?${qs}` : ''}`;
};

interface JoinPageClientProps {
  step: number;
  modal: React.ReactNode;
}

export default function JoinPageClient({ step, modal }: JoinPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const memberType = typeFromQuery(searchParams.get('type'));

  const goToStep = (next: number, type?: 'user' | 'admin') => {
    router.push(buildJoinPath(next, type));
  };

  let content: React.ReactNode = null;

  switch (step) {
    case 1:
      content = <Step1 onNext={(type) => goToStep(2, type)} />;
      break;
    case 2:
      content = (
        <Step2
          onBack={() => goToStep(1, memberType ?? undefined)}
          onNext={() => goToStep(3, memberType ?? undefined)}
        />
      );
      break;
    case 3:
      if (memberType === 'user') {
        content = <Step3User onBack={() => goToStep(2, memberType)} />;
      } else if (memberType === 'admin') {
        content = <Step3Admin onBack={() => goToStep(2, memberType)} />;
      }
      break;
    case 4:
      content = <Step4 />;
      break;
    default:
      content = null;
  }

  return (
    <>
      {content}
      {modal}
    </>
  );
}
