import { Request, Response } from 'express';
import { verifySession } from '../utils/jwt';
import { SESSION_COOKIE_NAME } from '../utils/sessionCookie';

const me = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.[SESSION_COOKIE_NAME];
  if (typeof token !== 'string' || !token) {
    res.status(401).json({ error: 'Not authenticated' });
    return;
  }

  try {
    const session = verifySession(token);
    res.json(session);
  } catch {
    res.status(401).json({ error: 'Invalid or expired session' });
  }
};

export default me;
