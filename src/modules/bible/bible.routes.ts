import { Router } from "express";
import { getTranslations, getBooks, getBookDetails, getScriptureRange } from "./bible.controller.js";

const router = Router();

router.get("/translations", getTranslations);
router.get("/translations/:translationCode", getBooks);
router.get("/translations/:translationCode/:bookId", getBookDetails);
router.get("/translations/:translationCode/:bookId/scripture", getScriptureRange);

export default router;