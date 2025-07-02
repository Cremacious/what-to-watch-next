'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddMovieToListDialog } from './AddMovieDialog';
import { useUserStore } from '@/stores/useUserStore';
import { OMDBMovie } from '@/lib/types';

interface AddFilmButtonProps {
  movieData: OMDBMovie;
}

const AddFilmButton = ({ movieData }: AddFilmButtonProps) => {
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const { user, isLoading } = useUserStore();

  if (isLoading || !user) {
    return null;
  }

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
