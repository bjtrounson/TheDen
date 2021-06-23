/*
  Warnings:

  - You are about to drop the column `authorId` on the `clips` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `clips` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `clips` table. All the data in the column will be lost.
  - You are about to drop the column `video` on the `clips` table. All the data in the column will be lost.
  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `clips` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `clips` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "profile" DROP CONSTRAINT "profile_userId_fkey";

-- DropForeignKey
ALTER TABLE "clips" DROP CONSTRAINT "clips_authorId_fkey";

-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "compound_id" SET DATA TYPE TEXT,
ALTER COLUMN "provider_type" SET DATA TYPE TEXT,
ALTER COLUMN "provider_id" SET DATA TYPE TEXT,
ALTER COLUMN "provider_account_id" SET DATA TYPE TEXT,
ALTER COLUMN "access_token_expires" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "clips" DROP COLUMN "authorId",
DROP COLUMN "createdAt",
DROP COLUMN "title",
DROP COLUMN "video",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "expires" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "session_token" SET DATA TYPE TEXT,
ALTER COLUMN "access_token" SET DATA TYPE TEXT,
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE TEXT,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "email_verified" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- AlterTable
ALTER TABLE "verification_requests" ALTER COLUMN "identifier" SET DATA TYPE TEXT,
ALTER COLUMN "token" SET DATA TYPE TEXT,
ALTER COLUMN "expires" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "created_at" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_at" SET DATA TYPE TIMESTAMP(3);

-- DropTable
DROP TABLE "profile";

-- CreateTable
CREATE TABLE "profiles" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "video" TEXT,
    "authorId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "clips.userId_unique" ON "clips"("userId");

-- AddForeignKey
ALTER TABLE "profiles" ADD FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clips" ADD FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterIndex
ALTER INDEX "provider_account_id" RENAME TO "providerAccountId";

-- AlterIndex
ALTER INDEX "provider_id" RENAME TO "providerId";

-- AlterIndex
ALTER INDEX "user_id" RENAME TO "userId";
