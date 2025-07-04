'use client';
import Link from 'next/link';
import { useSession, signOut } from '@/lib/auth-client';
import { Button } from './ui/button';
import { Film } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-gray-900/80 border-b border-gray-700/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/dashboard" className="group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Film className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent group-hover:from-blue-300 group-hover:via-purple-400 group-hover:to-pink-400 transition-all duration-300">
                Mack Movies
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                {/* Navigation Menu */}
                <div className="hidden md:flex items-center space-x-6">
                  <Link
                    href="/dashboard"
                    className="text-gray-300 hover:text-white font-medium transition-colors duration-200 relative group"
                  >
                    Dashboard
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-200"></span>
                  </Link>
                  <Link
                    href="/lists"
                    className="text-gray-300 hover:text-white font-medium transition-colors duration-200 relative group"
                  >
                    Lists
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-200"></span>
                  </Link>
                  <Link
                    href={`/profile/${user.id}`}
                    className="text-gray-300 hover:text-white font-medium transition-colors duration-200 relative group"
                  >
                    Profile
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 group-hover:w-full transition-all duration-200"></span>
                  </Link>
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-4">
                  {/* User Avatar/Name */}
                  <div className="hidden sm:flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <span className="text-gray-300 text-sm font-medium">
                      {user.name || 'User'}
                    </span>
                  </div>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    className="bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-red-300 transition-all duration-200"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign Out
                  </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </Button>
                </div>
              </>
            ) : (
              // User is not logged in - show sign in/up links
              <div className="flex items-center space-x-4">
                <Link
                  href="/sign-in"
                  className="text-gray-300 hover:text-white font-medium transition-colors duration-200"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu (hidden by default - you can add state to toggle this) */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-700/50 hidden">
          <div className="flex flex-col space-y-3">
            <Link
              href="/dashboard"
              className="text-gray-300 hover:text-white font-medium transition-colors duration-200 py-2"
            >
              Dashboard
            </Link>
            <Link
              href="/lists"
              className="text-gray-300 hover:text-white font-medium transition-colors duration-200 py-2"
            >
              Lists
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
