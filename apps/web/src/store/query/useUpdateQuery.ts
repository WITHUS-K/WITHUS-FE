'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type UpdateQueryInput = Record<string, string | null | undefined>;

export function useUpdateQuery() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useCallback(
    (patch: UpdateQueryInput) => {
      const qp = new URLSearchParams(searchParams.toString());

      Object.entries(patch).forEach(([k, v]) => {
        if (v == null || v === '') qp.delete(k);
        else qp.set(k, v);
      });

      const qs = qp.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [router, pathname, searchParams]
  );
}
