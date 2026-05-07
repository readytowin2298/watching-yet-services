import { Router } from "express";
import { BibleController } from "./bible.controller.js";

const router = Router();
const bibleController = new BibleController();

router.get("/translations", (req, res, next) => bibleController.getTranslations().then(r => res.status(200).json(r)).catch(next));
router.get("/translations/:translationCode", (req, res, next) => bibleController.getBooks(req.params.translationCode).then(r => res.status(200).json(r)).catch(next));
router.get("/translations/:translationCode/:bookId", (req, res, next) => bibleController.getBookDetails(req.params.translationCode, req.params.bookId).then(r => res.status(200).json(r)).catch(next));
router.get("/translations/:translationCode/:bookId/scripture", (req, res, next) => bibleController.getScriptureRange(req.params.translationCode, req.params.bookId, Number(req.query.startChapter), Number(req.query.startVerse), Number(req.query.endChapter), Number(req.query.endVerse)).then(r => res.status(200).json(r)).catch(next));

export default router;