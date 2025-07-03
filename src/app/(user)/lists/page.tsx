import { getUserMovieLists } from '@/lib/actions/movie.actions';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import {
  Film,
  Plus,
  List,
  Star,
  Eye,
  Edit,
  Trash2,
  Clock,
  Search,
} from 'lucide-react';

const ListsPage = async () => {
  const user = await getAuthenticatedUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <List className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Please Log In
          </h1>
          <p className="text-gray-400 mb-6">
            You need to be logged in to view your movie lists.
          </p>
          <Link href="/sign-in">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const movieListsResult = await getUserMovieLists(user.id);

  if (!movieListsResult.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Film className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Error Loading Lists
          </h1>
          <p className="text-gray-400 mb-6">
            There was an error fetching your movie lists:{' '}
            {movieListsResult.error}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  const movieLists = movieListsResult.lists || [];

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="relative mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl"></div>
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between space-y-6 lg:space-y-0">
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <List className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    My Movie Lists
                  </h1>
                </div>
                <p className="text-gray-400 text-lg">
                  Organize, discover, and share your favorite movies with custom
                  lists
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New List
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search Lists
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Lists Grid */}
        {movieLists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movieLists.map((list) => (
              <div key={list.id} className="group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                  <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all duration-300">
                    {/* List Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <List className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex items-center space-x-2">
                          {/* {list.isPublic && (
                            <Badge className="bg-green-500/20 border-green-500/30 text-green-300">
                              <Users className="w-3 h-3 mr-1" />
                              Public
                            </Badge>
                          )} */}
                          <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-300">
                            {list._count?.movieItems || 0} movies
                          </Badge>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                        {list.name}
                      </h3>

                      <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {list.description ||
                          'A curated collection of movies waiting to be discovered.'}
                      </p>

                      {/* List Stats */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>Updated recently</span>
                          </div>
                          {/* {list.isPublic && (
                            <div className="flex items-center space-x-1">
                              <Eye className="w-3 h-3" />
                              <span>{Math.floor(Math.random() * 50) + 10} views</span>
                            </div>
                          )} */}
                        </div>
                      </div>
                    </div>

                    {/* Movie Preview */}
                    <div className="px-6 pb-4">
                      <div className="grid grid-cols-4 gap-2">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center"
                          >
                            <Film className="w-4 h-4 text-gray-500" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="border-t border-gray-700/50 p-4 bg-gray-900/20">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                        </div>

                        <div className="flex items-center space-x-2">
                          {/* {list.isPublic && (
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          )} */}
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty State
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-2xl"></div>
            <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-16 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <List className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                No Movie Lists Yet
              </h2>
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                Start organizing your movie collection by creating your first
                custom list. Group movies by genre, mood, or any theme you like!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First List
                </Button>
                <Button
                  variant="outline"
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white"
                >
                  <Star className="w-4 h-4 mr-2" />
                  Browse Popular Lists
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListsPage;
