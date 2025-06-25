import AuthLayout from './AuthLayout';
import { cookies } from 'next/headers';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();

  const name = cookieStore.get('name')?.value ?? '';
  const role = cookieStore.get('role')?.value ?? '';
  const profileUrl = cookieStore.get('profileUrl')?.value ?? '';
  const position = cookieStore.get('position')?.value ?? '';
  const part = cookieStore.get('part')?.value ?? '';

  return (
    <AuthLayout
      username={name}
      role={role}
      profileUrl={profileUrl}
      position={position}
      part={part}
    >
      {children}
    </AuthLayout>
  );
}
