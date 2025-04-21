import '@repo/ui/styles';
import '@repo/theme/themes';
import { themeClass } from '@repo/theme';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { OverlayProvider } from 'overlay-kit';
import { Providers } from '@web/components/providers/Providers';
const pretendard = localFont({
  src: '../../public/font/subset-PretendardVariable.woff2',
});
export const metadata: Metadata = {
  title: 'WithUS',
  description: '큐시즘 밋업프로젝트 7팀',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} ${themeClass}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
