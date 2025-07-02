import { getMovie } from '@/lib/actions/movie.actions';

interface MoviePageProps {
  searchParams: { title?: string };
}

export default async function MoviePage({ searchParams }: MoviePageProps) {
  const { title } = searchParams;

  if (!title) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl text-white">No movie title provided</h1>
        <a href="/dashboard" className="text-blue-400 hover:underline">
          ← Back to search
        </a>
      </div>
    );
  }

  const movie = await getMovie(title);

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl text-white">
          Movie &ldquo;{title}&rdquo; not found
        </h1>
        <a href="/dashboard" className="text-blue-400 hover:underline">
          ← Back to search
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">{movie.Title}</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <div></div>
          <div className="space-y-4 text-white">
            <p>
              <strong>Year:</strong> {movie.Year}
            </p>
            <p>
              <strong>Director:</strong> {movie.Director}
            </p>
            <p>
              <strong>Actors:</strong> {movie.Actors}
            </p>
            <p>
              <strong>Plot:</strong> {movie.Plot}
            </p>
            <p>
              <strong>Rating:</strong> {movie.imdbRating}/10
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
