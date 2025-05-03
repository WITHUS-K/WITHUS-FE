'use client';

import React from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import JoinPageClient from '../JoinPageClient';
import ClubSearchModal from '../@modal/(.)club-search/page';
import { ClubProvider } from '../../_context/ClubContext';

export default function Page() {
  const params = useParams() as { step?: string; modal?: string[] };
  const searchParams = useSearchParams();

  const stepNum = parseInt(params.step ?? '1', 10);

  const showClubSearch = params.modal?.[0] === 'club-search';

  return (
    <JoinPageClient
      step={stepNum}
      modal={showClubSearch ? <ClubSearchModal /> : null}
    />
  );
}
