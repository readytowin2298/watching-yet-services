import { Router } from "express";
import { upload } from "../middleware/upload.middleware.js";
import { uploadMedia } from "../modules/media/media.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/",
  authenticate,
  upload.array("media", 5),
  uploadMedia
);

export default router;