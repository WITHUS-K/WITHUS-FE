import InviteModal from '../@modal/(.)invite/page';
import TimetableClient from '../TimeTableClient';

export default async function Page({
  params,
}: {
  params: Promise<{
    tab: string;
    date: string;
    modal?: string[];
  }>;
}) {
  const { modal } = await params;
  const showInvite = modal?.[0] === 'invite';

  return (
    <>
      <TimetableClient showInvite={showInvite} />
    </>
  );
}
