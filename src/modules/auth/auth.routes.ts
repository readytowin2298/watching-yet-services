import { Router }  from 'express';
import { AuthController } from './auth.controller.js';

const router = Router();
const authController = new AuthController();

router.post('/register', (req, res, next) => authController.register(req.body).then(r => res.status(201).json(r)).catch(next));
router.post('/login', (req, res, next) => authController.login(req.body).then(r => res.json(r)).catch(next));

export default router;