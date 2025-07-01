'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { movieSearchSchema } from '@/lib/validators/movie.validator';
import Spinner from './Spinner';
import { useRouter } from 'next/navigation';

const MovieSearchForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof movieSearchSchema>>({
    resolver: zodResolver(movieSearchSchema),
    mode: 'onChange',
    defaultValues: {
      movieTitle: '',
    },
  });

  function onSubmit(query: z.infer<typeof movieSearchSchema>) {
    router.push(
      `/dashboard/movie?title=${encodeURIComponent(query.movieTitle)}`
    );
  }
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-3xl mx-auto py-10"
      >
        <FormField
          control={form.control}
          name="movieTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jaws"
                  type="text"
                  {...field}
                  value={field.value || ''}
                />
              </FormControl>
              <FormDescription>Search for a movie by title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : 'Search Movie'}
        </Button>
      </form>
    </Form>
  );
};

export default MovieSearchForm;
