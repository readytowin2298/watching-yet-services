import { Router } from "express";
import { ReactionController } from "./reaction.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";

const router = Router();
const reactionController = new ReactionController();

router.post("/toggle", authenticate, (req, res, next) => reactionController.toggleReaction(req.body, req).then(r => res.json(r)).catch(next));

export default router;