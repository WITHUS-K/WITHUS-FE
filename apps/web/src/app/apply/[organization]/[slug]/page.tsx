// app/apply/[organization]/[slug]/page.tsx
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import {
  fetchRecruitmentBySlug,
  getRecruitmentBySlugQueryOptions,
} from '@web/store/query/useRecruitmentBySlugQuery';
import ApplicationClient from './ApplicationClient';
import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{
    organization: string;
    slug: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { slug, organization } = await params;

  const data = await fetchRecruitmentBySlug(slug);

  // 큐시즘 지원서 맞춰서 일단 주석처리
  /* const raw = data.documentDeadline?.replace(/\./g, '-');
  const deadlineEndMs = new Date(`${raw}T23:59:59.999+09:00`).getTime();

  if (Date.now() >= deadlineEndMs) {
    redirect(`/apply/${organization}/${slug}/end`);
  }*/

  const fetchOptions = getRecruitmentBySlugQueryOptions({ slug });

  return (
    <ServerFetchBoundary fetchOptions={fetchOptions}>
      <ApplicationClient slug={slug} />
    </ServerFetchBoundary>
  );
}
