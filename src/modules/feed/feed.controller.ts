import { Route, Get, Query, Request } from 'tsoa';
import { FeedService } from './feed.service.js';

@Route('/feed')
export class FeedController {
    private feedService = new FeedService();

    @Get('/')
    async fetchFeed(@Query() cursor?: string, @Request() req?: any) {
        const userId = req.user.userId;
        return await this.feedService.getFeed(userId, cursor);
    }
}
