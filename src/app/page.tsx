import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Search,
  List,
  Share2,
  Users,
  Star,
  ArrowRight,
  Play,
  Plus,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="container mx-auto px-6 py-20 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-6 leading-tight">
              Mack Movies 
            </h1>

            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Create personalized movie lists, discover new films, and share
              your favorites with friends. Your ultimate movie companion for
              endless entertainment.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 px-8"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
              Everything You Need
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Powerful features to help you organize, discover, and share your
              movie preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1: Search Movies */}
            <div className="group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-gray-600/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-6">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Search Movies
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Find any movie instantly with our powerful search. Get
                    detailed information, ratings, and cast details.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 2: Custom Lists */}
            <div className="group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-red-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-gray-600/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-6">
                    <List className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Custom Lists
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Create unlimited personalized lists. Watchlist, favorites,
                    date night movies - organize however you like.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 3: Share Lists */}
            <div className="group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-gray-600/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mb-6">
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Share with Friends
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Share your curated lists with friends and family. Perfect
                    for movie nights and recommendations.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature 4: Friends Lists */}
            <div className="group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 via-red-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-gray-600/50 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-6">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Friends&#39; Lists
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    Discover new movies through your friends&#39;
                    recommendations and see what everyone is watching.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
                See It in Action
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                From searching for that perfect movie to creating themed lists
                and sharing with your circle - everything is designed to be
                intuitive and enjoyable.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <Search className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">
                    Search from millions of movies and TV shows
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Plus className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">
                    Add to custom lists with one click
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Share2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-gray-300">
                    Share lists and get recommendations
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8">
                <div className="space-y-6">
                  {/* Mock Search Bar */}
                  <div className="bg-gray-700/50 rounded-lg p-4 border border-gray-600/50">
                    <div className="flex items-center space-x-3">
                      <Search className="w-5 h-5 text-gray-400" />
                      <div className="flex-1 h-4 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded"></div>
                    </div>
                  </div>

                  {/* Mock Movie Cards */}
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center space-x-4 bg-gray-700/30 rounded-lg p-3"
                      >
                        <div className="w-12 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded"></div>
                        <div className="flex-1">
                          <div
                            className="h-4 bg-gray-600 rounded mb-2"
                            style={{ width: `${60 + i * 10}%` }}
                          ></div>
                          <div
                            className="h-3 bg-gray-700 rounded"
                            style={{ width: `${40 + i * 15}%` }}
                          ></div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-blue-500 to-purple-500"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-12">
                <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  Join thousands of movie lovers who have already organized
                  their perfect watchlists. It&#39;s free to get started!
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/sign-up">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8"
                    >
                      Create Your First List
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white transition-all duration-200 px-8"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      View Demo
                    </Button>
                  </Link>
                </div>

                <div className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>Free to use</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-400" />
                    <span>Share with friends</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <List className="w-4 h-4 text-purple-400" />
                    <span>Unlimited lists</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
