import { getServerSideTokens } from '@web/api/serverSideTokens';
import { ServerFetchBoundary } from '@web/store/query/ServerFetchBoundary';
import { getRecruitmentDetailQueryOptions } from '@web/store/query/useRecruitmentDetailQuery';
import EditSettingClient from './EditSettingClient';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;
  const recruitmentId = Number(id);
  if (!recruitmentId) {
    return notFound();
  }
  const tokens = await getServerSideTokens();

  const options = getRecruitmentDetailQueryOptions({ recruitmentId, tokens });

  return (
    <ServerFetchBoundary fetchOptions={options}>
      <EditSettingClient recruitmentId={recruitmentId} />
    </ServerFetchBoundary>
  );
}
