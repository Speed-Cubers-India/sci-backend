import { Request, Response } from "express";
import { constructAuthUrl, fetchUserData } from "../services/authService";
import appConfig from "../config/appConfig";

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
  const code = req.query.code;
  if (typeof code !== "string") {
    res.redirect(
      `${appConfig.frontendUrl}/login?error=invalid_authorization_code`
    );
    return;
  }
  try {
    const user = await fetchUserData(code);
    if (process.env.NODE_ENV !== "production") {
      console.log(user);
    }
    //do something with the user data
    // after adding session redirect the user to the frontend
    res.redirect(`${appConfig.frontendUrl}`);
  } catch (error) {
    console.error("Error during OAuth callback:", error);
    res.redirect(`${appConfig.frontendUrl}/login?error=${error}`);
  }
};
