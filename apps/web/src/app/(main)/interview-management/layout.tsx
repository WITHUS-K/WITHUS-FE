'use client';
import { ReactNode } from 'react';
import Filters from './_components/Filters/Filters';
import { usePathname } from 'next/navigation';

export default function InterviewLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname(); // ②
  const isDetail =
    // “/application/” 세그먼트를 포함하면 상세 페이지로 간주
    pathname.includes('/application/'); // ③

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: '2.4rem',
      }}
    >
      {!isDetail && <Filters />}

      {children}
    </div>
  );
}
