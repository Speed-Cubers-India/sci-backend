import { Router } from 'express';
import competitions from './controllers/competitionsController';
import rankings from "./controllers/rankingsController";
import { teams } from './controllers/getTeams';

const router: Router = Router();

router.get('/competitions', competitions);
router.get('/rankings', rankings);
router.get('/teams', teams)

export default router;
