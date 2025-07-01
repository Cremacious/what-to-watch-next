'use client';

import { signOut } from '@/lib/auth-client';

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
    >
      Sign Out
    </button>
  );
}
