import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function RootPage() {
  const role = (await cookies()).get('role')?.value;

  if (role === 'ADMIN') {
    redirect('/dashboard/admin');
  } else {
    redirect('/dashboard/user');
  }
}
