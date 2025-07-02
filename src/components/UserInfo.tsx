import { SignOutButton } from './SignOutButton';

type User = {
  id: string;
  name: string;
  email: string;
  username?: string | null;
  image?: string | null;
};

export function UserInfo({ user }: { user: User }) {
  return (
    <div className="space-y-4 text-center">
      <div className="space-y-2">
        <p className="text-lg">Welcome, {user.name}!</p>
        <p className="text-sm opacity-75">Email: {user.email}</p>
        {user.username && <p className="text-sm">Username: {user.username}</p>}
      </div>
      
      <SignOutButton />
    </div>
  );
}
