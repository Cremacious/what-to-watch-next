import { z } from 'zod';

export const movieSearchSchema = z.object({
  movieTitle: z.string().min(1, 'Movie title is required'),
});
