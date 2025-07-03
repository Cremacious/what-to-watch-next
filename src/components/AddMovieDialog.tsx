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
import { Film, List, Plus, Calendar, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';

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
    const result = await addMovieToList(selectedListId, movieData);

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
      movieData,
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
      <DialogContent className="sm:max-w-[600px] p-0 border-none shadow-none">
        <div className="relative">
          {/* Background Gradient Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-2xl"></div>

          {/* Main Dialog Content */}
          <div className="relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden">
            {/* Header */}
            <DialogHeader className="p-6 pb-4 border-b border-gray-700/50">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Film className="w-6 h-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    Add Movie to List
                  </DialogTitle>
                  <DialogDescription className="text-gray-400 mt-1">
                    Add &quot;{movieData?.Title}&quot; to one of your lists or
                    create a new one.
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>

            {/* Movie Preview */}
            <div className="p-6 pb-4 border-b border-gray-700/50">
              <div className="flex items-center space-x-4 bg-gray-700/30 rounded-xl p-4">
                <div className="w-16 h-24 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center">
                  {movieData?.Poster && movieData.Poster !== 'N/A' ? (
                    <Image
                      width={100}
                      height={200}
                      src={movieData.Poster}
                      alt={movieData.Title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Film className="w-6 h-6 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-lg mb-1">
                    {movieData?.Title}
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    {movieData?.Year && (
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{movieData.Year}</span>
                      </div>
                    )}
                    {movieData?.imdbRating &&
                      movieData.imdbRating !== 'N/A' && (
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span>{movieData.imdbRating}</span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="p-6">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 bg-gray-700/30 border border-gray-600/50 rounded-lg p-1">
                  <TabsTrigger
                    value="existing"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white text-gray-300 transition-all duration-200"
                  >
                    <List className="w-4 h-4 mr-2" />
                    Existing List
                  </TabsTrigger>
                  <TabsTrigger
                    value="new"
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white text-gray-300 transition-all duration-200"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    New List
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="existing" className="space-y-4 mt-6">
                  {movieLists.length > 0 ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label
                          htmlFor="list-select"
                          className="text-gray-300 font-medium"
                        >
                          Select a list
                        </Label>
                        <Select
                          value={selectedListId}
                          onValueChange={setSelectedListId}
                        >
                          <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200">
                            <SelectValue placeholder="Choose a list..." />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-800 border-gray-700">
                            {movieLists.map((list) => (
                              <SelectItem
                                key={list.id}
                                value={list.id}
                                className="text-gray-300 focus:bg-gray-700 focus:text-white"
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span>{list.name}</span>
                                  <span className="text-gray-500 text-sm ml-2">
                                    ({list._count.movieItems} movies)
                                  </span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Selected List Preview */}
                      {selectedListId && (
                        <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                              <List className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">
                                {
                                  movieLists.find(
                                    (list) => list.id === selectedListId
                                  )?.name
                                }
                              </h4>
                              <p className="text-sm text-gray-400">
                                {
                                  movieLists.find(
                                    (list) => list.id === selectedListId
                                  )?._count.movieItems
                                }{' '}
                                movies
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-700/20 rounded-lg border border-gray-600/30">
                      <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                        <List className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-400 mb-2">
                        You don&apos;t have any movie lists yet.
                      </p>
                      <p className="text-gray-500 text-sm">
                        Create your first list using the &quot;New List&quot;
                        tab.
                      </p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="new" className="space-y-4 mt-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="new-list-name"
                        className="text-gray-300 font-medium"
                      >
                        List Name
                      </Label>
                      <Input
                        id="new-list-name"
                        placeholder="Enter list name..."
                        value={newListName}
                        onChange={(e) => setNewListName(e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="new-list-description"
                        className="text-gray-300 font-medium"
                      >
                        Description (optional)
                      </Label>
                      <Input
                        id="new-list-description"
                        placeholder="Enter description..."
                        value={newListDescription}
                        onChange={(e) => setNewListDescription(e.target.value)}
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-200"
                      />
                    </div>

                    {/* New List Preview */}
                    {newListName && (
                      <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <Plus className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">
                              {newListName}
                            </h4>
                            <p className="text-sm text-gray-400">
                              {newListDescription || 'New movie list'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Footer */}
            <DialogFooter className="p-6 pt-4 border-t border-gray-700/50">
              <div className="flex items-center justify-between w-full">
                <Button
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200"
                >
                  Cancel
                </Button>

                {activeTab === 'existing' ? (
                  <Button
                    onClick={handleAddToExistingList}
                    disabled={
                      isLoading || !selectedListId || movieLists.length === 0
                    }
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Adding...
                      </>
                    ) : (
                      <>
                        Add to List
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleCreateNewList}
                    disabled={isLoading || !newListName.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Creating...
                      </>
                    ) : (
                      <>
                        Create & Add
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
