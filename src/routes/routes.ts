import { Router } from 'express';
import competitions from '../controllers/competitionsController';
import rankings from "../controllers/rankingsController";
import { teams } from '../controllers/getTeams';
import login from '../controllers/loginController';
import callback from '../controllers/callbackController';
import me from '../controllers/meController';
import logout from '../controllers/logoutController';

const router: Router = Router();

router.get('/competitions', competitions);
router.get('/rankings', rankings);
router.get('/teams', teams);
router.get('/api/auth/login', login);
router.get('/api/auth/callback', callback);
router.get('/api/auth/me', me);
router.post('/api/auth/logout', logout);

export default router;
