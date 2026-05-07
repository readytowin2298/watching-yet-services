import { Route, Post, Get, Path, Request } from 'tsoa';
import { WatchService } from './watch.service.js';

@Route('/watch')
export class WatchController {
    private watchService = new WatchService();

    @Post('/:userId')
    async toggleWatch(@Path() userId: string, @Request() req: any) {
        const watcherId = req.user.userId;
        return await this.watchService.toggleWatch(watcherId, userId);
    }

    @Get('/stats/:userId')
    async getStats(@Path() userId: string) {
        return await this.watchService.getWatchStats(userId);
    }
}