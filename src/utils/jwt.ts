import jwt from 'jsonwebtoken';
import appConfig from '../config/appConfig';

export interface SessionPayload {
  id: number;
  wcaId: string | null;
  name: string;
  avatarUrl: string | null;
}

const SESSION_EXPIRY = '7d';

export const signSession = (payload: SessionPayload): string => {
  return jwt.sign(payload, appConfig.jwtSecret, { expiresIn: SESSION_EXPIRY });
};

export const verifySession = (token: string): SessionPayload => {
  const decoded = jwt.verify(token, appConfig.jwtSecret);
  if (typeof decoded === 'string' || !decoded || typeof decoded !== 'object') {
    throw new Error('Invalid session token');
  }

  const { id, wcaId, name, avatarUrl } = decoded as SessionPayload;
  if (typeof id !== 'number' || typeof name !== 'string') {
    throw new Error('Invalid session payload');
  }

  return {
    id,
    wcaId: wcaId ?? null,
    name,
    avatarUrl: avatarUrl ?? null,
  };
};
