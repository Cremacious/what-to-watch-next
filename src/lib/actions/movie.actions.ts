'use server';
import { OMDBResponse, OMDBMovie } from '@/lib/types';

export async function getMovie(title: string): Promise<OMDBMovie | null> {
  const response = await fetch(`http://www.omdbapi.com/?t=${title}&apikey=${process.env.OMDB_API_KEY}`);
  const data: OMDBResponse = await response.json();
  
  if (data.Response === "False") {
    return null;
  }
  
  return data as OMDBMovie; 
}