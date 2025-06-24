import { cookies } from 'next/headers';
import ProfilePage from './ProfilePage';

export default async function Page() {
  const cookieStore = await cookies();
  const role = (cookieStore.get('role')?.value as 'ADMIN' | 'USER') ?? 'USER';
  return (
    <ProfilePage role={role} />
  );
}