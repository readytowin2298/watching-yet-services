-- CreateTable
CREATE TABLE "Translation" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "chapterCount" INTEGER NOT NULL,
    "translationCode" TEXT NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "verseCount" INTEGER NOT NULL,
    "translationCode" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Verse" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "translationCode" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "chapterNumber" INTEGER NOT NULL,
    "chapterId" TEXT NOT NULL,

    CONSTRAINT "Verse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Translation_code_key" ON "Translation"("code");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_translationCode_fkey" FOREIGN KEY ("translationCode") REFERENCES "Translation"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_translationCode_fkey" FOREIGN KEY ("translationCode") REFERENCES "Translation"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_translationCode_fkey" FOREIGN KEY ("translationCode") REFERENCES "Translation"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verse" ADD CONSTRAINT "Verse_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
