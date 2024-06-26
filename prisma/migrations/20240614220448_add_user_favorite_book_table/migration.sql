-- CreateTable
CREATE TABLE "users_favorite_books" (
    "bookId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_favorite_books_bookId_userId_key" ON "users_favorite_books"("bookId", "userId");
