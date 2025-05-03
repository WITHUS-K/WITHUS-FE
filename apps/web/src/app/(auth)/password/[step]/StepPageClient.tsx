'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import FindForm from '../_components/Form/FindForm';
import VerifyForm from '../_components/Form/VerifyForm';
import ResetForm from '../_components/Form/ResetForm';
import CompleteForm from '../_components/Form/CompleteForm';

export default function StepPageClient() {
  const { step } = useParams() as { step: string };
  const router = useRouter();
  const searchParams = useSearchParams();

  switch (step) {
    case 'find':
      return <FindForm />;
    case 'verify':
      return <VerifyForm searchParams={searchParams} />;
    case 'reset':
      return <ResetForm searchParams={searchParams} />;
    case 'complete':
      return <CompleteForm router={router} searchParams={searchParams} />;
    default:
      return null;
  }
}
