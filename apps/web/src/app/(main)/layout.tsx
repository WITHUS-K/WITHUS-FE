import * as styles from './layout.css';
import { Suspense } from 'react';
import { Header } from '@repo/ui/Header';
import { Sidebar } from '@repo/ui/Sidebar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // 추후 서버에서 받아온 값으로 바꾸기!!
    <Suspense fallback={null}>
      <div className={styles.layoutStyle}>
        <Header username="운영진123" />
        <div className={styles.containerStyle}>
          <Sidebar role="admin" />
          <main className={styles.contentStyle}>{children}</main>
        </div>
      </div>
    </Suspense>
  );
}
