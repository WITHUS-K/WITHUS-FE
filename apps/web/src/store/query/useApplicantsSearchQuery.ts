'use client';

import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RecipientUser } from '../state/useRecipientsStore';

const MOCK: RecipientUser[] = [
  { id: '1', name: '김현호', email: 'rable8264@gmail.com' },
  { id: '2', name: '아현', email: 'babymonster@gmail.com' },
  { id: '3', name: '민지', email: 'njz@gmail.com' },
  { id: '4', name: '이서', email: 'ive@gmail.com' },
  { id: '5', name: '로라', email: 'babymonster@gmail.com' },
  { id: '6', name: '지은', email: 'jieun0116@gmail.com' },
];

export function useApplicantsSearchQuery(keyword: string) {
  return useQuery({
    queryKey: ['applicants-search', keyword],
    queryFn: async () => {
      // 나중에 API 나오면 여기서 GET 호출로 교체하면 됨
      // ex) return GET<{items: User[]}>('api/v1/...', { searchParams: { keyword } })

      const k = keyword.trim().toLowerCase();
      if (!k) return MOCK;

      return MOCK.filter(
        (u) =>
          u.name.toLowerCase().includes(k) ||
          u.email.toLowerCase().includes(k)
      );
    },
    staleTime: 5_000,
  });
}
