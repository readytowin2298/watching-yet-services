import { Request, Response } from "express";
import { CommentService } from "./comment.service.js";

const commentService = new CommentService();

export const createComment = async (req: Request, res: Response) => {
  try {
    const { postId, content } = req.body;
    const userId = req.user.id;

    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const comment = await commentService.createComment({
      userId,
      postId,
      content,
    });

    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: err instanceof Error ? err.message : "Failed to create comment",
    });
  }
};

export const getComments = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    if (!postId || Array.isArray(postId)) {
        return res.status(400).json({ message: "Invalid postId" });
    }

    const comments = await commentService.getPostComments(postId, userId);

    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    if (!commentId || Array.isArray(commentId)) {
        return res.status(400).json({ message: "Invalid postId" });
    }

    const result = await commentService.deleteComment(commentId, userId);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};