import { Router } from 'express';
import competitions from './controllers/competitionsController';
import rankings from "./controllers/rankingsController";
import { callback, login } from './controllers/authController';

const router: Router = Router();

router.get('/competitions', competitions);
router.get('/rankings', rankings);
router.get('/api/auth/login', login)
router.get('/api/auth/callback', callback)

export default router;
