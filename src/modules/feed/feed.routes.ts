import { Router } from 'express';
import { FeedController } from './feed.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();
const feedController = new FeedController();

router.get("/", authenticate, (req, res, next) => feedController.fetchFeed(req.query.cursor as string, req).then(r => res.json(r)).catch(next));

export default router;