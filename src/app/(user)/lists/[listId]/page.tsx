import { getListById } from '@/lib/actions/movie.actions';
import { getAuthenticatedUser } from '@/lib/auth-server';
import Link from 'next/link';

const ListPage = async (props: { params: Promise<{ listId: string }> }) => {
  const user = await getAuthenticatedUser();
  if (!user) {
    return <div>Please log in to view this list.</div>;
  }

  const params = await props.params;

  const listResult = await getListById(params.listId, user.id);
  if (!listResult.success) {
    return <div>Error fetching list: {listResult.error}</div>;
  }

  if (!listResult.list) {
    return <div>List not found.</div>;
  }

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{listResult.list.name}</h2>
      <p className="text-gray-600">{listResult.list.description}</p>
      {listResult.list.movieItems.length > 0 ? (
        <ul className="mt-6 space-y-4">
          {listResult.list.movieItems.map((item) => (
            <Link key={item.id} href={`/movies/${item.movieId}`}>
              <li className="p-4 bg-gray-100 rounded-lg shadow-sm">
                <h3 className="text-xl text-black font-semibold">
                  Movie ID: {item.movieId}
                </h3>
                {item.notes && <p className="text-gray-500">{item.notes}</p>}
                <p className="text-sm text-black">{item.movie.title}</p>
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No movies found in this list.</p>
      )}
    </div>
  );
};

export default ListPage;
