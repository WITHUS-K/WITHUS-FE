'use client';

import React from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Step1 from '../_components/Step1/Step1';
import Step2 from '../_components/Step2/Step2';
import Step3User from '../_components/Step3/Step3User';
import Step3Admin from '../_components/Step3/Step3Admin';
import Step4 from '../_components/Step4/Step4';

const stepFromParam = (s?: string): number => {
  const n = parseInt(s ?? '1', 10);
  return n >= 1 && n <= 4 ? n : 1;
};

const typeFromQuery = (t: string | null): 'user' | 'admin' | null =>
  t === 'user' || t === 'admin' ? t : null;

const buildJoinPath = (step: number, type?: 'user' | 'admin'): string => {
  const q = new URLSearchParams();
  if (type) q.set('type', type);
  const qs = q.toString();
  return `/join/${step}${qs ? `?${qs}` : ''}`;
};

export default function JoinPageClient() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const step = stepFromParam(params.step as string | undefined);
  const memberType = typeFromQuery(searchParams.get('type'));

  const goToStep = (step: number, type?: 'user' | 'admin') => {
    router.push(buildJoinPath(step, type));
  };

  switch (step) {
    case 1:
      return <Step1 onNext={(type) => goToStep(2, type)} />;
    case 2:
      return (
        <Step2
          onBack={() => goToStep(1, memberType ?? undefined)}
          onNext={() => goToStep(3, memberType ?? undefined)}
        />
      );
    case 3:
      if (!memberType) return null;
      return memberType === 'user' ? (
        <Step3User onBack={() => goToStep(2, memberType)} />
      ) : (
        <Step3Admin onBack={() => goToStep(2, memberType)} />
      );
    case 4:
      return <Step4 />;
    default:
      return null;
  }
}
