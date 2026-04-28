import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ROUTES } from '@web/routes';

export default async function RootPage() {
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;

  if (role === 'ADMIN') {
    redirect(ROUTES.DASHBOARD.ADMIN);
  } else {
    redirect(ROUTES.DASHBOARD.USER);
  }
}
