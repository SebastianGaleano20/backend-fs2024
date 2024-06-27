/*
  Warnings:

  - The primary key for the `users_favorite_books` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `bookId` on the `users_favorite_books` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `users_favorite_books` table. All the data in the column will be lost.
  - Added the required column `book_id` to the `users_favorite_books` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `users_favorite_books` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "users_favorite_books" DROP CONSTRAINT "users_favorite_books_bookId_fkey";

-- DropForeignKey
ALTER TABLE "users_favorite_books" DROP CONSTRAINT "users_favorite_books_userId_fkey";

-- AlterTable
ALTER TABLE "users_favorite_books" DROP CONSTRAINT "users_favorite_books_pkey",
DROP COLUMN "bookId",
DROP COLUMN "userId",
ADD COLUMN     "book_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "users_favorite_books_pkey" PRIMARY KEY ("book_id", "user_id");

-- AddForeignKey
ALTER TABLE "users_favorite_books" ADD CONSTRAINT "users_favorite_books_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users_favorite_books" ADD CONSTRAINT "users_favorite_books_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
