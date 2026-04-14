import { prisma } from "../../lib/prisma.js";

export class CommentService {
  async createComment({
    userId,
    postId,
    content,
  }: {
    userId: string;
    postId: string;
    content: string;
  }) {
    if (!content || content.trim().length === 0) {
      throw new Error("Content cannot be empty");
    }

    // Optional: ensure post exists
    const postExists = await prisma.post.findUnique({
      where: { id: postId },
      select: { id: true },
    });

    if (!postExists) {
      throw new Error("Post not found");
    }

    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            reactions: true,
          },
        },
      },
    });

    return comment;
  }

  async getPostComments(postId: string, userId: string) {
    const comments = await prisma.comment.findMany({
      where: { postId },
      orderBy: { createdAt: "asc" },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            avatarUrl: true,
          },
        },
        _count: {
          select: {
            reactions: true,
          },
        },
        reactions: {
          where: { userId },
          select: { type: true },
        },
      },
    });

    // Transform viewer reaction
    return comments.map(comment => ({
      ...comment,
      viewerReaction: comment.reactions[0]?.type ?? null,
      reactions: undefined, // clean response
    }));
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      select: { authorId: true },
    });

    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.authorId !== userId) {
      throw new Error("Unauthorized");
    }

    await prisma.comment.delete({
      where: { id: commentId },
    });

    return { success: true };
  }
}