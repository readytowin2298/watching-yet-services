import { Router } from 'express';
import { handleToggleWatch, getStats } from './watch.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();

// Toggle watch/unwatch
router.post('/:userId', authenticate, handleToggleWatch);

// Get stats
router.get('/stats/:userId', getStats);

export default router;