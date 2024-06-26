-- DropIndex
DROP INDEX "users_favorite_books_bookId_userId_key";

-- AlterTable
ALTER TABLE "users_favorite_books" ADD CONSTRAINT "users_favorite_books_pkey" PRIMARY KEY ("bookId", "userId");

-- AddForeignKey
ALTER TABLE "users_favorite_books" ADD CONSTRAINT "users_favorite_books_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_favorite_books" ADD CONSTRAINT "users_favorite_books_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
