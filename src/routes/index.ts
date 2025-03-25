import { Router } from 'express';
import competitions from '../controllers/competitionsController';
import rankings from "../controllers/rankingsController";

const router: Router = Router();

router.get('/competitions', competitions);
router.get('/rankings', rankings);

export default router;
