import { Route, Post, Get, Delete, Path, Body, Request } from "tsoa";
import { CommentService } from "./comment.service.js";

interface CreateCommentRequest {
  postId: string;
  content?: string;
}

@Route('/comments')
export class CommentController {
  private commentService = new CommentService();

  @Post('/')
  async createComment(@Body() body: CreateCommentRequest, @Request() req: any) {
    if (!body.postId) {
      throw new Error("postId is required");
    }

    return await this.commentService.createComment({
      userId: req.user.id,
      postId: body.postId,
      content: body.content || '',
    });
  }

  @Get('/:postId')
  async getComments(@Path() postId: string, @Request() req: any) {
    if (!postId || Array.isArray(postId)) {
      throw new Error("Invalid postId");
    }

    return await this.commentService.getPostComments(postId, req.user.id);
  }

  @Delete('/:commentId')
  async deleteComment(@Path() commentId: string, @Request() req: any) {
    if (!commentId || Array.isArray(commentId)) {
      throw new Error("Invalid commentId");
    }

    return await this.commentService.deleteComment(commentId, req.user.id);
  }
}