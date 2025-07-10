// app/apply/[organization]/[slug]/page.tsx
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getRecruitmentBySlugQueryOptions } from '@web/store/query/useRecruitmentBySlugQuery';
import ApplicationClient from './ApplicationClient';

interface PageProps {
  params: Promise<{
    organization: string;
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug, organization } = await params; // ⬅️ await here
  const fetchOptions = getRecruitmentBySlugQueryOptions({ slug });

  return (
    <ServerFetchBoundary fetchOptions={fetchOptions}>
      <ApplicationClient slug={slug} />
    </ServerFetchBoundary>
  );
}
