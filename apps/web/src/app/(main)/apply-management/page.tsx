import { redirect } from 'next/navigation';

export default function ClubIndexPage() {
  // 첫 탭으로 바로 리다이렉트
  redirect(`/apply-management/documents?clubId=0`);
}
