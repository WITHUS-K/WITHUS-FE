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

  // 마감 날짜 지나면 지원마감 페이지로 리다이렉트되게
  const raw = new Date(data.documentDeadline);
  raw.setHours(23, 59, 59, 999);
  if (Date.now() >= raw.getTime()) {
    redirect(`/apply/${organization}/${slug}/end`);
  }

  const fetchOptions = getRecruitmentBySlugQueryOptions({ slug });

  return (
    <ServerFetchBoundary fetchOptions={fetchOptions}>
      <ApplicationClient slug={slug} />
    </ServerFetchBoundary>
  );
}
