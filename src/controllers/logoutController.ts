import { Request, Response } from 'express';
import { clearSessionCookie } from '../utils/sessionCookie';

const logout = async (_req: Request, res: Response): Promise<void> => {
  clearSessionCookie(res);
  res.status(204).send();
};

export default logout;
