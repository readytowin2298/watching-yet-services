import { Request, Response } from 'express';
import { getFeed } from '../services/feed.service';

export const  fetchFeed = async ( req: Request, res: Response) => {
    try {
        const userId = (req as any).user.userId;
        const cursor = req.query.cursor as string | undefined;

        const result = await getFeed(userId, cursor);

        res.json(result)
    } catch(err: any) {
        res.status(400).json({error: err.message})
    }
};
