import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <div className="flex-col flex items-center justify-center min-h-screen">
      <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Not Found</h1>
        <p className="text-destructive">
          The page you are looking for does not exist.
        </p>
        <Button asChild variant="outline" className="mt-4 ml-2">
          <Link href="/">Back To Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
