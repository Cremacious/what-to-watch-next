import { getAuthenticatedUser } from '@/lib/auth-server';
import Navbar from '@/components/navbar';

export default async function DashboardLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // This will redirect to /sign-in if not authenticated
  await getAuthenticatedUser();

  return (
    <>
      <Navbar />
      <main>
        {children}
      </main>
    </>
  );
}
