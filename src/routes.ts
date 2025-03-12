import { Router } from 'express';
import competitions from './controllers/competitionsController';

const router: Router = Router();

router.get('/competitions', competitions);

export default router;
