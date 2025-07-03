import { getUserMovieLists } from '@/lib/actions/movie.actions';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { Button } from '@/components/ui/button';
import { Film } from 'lucide-react';
import Link from 'next/link';

const ListsPage = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    return <div>Please log in to view your movie lists.</div>;
  }
  const movieLists = await getUserMovieLists(user.id);
  if (!movieLists.success) {
    return <div>Error fetching movie lists: {movieLists.error}</div>;
  }
  return (
    <div className="min-h-svh flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 via-blue-500 to-blue-700 bg-clip-text text-transparent mb-4">
            Your Movie Lists
          </h1>
        </div>

        {movieLists.lists && movieLists.lists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movieLists.lists.map((list) => (
              <div
                key={list.id}
                className="group relative bg-gradient-to-br from-blue-800/50 to-gray-blue/50 backdrop-blur-sm rounded-2xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <Link href={`/lists/${list.id}`} className="block h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-blue-300 transition-colors">
                        {list.name}
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Film className="w-4 h-4 text-white" />
                      <span className="text-gray-300 text-sm">
                        {list._count.movieItems}{' '}
                        {list._count.movieItems === 1 ? 'movie' : 'movies'}
                      </span>
                    </div>

                    <Button className="opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:from-blue-600 hover:to-white-700">
                      View List
                    </Button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mb-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-300 mb-3">
              No movie lists yet
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Start organizing your favorite movies by creating your first list.
              You can categorize by genre, mood, or any way you like!
            </p>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 hover:shadow-lg">
              Create Your First List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListsPage;
