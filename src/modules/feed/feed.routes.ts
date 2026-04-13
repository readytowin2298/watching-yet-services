import { Router } from 'express';
import { fetchFeed } from './feed.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

router.get("/", authenticate, fetchFeed);

export default router;