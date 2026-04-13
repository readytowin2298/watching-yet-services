import { Router } from "express";
import { toggleReaction } from "./reaction.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/toggle", authenticate, toggleReaction);

export default router;