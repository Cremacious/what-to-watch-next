import { getAuthenticatedUser } from '@/lib/auth-server';
import Navbar from '@/components/navbar';
import UserStoreInitializer from '@/components/UserStoreInitializer';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  return (
    <>
      {/* Initialize user store with server data */}
      <UserStoreInitializer
        user={
          user
            ? {
                ...user,
                image: user.image ?? undefined,
              }
            : null
        }
      />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
