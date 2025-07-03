import { getMovie } from '@/lib/actions/movie.actions';
import AddFilmButton from '@/components/AddFilmButton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, Star, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default async function MoviePage(props: {
  searchParams: Promise<{ title?: string }>;
}) {
  const searchParams = await props.searchParams;
  const movieData = searchParams.title
    ? await getMovie(searchParams.title)
    : null;

  if (!movieData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Movie Not Found
          </h1>
          <p className="text-gray-400 mb-6">
            The movie you&#39;re looking for doesn&#39;t exist or couldn&#39;t
            be loaded.
          </p>
          <Link href="/dashboard">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>

        {/* Main Movie Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
                {movieData.Poster && movieData.Poster !== 'N/A' ? (
                  <Image
                    width={300}
                    src={movieData.Poster}
                    alt={movieData.Title}
                    className="w-full h-auto rounded-xl shadow-2xl"
                  />
                ) : (
                  <div className="w-full aspect-[2/3] bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <svg
                        className="w-16 h-16 text-gray-500 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1h4z"
                        />
                      </svg>
                      <p className="text-gray-500 text-sm">
                        No Poster Available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Year */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-2">
                {movieData.Title}
              </h1>
              {movieData.Year && (
                <div className="flex items-center text-gray-400 text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  {movieData.Year}
                </div>
              )}
            </div>

            {/* Movie Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {movieData.imdbRating && movieData.imdbRating !== 'N/A' && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    <span className="text-xl font-bold text-white">
                      {movieData.imdbRating}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">IMDb Rating</p>
                </div>
              )}

              {movieData.Runtime && movieData.Runtime !== 'N/A' && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-blue-400 mr-1" />
                    <span className="text-xl font-bold text-white">
                      {movieData.Runtime}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Runtime</p>
                </div>
              )}

              {movieData.Type && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center">
                  <div className="mb-2">
                    <span className="text-xl font-bold text-white capitalize">
                      {movieData.Type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Type</p>
                </div>
              )}

              {movieData.Released && movieData.Released !== 'N/A' && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4 text-center">
                  <div className="mb-2">
                    <span className="text-lg font-bold text-white">
                      {movieData.Released}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">Released</p>
                </div>
              )}
            </div>

            {/* Genres */}
            {movieData.Genre && movieData.Genre !== 'N/A' && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Genres
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movieData.Genre.split(', ').map((genre, index) => (
                    <Badge
                      key={index}
                      className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-200"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Plot */}
            {movieData.Plot && movieData.Plot !== 'N/A' && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-3">Plot</h3>
                <p className="text-gray-300 leading-relaxed">
                  {movieData.Plot}
                </p>
              </div>
            )}

            {/* Director and Actors */}
            <div className="grid md:grid-cols-2 gap-6">
              {movieData.Director && movieData.Director !== 'N/A' && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-blue-400" />
                    Director
                  </h3>
                  <p className="text-gray-300">{movieData.Director}</p>
                </div>
              )}

              {movieData.Actors && movieData.Actors !== 'N/A' && (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-purple-400" />
                    Starring
                  </h3>
                  <p className="text-gray-300">{movieData.Actors}</p>
                </div>
              )}
            </div>

            {/* Add to List Button */}
            <div className="pt-6 border-t border-gray-700/50">
              <AddFilmButton movieData={movieData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
