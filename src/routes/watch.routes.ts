import { Router } from 'express';
import { handleToggleWatch, getStats } from '../controllers/watch.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Toggle watch/unwatch
router.post('/:userId', authenticate, handleToggleWatch);

// Get stats
router.get('/stats/:userId', getStats);

export default router;