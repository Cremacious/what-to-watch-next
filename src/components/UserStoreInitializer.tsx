'use client';

import { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';

interface UserStoreInitializerProps {
  user: {
    id: string;
    email: string;
    name?: string;
    image?: string;
  } | null;
}

export default function UserStoreInitializer({
  user,
}: UserStoreInitializerProps) {
  const { setUser } = useUserStore();

  useEffect(() => {
    if (user) {
      setUser({
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      });
    }
  }, [user, setUser]);

  return null;
}
