import { Router } from "express";
import { PostController } from "./post.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();
const postController = new PostController();

router.post("/", authenticate, (req, res, next) => postController.createPost(req.body, req).then(r => res.json(r)).catch(next));

export default router;