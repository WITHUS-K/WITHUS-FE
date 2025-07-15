'use client';
import { Flex } from '@repo/ui/Flex';
import {
  layoutStyle,
  containerStyle,
  headerStyle,
  mobileContainerStyle,
} from './layout.css';
import { Suspense } from 'react';
import { IcAuthLogo } from '@repo/ui/icons/colored';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()!;
  const isMobileOnly = pathname.endsWith('/mobile-only');
  return (
    <Suspense fallback={null}>
      <div className={layoutStyle}>
        <Flex
          tag="header"
          justify="flexStart"
          align="center"
          width="100%"
          paddingLeft="2.4rem"
          className={headerStyle}
        >
          <IcAuthLogo width={130} height={32} />
        </Flex>
        <main className={isMobileOnly ? mobileContainerStyle : containerStyle}>
          {children}
        </main>
      </div>
    </Suspense>
  );
}
