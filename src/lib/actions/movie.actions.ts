'use server';
import { OMDBResponse, OMDBMovie } from '@/lib/types';
import prisma from '../prisma';
import { getAuthenticatedUser } from '@/lib/auth-server';
import { revalidatePath } from 'next/cache';

export async function getMovie(title: string): Promise<OMDBMovie | null> {
  const response = await fetch(
    `http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`
  );
  const data: OMDBResponse = await response.json();

  if (data.Response === 'False') {
    return null;
  }

  return data as OMDBMovie;
}

export async function getUserMovieLists(userId: string) {
  try {
    const lists = await prisma.movieList.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            movieItems: true,
          },
        },
      },
    });
    return { success: true, lists };
  } catch (error) {
    console.error('Error fetching user movie lists:', error);
    return { success: false, error: 'Failed to fetch movie lists' };
  }
}

export async function createMovieList(name: string, description?: string) {
  try {
    const session = await getAuthenticatedUser();
    if (!session) {
      return { success: false, error: 'User not authenticated' };
    }
    const newList = await prisma.movieList.create({
      data: {
        name,
        description,
        userId: session.id,
      },
    });
    revalidatePath('/lists');
    return { success: true, list: newList };
  } catch (error) {
    console.error('Error getting authenticated user:', error);
    return { success: false, error: 'User not authenticated' };
  }
}

export async function addMovieToList(listId: string, movieData: OMDBMovie) {
  try {
    const session = await getAuthenticatedUser();
    if (!session) {
      return { success: false, error: 'User not authenticated' };
    }

    // Verify the list exists and belongs to the user
    const movieList = await prisma.movieList.findFirst({
      where: {
        id: listId,
        userId: session.id, // Ensure user owns the list
      },
    });

    if (!movieList) {
      return { success: false, error: 'Movie list not found or access denied' };
    }

    // Use a transaction to ensure data consistency
    await prisma.$transaction(async (tx) => {
      // First, upsert the movie
      const movie = await tx.movie.upsert({
        where: { imdbId: movieData.imdbID },
        update: {
          // Update movie data in case it changed
          title: movieData.Title,
          year: movieData.Year,
          genre: movieData.Genre,
          director: movieData.Director,
          actors: movieData.Actors,
          plot: movieData.Plot,
          poster: movieData.Poster,
          imdbRating: movieData.imdbRating,
          runtime: movieData.Runtime,
          released: movieData.Released,
          type: movieData.Type,
        },
        create: {
          imdbId: movieData.imdbID,
          title: movieData.Title,
          year: movieData.Year,
          genre: movieData.Genre,
          director: movieData.Director,
          actors: movieData.Actors,
          plot: movieData.Plot,
          poster: movieData.Poster,
          imdbRating: movieData.imdbRating,
          runtime: movieData.Runtime,
          released: movieData.Released,
          type: movieData.Type,
        },
      });

      // Check if movie is already in the list
      const existingItem = await tx.movieListItem.findUnique({
        where: {
          movieListId_movieId: {
            movieListId: listId,
            movieId: movie.id,
          },
        },
      });

      if (existingItem) {
        throw new Error('Movie is already in this list');
      }

      // Add movie to list
      await tx.movieListItem.create({
        data: {
          movieListId: listId,
          movieId: movie.id,
        },
      });

      return movie;
    });

    revalidatePath('/dashboard');
    revalidatePath('/movie');
    return { success: true, message: 'Movie added to list successfully' };
  } catch (error) {
    console.error('Error adding movie to list:', error);
    return { success: false, error: 'Failed to add movie to list' };
  }
}

export async function createListAndAddMovie(
  listName: string,
  movieData: OMDBMovie,
  description?: string
) {
  try {
    const session = await getAuthenticatedUser();
    if (!session) {
      return { success: false, error: 'Not authenticated' };
    }

    const listResult = await createMovieList(listName, description);
    if (!listResult.success || !listResult.list) {
      return { success: false, error: 'Failed to create list' };
    }

    const addResult = await addMovieToList(listResult.list.id, movieData);
    if (!addResult.success) {
      return { success: false, error: addResult.error };
    }

    return { success: true, message: `Movie added to new list "${listName}"` };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Failed to create list and add movie' };
  }
}
