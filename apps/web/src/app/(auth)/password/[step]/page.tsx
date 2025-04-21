export const generateStaticParams = () =>
  ['find', 'verify', 'reset', 'complete'].map((step) => ({ step }));

import StepPageClient from './StepPageClient';

export default function Page() {
  return <StepPageClient />;
}
