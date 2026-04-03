import { Router } from 'express';
import { fetchFeed } from '../controllers/feed.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get("/", authenticate, fetchFeed);

export default router;