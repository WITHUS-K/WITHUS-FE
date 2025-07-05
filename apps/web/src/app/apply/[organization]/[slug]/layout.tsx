import { Flex } from '@repo/ui/Flex';
import { layoutStyle, containerStyle, headerStyle } from './layout.css';
import { Suspense } from 'react';
import { IcAuthLogo } from '@repo/ui/icons/colored';

export default function Layout({ children }: { children: React.ReactNode }) {
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
        <main className={containerStyle}>{children}</main>
      </div>
    </Suspense>
  );
}
