'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  getUserMovieLists,
  addMovieToList,
  createListAndAddMovie,
} from '@/lib/actions/movie.actions';
import { OMDBMovie } from '@/lib/types';

interface MovieList {
  id: string;
  name: string;
  description: string | null;
  _count: {
    movieItems: number;
  };
}

interface AddMovieToListDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  movieData: OMDBMovie;
  userId: string;
}

export function AddMovieToListDialog({
  open,
  onOpenChange,
  movieData,
  userId,
}: AddMovieToListDialogProps) {
  const [movieLists, setMovieLists] = useState<MovieList[]>([]);
  const [selectedListId, setSelectedListId] = useState<string>('');
  const [newListName, setNewListName] = useState('');
  const [newListDescription, setNewListDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('existing');

  useEffect(() => {
    const fetchMovieLists = async () => {
      const result = await getUserMovieLists(userId);
      if (result.success) {
        setMovieLists(result.lists ?? []);
        if (result.lists && result.lists.length > 0) {
          setSelectedListId(result.lists[0].id);
        }
      } else {
        toast.error('Failed to load movie lists');
      }
    };

    if (open && userId) {
      fetchMovieLists();
    }
  }, [open, userId]);

  const handleAddToExistingList = async () => {
    if (!selectedListId) {
      toast.error('Please select a list');
      return;
    }

    setIsLoading(true);
    const result = await addMovieToList(selectedListId, movieData.imdbID);

    if (result.success) {
      toast.success('Movie added to list!');
      onOpenChange(false);
      resetForm();
    } else {
      toast.error(result.error);
    }
    setIsLoading(false);
  };

  const handleCreateNewList = async () => {
    if (!newListName.trim()) {
      toast.error('Please enter a list name');
      return;
    }

    setIsLoading(true);
    const result = await createListAndAddMovie(
      newListName.trim(),
      movieData.imdbID,
      newListDescription.trim() || undefined
    );

    if (result.success) {
      toast.success(result.message);
      onOpenChange(false);
      resetForm();
    } else {
      toast.error(result.error);
    }
    setIsLoading(false);
  };

  const resetForm = () => {
    setSelectedListId('');
    setNewListName('');
    setNewListDescription('');
    setActiveTab('existing');
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Movie to List</DialogTitle>
          <DialogDescription>
            Add &quot;{movieData?.Title}&quot; to one of your lists or create a
            new one.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="existing">Existing List</TabsTrigger>
            <TabsTrigger value="new">New List</TabsTrigger>
          </TabsList>

          <TabsContent value="existing" className="space-y-4">
            {movieLists.length > 0 ? (
              <div className="space-y-2">
                <Label htmlFor="list-select">Select a list</Label>
                <Select
                  value={selectedListId}
                  onValueChange={setSelectedListId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a list..." />
                  </SelectTrigger>
                  <SelectContent>
                    {movieLists.map((list) => (
                      <SelectItem key={list.id} value={list.id}>
                        {list.name} ({list._count.movieItems} movies)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="text-center py-4 text-muted-foreground">
                <p>You don&#39;t have any movie lists yet.</p>
                <p>
                  Create your first list using the &quot;New List&quot; tab.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-list-name">List Name</Label>
              <Input
                id="new-list-name"
                placeholder="Enter list name..."
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-list-description">
                Description (optional)
              </Label>
              <Input
                id="new-list-description"
                placeholder="Enter description..."
                value={newListDescription}
                onChange={(e) => setNewListDescription(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            Cancel
          </Button>
          {activeTab === 'existing' ? (
            <Button
              onClick={handleAddToExistingList}
              disabled={isLoading || !selectedListId || movieLists.length === 0}
            >
              {isLoading ? 'Adding...' : 'Add to List'}
            </Button>
          ) : (
            <Button
              onClick={handleCreateNewList}
              disabled={isLoading || !newListName.trim()}
            >
              {isLoading ? 'Creating...' : 'Create & Add'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
