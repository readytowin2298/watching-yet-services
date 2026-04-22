import { Router } from "express";
import { CommentController } from "./comment.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();
const commentController = new CommentController();

router.post("/", authenticate, (req, res, next) => commentController.createComment(req.body, req).then(r => res.json(r)).catch(next));
router.get("/:postId", authenticate, (req, res, next) => commentController.getComments(req.params.postId as string, req).then(r => res.json(r)).catch(next));
router.delete("/:commentId", authenticate, (req, res, next) => commentController.deleteComment(req.params.commentId as string, req).then(r => res.json(r)).catch(next));

export default router;