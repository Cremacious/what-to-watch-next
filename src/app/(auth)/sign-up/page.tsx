import { SignUpForm } from './sign-up-form';


export default function SignUpPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center ">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <SignUpForm />
      </div>
    </div>
  );
}
