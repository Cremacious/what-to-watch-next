import { SignInForm } from './signin-form';

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center ">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignInForm />
      </div>
    </div>
  );
}
