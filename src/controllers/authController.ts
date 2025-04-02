import { Request, Response } from "express";
import { constructAuthUrl, contructLoginUrl } from "../services/authService";

/**
 * Initiates OAuth login flow by redirecting to the WCA authorization endpoint
 */
export const login = async (req: Request, res: Response): Promise<void> => {
  // Redirect user to authorization page
  const authUrl = constructAuthUrl();
  res.redirect(authUrl);
};

/**
 * Handles OAuth callback, exchanges authorization code for access token,
 * and fetches user information
 */
export const callback = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.query;
   // Add login=true as query parameter
   const loginUrl = await contructLoginUrl(code as string);
    res.redirect(loginUrl);
};
