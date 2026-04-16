import { Request, Response } from "express";
import { BibleService } from "./bible.services.js";

const bibleService = new BibleService();

export const getTranslations = async (req: Request, res: Response) => {
    try{
        const translations = await bibleService.getTranslations();
        res.status(200).json(translations);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch translations", fullMessage: error });
    }
};

export const getBooks = async (req: Request, res: Response) => {
    try{
        const { translationCode } = req.params;
        if(!translationCode || Array.isArray(translationCode)){
            return res.status(400).json({ error: "Invalid translation code" });
        }
        const books = await bibleService.getBooks(translationCode);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch books", fullMessage: error });
    }
};

export const getBookDetails = async (req: Request, res: Response) => {
    try{
        const { translationCode, bookId } = req.params;
        if(!translationCode || Array.isArray(translationCode) || !bookId || Array.isArray(bookId)){
            return res.status(400).json({ error: "Invalid translation code or book ID" });
        }
        const bookDetails = await bibleService.getBookDetails(translationCode, bookId);
        res.status(200).json(bookDetails);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch book details", fullMessage: error });
    }
};

export const getScriptureRange = async (req: Request, res: Response) => {
    try{
        const { translationCode, bookId } = req.params;
        const { startChapter, startVerse, endChapter, endVerse } = req.query;
        if(!translationCode || Array.isArray(translationCode) || !bookId || Array.isArray(bookId)){
            return res.status(400).json({ error: "Invalid translation code or book ID" });
        }
        if(!startChapter || Array.isArray(startChapter) || !startVerse || Array.isArray(startVerse) || !endChapter || Array.isArray(endChapter) || !endVerse || Array.isArray(endVerse)){
            return res.status(400).json({ error: "Start and end chapter and verse must be provided as query parameters" });
        }
        const scriptureRange = await bibleService.getScriptureRange(translationCode, bookId, Number(startChapter), Number(startVerse), Number(endChapter), Number(endVerse));
        res.status(200).json(scriptureRange);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch scripture range", fullMessage: error });
    }
}