import { Router } from "express";
import {
  createComment,
  getComments,
  deleteComment,
} from "./comment.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, createComment);
router.get("/:postId", authenticate, getComments);
router.delete("/:commentId", authenticate, deleteComment);

export default router;