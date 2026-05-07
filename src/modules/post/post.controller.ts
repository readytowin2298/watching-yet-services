import { Route, Post, Body, Request } from 'tsoa';
import { PostService } from './post.service.js';

interface CreatePostRequest {
    content: string;
    mediaIds?: string[];
}

@Route('/posts')
export class PostController {
    private postService = new PostService();

    @Post('/')
    async createPost(@Body() body: CreatePostRequest, @Request() req: any) {
        if(!body.content){
            throw new Error("Content is required");
        }

        return await this.postService.createPost({
            content: body.content,
            mediaIds: body.mediaIds,
            userId: req.user.id
        });
    }
}