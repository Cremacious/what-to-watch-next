import { getAuthenticatedUser } from '@/lib/auth-server';
import { getUserMovieLists } from '@/lib/actions/movie.actions';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Film, List, Users, Edit, Share2, Heart } from 'lucide-react';

interface UserProfilePageProps {
  params: Promise<{ userId: string }>;
}

export default async function UserProfilePage({
  params,
}: UserProfilePageProps) {
  const { userId } = await params;
  const currentUser = await getAuthenticatedUser();

  if (!currentUser) {
    return <div>Please log in to view profiles.</div>;
  }

  // Check if viewing own profile
  const isOwnProfile = currentUser.id === userId;

  // In a real app, you'd fetch the user data by userId
  // For now, we'll use the current user if it's their own profile
  const user = isOwnProfile ? currentUser : null;

  if (!user) {
    notFound();
  }

  const movieListsResult = await getUserMovieLists(user.id);
  const movieLists =
    movieListsResult.success && movieListsResult.lists
      ? movieListsResult.lists
      : [];

  // Calculate stats
  const totalMovies = (movieLists ?? []).reduce(
    (total, list) => total + (list._count?.movieItems || 0),
    0
  );
  const favoriteGenres = ['Action', 'Drama', 'Comedy', 'Thriller'];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg">
                  {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="mb-4">
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                    {user.name || 'Movie Enthusiast'}
                  </h1>
                  <p className="text-gray-400 text-lg">
                    Passionate about great storytelling and cinematic
                    experiences
                  </p>
                </div>

                {/* User Details */}
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-300">
                    <Mail className="w-4 h-4 text-blue-400" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start space-x-2 text-gray-300">
                    <Calendar className="w-4 h-4 text-purple-400" />
                    <span className="text-sm">
                      Joined{' '}
                      {joinDate.toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div> */}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  {isOwnProfile && (
                    <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Profile
                  </Button>
                  {!isOwnProfile && (
                    <Button
                      variant="outline"
                      className="bg-transparent border-green-600 text-green-400 hover:bg-green-500/10 hover:text-green-300"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Add Friend
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Total Lists */}
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium uppercase tracking-wide">
                  Movie Lists
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {movieLists?.length ?? 0}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <List className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>

          {/* Total Movies */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium uppercase tracking-wide">
                  Total Movies
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {totalMovies}
                </p>
              </div>
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Film className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>

          {/* Favorite Genre */}
          <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 backdrop-blur-sm border border-pink-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-pink-400 text-sm font-medium uppercase tracking-wide">
                  Top Genre
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {favoriteGenres[0]}
                </p>
              </div>
              <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-400" />
              </div>
            </div>
          </div>

          {/* Friends */}
          <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 backdrop-blur-sm border border-green-500/20 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium uppercase tracking-wide">
                  Friends
                </p>
                <p className="text-2xl font-bold text-white mt-1">
                  {Math.floor(Math.random() * 50) + 10}
                </p>
              </div>
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Movie Lists */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-white">Movie Lists</h2>
                </div>
                <Link
                  href="/lists"
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                >
                  View All
                </Link>
              </div>

              {movieLists.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {movieLists.map((list) => (
                    <div
                      key={list.id}
                      className="group p-6 rounded-xl bg-gradient-to-br from-gray-700/30 to-gray-800/30 border border-gray-600/30 hover:border-purple-500/30 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <List className="w-5 h-5 text-white" />
                        </div>
                        <Badge className="bg-gray-600/50 text-gray-300 border-gray-500/50">
                          {list._count?.movieItems || 0} movies
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors mb-2">
                        {list.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {list.description || 'No description available'}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Updated recently
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-purple-400 hover:text-purple-300"
                        >
                          View List
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Film className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-400 text-lg mb-4">
                    No movie lists yet
                  </p>
                  <p className="text-gray-500 text-sm">
                    {isOwnProfile
                      ? 'Start creating your first movie list!'
                      : "This user hasn't created any lists yet."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Favorite Genres */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-white">
                  Favorite Genres
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {favoriteGenres.map((genre) => (
                  <Badge
                    key={genre}
                    className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full"></div>
                <h3 className="text-lg font-semibold text-white">
                  Recent Activity
                </h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-300">Created action movie</span>
                  <span className="text-gray-500">2h ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-300">
                    Added inception to Watchlist
                  </span>
                  <span className="text-gray-500">1d ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">date night movies</span>
                  <span className="text-gray-500">3d ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
