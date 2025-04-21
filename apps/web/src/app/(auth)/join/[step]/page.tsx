export const generateStaticParams = () =>
  ['1', '2', '3', '4'].map((step) => ({ step }));

import JoinPageClient from './JoinPageClient';

export default function Page() {
  return <JoinPageClient />;
}
