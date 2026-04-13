import { Request, Response } from "express";
import { toggleReaction as toggleReactionService } from "./reaction.service.js";


export const toggleReaction = async (req: Request, res: Response) => {
  try {
    const { postId, commentId, type } = req.body;
    const userId = req.user.id;

    if (!type) {
      return res.status(400).json({ message: "Reaction type required" });
    }

    const result = await toggleReactionService({
      userId,
      postId,
      commentId,
      type,
    });

    res.json(result);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err instanceof Error ? err.message : "Failed to toggle reaction",
    });
  }
};