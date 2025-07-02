'use client';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import { Button } from './ui/button';

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-700">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white">Mack Movies</div>
        <div className="flex space-x-4">
          {user ? (
            <div className="flex items-center space-x-4 text-white">
              <Link href="/dashboard" className="text-white">
                Dashboard
              </Link>
              <Button
                onClick={() => signOut()}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            // User is not logged in - show sign in/up links
            <>
              <Link href="/sign-in" className="text-white">
                Sign In
              </Link>
              <Link href="/sign-up" className="text-white">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
