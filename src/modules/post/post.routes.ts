import { Router } from "express";
import { createPost } from "./post.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", authenticate, createPost);

export default router;