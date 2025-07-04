'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddMovieToListDialog } from './AddMovieDialog';
import { OMDBMovie } from '@/lib/types';

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
}

interface AddFilmButtonProps {
  movieData: OMDBMovie;
  user: User;
}

const AddFilmButton = ({ movieData, user }: AddFilmButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add to List
      </Button>

      <AddMovieToListDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        movieData={movieData}
        userId={user.id}
      />
    </>
  );
};

export default AddFilmButton;
