import { Route, Post, Body, Request } from 'tsoa';
import { ReactionService } from './reaction.service.js';

interface ToggleReactionRequest {
    postId?: string;
    commentId?: string;
    type: "LIKE" | "LOVE" | "LAUGH" | "ANGRY";
}

@Route('/reactions')
export class ReactionController {
    private reactionService = new ReactionService();

    @Post('/toggle')
    async toggleReaction(@Body() body: ToggleReactionRequest, @Request() req: any) {
        if (!body.type) {
            throw new Error("Reaction type required");
        }

        return await this.reactionService.toggleReaction({
            userId: req.user.id,
            postId: body.postId || '',
            commentId: body.commentId,
            type: body.type,
        });
    }
}