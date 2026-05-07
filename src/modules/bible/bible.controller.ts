import { Route, Get, Path, Query } from "tsoa";
import { BibleService } from "./bible.services.js";

@Route('/bible')
export class BibleController {
    private bibleService = new BibleService();

    @Get('/translations')
    async getTranslations() {
        return await this.bibleService.getTranslations();
    }

    @Get('/translations/:translationCode')
    async getBooks(@Path() translationCode: string) {
        if(!translationCode || Array.isArray(translationCode)){
            throw new Error("Invalid translation code");
        }
        return await this.bibleService.getBooks(translationCode);
    }

    @Get('/translations/:translationCode/:bookId')
    async getBookDetails(@Path() translationCode: string, @Path() bookId: string) {
        if(!translationCode || Array.isArray(translationCode) || !bookId || Array.isArray(bookId)){
            throw new Error("Invalid translation code or book ID");
        }
        return await this.bibleService.getBookDetails(translationCode, bookId);
    }

    @Get('/translations/:translationCode/:bookId/scripture')
    async getScriptureRange(
        @Path() translationCode: string, 
        @Path() bookId: string,
        @Query() startChapter: number,
        @Query() startVerse: number,
        @Query() endChapter: number,
        @Query() endVerse: number
    ) {
        if(!translationCode || Array.isArray(translationCode) || !bookId || Array.isArray(bookId)){
            throw new Error("Invalid translation code or book ID");
        }
        if(!startChapter || !startVerse || !endChapter || !endVerse){
            throw new Error("Start and end chapter and verse must be provided as query parameters");
        }
        return await this.bibleService.getScriptureRange(translationCode, bookId, Number(startChapter), Number(startVerse), Number(endChapter), Number(endVerse));
    }
}