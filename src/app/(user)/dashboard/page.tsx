import { getAuthenticatedUser } from '@/lib/auth-server';
import { getUserMovieLists } from '@/lib/actions/movie.actions';
import MovieSearchForm from '@/components/MovieSearchForm';
import Link from 'next/link';

const DashboardPage = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }

  const movieListsResult = await getUserMovieLists(user.id);
  const movieLists = movieListsResult.success ? movieListsResult.lists : [];

  return (
    <div className="min-h-svh bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-6 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
            Welcome back, {user.name || 'User'}!
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover amazing movies, create personalized lists, and keep track
            of your cinematic journey
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 justify-items-center">
          {/* Total Lists */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium uppercase tracking-wide">
                  Your Lists
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {movieLists?.length || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Movies */}
          <div className="w-full md:w-1/2 bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium uppercase tracking-wide">
                  Total Movies
                </p>
                <p className="text-3xl font-bold text-white mt-1">
                  {movieLists?.reduce(
                    (total, list) => total + (list._count?.movieItems || 0),
                    0
                  ) || 0}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4zM3 8v10a2 2 0 002 2h14a2 2 0 002-2V8H3z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Search Section */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-white">Search Movies</h2>
              </div>
              <p className="text-gray-400 mb-8">
                Find any movie and add it to your collections
              </p>
              <MovieSearchForm />
            </div>
          </div>

          {/* Recent Lists Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">Your Lists</h2>
                </div>
                <Link
                  href="/lists"
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                >
                  View All
                </Link>
              </div>

              {movieLists && movieLists.length > 0 ? (
                <div className="space-y-4">
                  {movieLists.slice(0, 4).map((list) => (
                    <div
                      key={list.id}
                      className="group p-4 rounded-xl bg-gradient-to-r from-gray-700/30 to-gray-800/30 border border-gray-600/30 hover:border-purple-500/30 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                            {list.name}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {list._count?.movieItems || 0} movies
                          </p>
                        </div>
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-purple-400 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">No lists yet</p>
                  <Link
                    href="/lists"
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                  >
                    Create First List
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
