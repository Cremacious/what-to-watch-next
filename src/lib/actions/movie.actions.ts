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

export async function addMovieToList(listId: string, movieId: string) {
  try {
    const session = await getAuthenticatedUser();
    if (!session) {
      return { success: false, error: 'User not authenticated' };
    }

    const existingItem = await prisma.movieListItem.findFirst({
      where: {
        movieId,
        movieListId: listId,
      },
    });

    if (existingItem) {
      return { success: false, error: 'Movie already exists in the list' };
    }

    const newItem = await prisma.movieListItem.create({
      data: {
        movieId,
        movieListId: listId,
      },
    });

    revalidatePath(`/lists/${listId}`);
    return { success: true, item: newItem };
  } catch (error) {
    console.error('Error adding movie to list:', error);
    return { success: false, error: 'Failed to add movie to list' };
  }
}
export async function createListAndAddMovie(
  listName: string,
  movieData: string,
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

    const addResult = await addMovieToList(movieData, listResult.list.id);
    if (!addResult.success) {
      return { success: false, error: addResult.error };
    }

    return { success: true, message: `Movie added to new list "${listName}"` };
  } catch (error) {
    console.log(error);
    return { success: false, error: 'Failed to create list and add movie' };
  }
}

