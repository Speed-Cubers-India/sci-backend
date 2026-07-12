import { CookieOptions, Response } from 'express';
import appConfig from '../config/appConfig';

export const SESSION_COOKIE_NAME = 'sci_session';

const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const cookieOptions = (): CookieOptions => ({
  httpOnly: true,
  secure: appConfig.isProduction,
  sameSite: appConfig.isProduction ? 'none' : 'lax',
  maxAge: SEVEN_DAYS_MS,
  path: '/',
});

export const setSessionCookie = (res: Response, token: string): void => {
  res.cookie(SESSION_COOKIE_NAME, token, cookieOptions());
};

export const clearSessionCookie = (res: Response): void => {
  res.clearCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: appConfig.isProduction,
    sameSite: appConfig.isProduction ? 'none' : 'lax',
    path: '/',
  });
};
