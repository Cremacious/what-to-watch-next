import { getMovie } from '@/lib/actions/movie.actions';
import AddFilmButton from '@/components/AddFilmButton';

export default async function MoviePage({
  searchParams,
}: {
  searchParams: { title?: string };
}) {
  const movieData = searchParams.title
    ? await getMovie(searchParams.title)
    : null;

  if (!movieData) {
    return <div>Movie not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {/* Movie details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          {/* <img
            src={movieData.Poster}
            alt={movieData.Title}
            className="w-full max-w-md rounded-lg shadow-md"
          /> */}
        </div>
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{movieData.Title}</h1>
          <p className="text-lg text-muted-foreground">{movieData.Year}</p>
          <p>{movieData.Plot}</p>

          {/* Add to List Button */}
          <AddFilmButton movieData={movieData} />
        </div>
      </div>
    </div>
  );
}
