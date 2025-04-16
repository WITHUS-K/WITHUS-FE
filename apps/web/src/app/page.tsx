import { redirect } from 'next/navigation';

export default function Home() {
  // 사이트 첫 진입 시 /join으로 보냄
  redirect('/join');
  return null;
}
