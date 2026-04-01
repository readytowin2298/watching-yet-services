import { Request, Response } from 'express';
import { toggleWatch, getWatchStats } from '../services/watch.service';

export const handleToggleWatch = async (req: Request, res: Response) => {
    try{
        const watcherId = (req as any).user.userId;
        const userId = req.params.userId as string;

        const result = await toggleWatch(watcherId, userId);

        res.json(result);
    } catch(err: any) {
        res.status(400).json({ error: err.message})
    }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId as string;

    const stats = await getWatchStats(userId);

    res.json(stats);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};