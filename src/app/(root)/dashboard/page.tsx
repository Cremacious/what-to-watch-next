// import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import { getAuthenticatedUser } from '@/lib/auth-server';
import MovieSearchForm from '@/components/MovieSearchForm';

export default async function DashboardPage() {
  // const user = await getAuthenticatedUser();

  return (
    <div className="flex flex-col min-h-svh items-center justify-center">
      <div className="max-w-md w-full flex flex-col">
        <Card className="bg-blue-700 text-white mx-2">
          <CardHeader className="text-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <MovieSearchForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
