import Navbar from '@/components/navbar';
import { getAuthenticatedUser } from '@/lib/auth-server';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await getAuthenticatedUser();

  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
