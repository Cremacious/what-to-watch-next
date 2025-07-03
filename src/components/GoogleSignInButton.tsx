import { signIn } from '@/lib/auth-client';
import Spinner from './Spinner';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useState } from 'react';

const GoogleSignInButton = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      const result = await signIn.social({
        provider: 'google',
        callbackURL: '/dashboard',
      });

      if (result.error) {
        console.log(result.error);
        toast.error(result.error.message);
      }
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error('Google sign in failed. Please try again.');
    } finally {
      setIsGoogleLoading(false);
    }
  };
  return (
    <div className="">
      <Button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isGoogleLoading}
        variant="outline"
        className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:border-gray-500 transition-all duration-200"
      >
        {isGoogleLoading ? (
          <Spinner />
        ) : (
          <>
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                fill="currentColor"
              />
            </svg>
            Continue with Google
          </>
        )}
      </Button>
    </div>
  );
};

export default GoogleSignInButton;
