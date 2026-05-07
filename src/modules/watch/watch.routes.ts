import { Router } from 'express';
import { WatchController } from './watch.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = Router();
const watchController = new WatchController();

// Toggle watch/unwatch
router.post('/:userId', authenticate, (req, res, next) => watchController.toggleWatch(req.params.userId as string, req).then(r => res.json(r)).catch(next));

// Get stats
router.get('/stats/:userId', (req, res, next) => watchController.getStats(req.params.userId as string).then(r => res.json(r)).catch(next));

export default router;