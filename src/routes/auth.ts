import { Router } from 'express';
import login from '../controllers/loginController';
import callback from '../controllers/callbackController';

const auth: Router = Router();

auth.get('/login', login);
auth.get('/callback', callback)

export default auth;
