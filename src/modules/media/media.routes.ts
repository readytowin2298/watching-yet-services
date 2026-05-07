import { Router } from "express";
import { upload } from "../../middleware/upload.middleware.js";
import { MediaController } from "./media.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();
const mediaController = new MediaController();

router.post(
  "/",
  authenticate,
  upload.array("media", 5),
  (req, res, next) => mediaController.uploadMedia(req.files as Express.Multer.File[], req).then(r => res.json(r)).catch(next)
);

export default router;