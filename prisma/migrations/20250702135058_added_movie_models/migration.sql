-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL,
    "imdbId" TEXT,
    "title" TEXT NOT NULL,
    "year" TEXT,
    "genre" TEXT,
    "director" TEXT,
    "actors" TEXT,
    "plot" TEXT,
    "poster" TEXT,
    "imdbRating" TEXT,
    "runtime" TEXT,
    "released" TEXT,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_list_item" (
    "id" TEXT NOT NULL,
    "movieListId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "addedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,

    CONSTRAINT "movie_list_item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie_list" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "movie_list_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "movie_imdbId_key" ON "movie"("imdbId");

-- CreateIndex
CREATE UNIQUE INDEX "movie_list_item_movieListId_movieId_key" ON "movie_list_item"("movieListId", "movieId");

-- AddForeignKey
ALTER TABLE "movie_list_item" ADD CONSTRAINT "movie_list_item_movieListId_fkey" FOREIGN KEY ("movieListId") REFERENCES "movie_list"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_list_item" ADD CONSTRAINT "movie_list_item_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "movie_list" ADD CONSTRAINT "movie_list_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
