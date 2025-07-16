import '@repo/ui/styles';
import '@repo/theme/themes';
import { themeClass } from '@repo/theme';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import { Providers } from '@web/components/providers/Providers';
import { META } from '@web/constants/metadata';

const pretendard = localFont({
  src: '../../public/font/subset-PretendardVariable.woff2',
});

export const metadata: Metadata = {
  title: META.title,
  description: META.description,
  keywords: [...META.keyword],
  openGraph: {
    title: META.title,
    description: META.description,
    locale: 'ko_KR',
    type: 'website',
    url: META.url,
    images: {
      url: `${META.url}${META.ogImage}`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} ${themeClass}`}>
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "semapiq713");`,
          }}
        />

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
