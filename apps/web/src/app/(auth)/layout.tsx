import { layoutStyle, containerStyle } from './layout.css';
import { Suspense } from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={null}>
      <div className={layoutStyle}>
        {/* 임시 헤더 - 공컴 헤더로 바꿔야함!! */}
        <header
          style={{
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '60px',
            backgroundColor: 'black',
          }}
        />
        <main className={containerStyle}>{children}</main>
      </div>
    </Suspense>
  );
}
