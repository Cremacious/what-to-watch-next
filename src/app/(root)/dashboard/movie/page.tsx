import { getMovie } from '@/lib/actions/movie.actions';
;

interface MoviePageProps {
  searchParams: { title?: string };
}

const MoviePage = async ({ searchParams }: MoviePageProps) => {
  const { title } = searchParams;

  if (!title) {
    return (
      <div>
        <h1>No movie title provided</h1>
        <a href="/dashboard">← Back to search</a>
      </div>
    );
  }

  // Server-side API call
  const movie = await getMovie(title);

  if (!movie) {
    return (
      <div>
        <h1>Movie &quot;{title}&quot; not found</h1>
        <a href="/dashboard">← Back to search</a>
      </div>
    );
  }

  return (
    <div>
      <h1>{movie.Title}</h1>
      <p>
        <strong>Year:</strong> {movie.Year}
      </p>
      <p>
        <strong>Director:</strong> {movie.Director}
      </p>
    </div>
  );
};

export default MoviePage;
