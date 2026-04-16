/*
  Warnings:

  - A unique constraint covering the columns `[translationCode,name]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bookId,number]` on the table `Chapter` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[chapterId,number]` on the table `Verse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_translationCode_fkey";

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_translationCode_fkey";

-- DropForeignKey
ALTER TABLE "Verse" DROP CONSTRAINT "Verse_bookId_fkey";

-- DropForeignKey
ALTER TABLE "Verse" DROP CONSTRAINT "Verse_chapterId_fkey";

-- DropForeignKey
ALTER TABLE "Verse" DROP CONSTRAINT "Verse_translationCode_fkey";

-- CreateIndex
CREATE INDEX "Book_translationCode_idx" ON "Book"("translationCode");

-- CreateIndex
CREATE UNIQUE INDEX "Book_translationCode_name_key" ON "Book"("translationCode", "name");

-- CreateIndex
CREATE INDEX "Chapter_translationCode_idx" ON "Chapter"("translationCode");

-- CreateIndex
CREATE INDEX "Chapter_bookId_idx" ON "Chapter"("bookId");

-- CreateIndex
CREATE INDEX "Chapter_bookId_number_idx" ON "Chapter"("bookId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_bookId_number_key" ON "Chapter"("bookId", "number");

-- CreateIndex
CREATE INDEX "Verse_translationCode_idx" ON "Verse"("translationCode");

-- CreateIndex
CREATE INDEX "Verse_chapterId_idx" ON "Verse"("chapterId");

-- CreateIndex
CREATE INDEX "Verse_chapterId_number_idx" ON "Verse"("chapterId", "number");

-- CreateIndex
CREATE INDEX "Verse_bookId_idx" ON "Verse"("bookId");

-- CreateIndex
CREATE UNIQUE INDEX "Verse_chapterId_number_key" ON "Verse"("chapterId", "number");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_translationCode_fkey" FOREIGN KEY ("translationCode") REFERENCES "Translation"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_translationCode_fkey" FOREIGN KEY ("translationCode") REFERENCES "Translation"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_translationCode_fkey" FOREIGN KEY ("translationCode") REFERENCES "Translation"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;
