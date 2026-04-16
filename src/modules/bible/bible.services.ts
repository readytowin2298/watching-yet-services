import { prisma } from "../../lib/prisma.js";

export class BibleService {
    async getTranslations(){
        const translations = await prisma.translation.findMany();
        return translations;
    }

    async getBooks(translationCode: string){
        const books = await prisma.book.findMany({
            where: { translationCode },
            orderBy: { id: "asc" }
        });
        return books;
    }
    
    // Get detailed info about a book in a translation, including chapters and verse numbers
    async getBookDetails(translationCode: string, bookId: string){
        const book = await prisma.book.findUnique({
            where: { id: bookId },
            select: {
                name : true,
                translation: {
                    select: {
                        code: true,
                        name: true
                    }
                },
                chapters: {
                    select: {
                        id: true,
                        number: true,
                        verseCount: true,
                        verses: {
                            select: {
                                id: true,
                                number: true
                            }
                        }
                    }
                }
            }
        });
        if(!book || book.translation.code !== translationCode){
            throw new Error("Book not found for that translation");
        }
        return book;
    }

    // Get scripture text for a specified range within a book, requires start and end query parameters
    async getScriptureRange(translationCode: string, bookId: string, startChapter: number, startVerse: number, endChapter: number, endVerse: number){
        // Validate the range
        if(startChapter > endChapter || (startChapter === endChapter && startVerse > endVerse)){
            throw new Error("Invalid range: start must be before end");
        };
        const scripture = await prisma.book.findFirst({
            where: {
                translationCode,
                id: bookId
            },
            select: {
                name: true,
                translation: { select: { name: true, code: true } },
                chapters: {
                    where: {
                        number: { gte: startChapter, lte: endChapter }
                    },
                    select: {
                        number: true,
                        verses: {
                            where: {
                                OR: [
                                    // Start and end in the same chapter
                                    ...(startChapter === endChapter ? [{
                                        chapterNumber: startChapter,
                                        number: { gte: startVerse, lte: endVerse }
                                    }] : [
                                        // Start chapter (partial range)
                                        {
                                            chapterNumber: startChapter,
                                            number: { gte: startVerse }
                                        },
                                        // Chapters fully between start and end
                                        {
                                            chapterNumber: { gt: startChapter, lt: endChapter }
                                        },
                                        // End chapter (partial range)
                                        {
                                            chapterNumber: endChapter,
                                            number: { lte: endVerse }
                                        }
                                    ])
                                ]
                            }
                        }     
                    },
                    orderBy: [
                        {number: 'asc'}
                    ]
                },
            }
        });
        if(!scripture || scripture.translation.code !== translationCode){
            throw new Error("Book not found for that translation");
        }
        return scripture;   
    }
}