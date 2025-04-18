import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/password/find');
  return null;
}
